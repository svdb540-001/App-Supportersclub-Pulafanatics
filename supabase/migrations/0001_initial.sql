create extension if not exists pgcrypto;
create table public.profiles(id uuid primary key references auth.users(id) on delete cascade,email text not null,display_name text not null default '',role text not null default 'supporter' check(role in('supporter','admin')),created_at timestamptz not null default now());
create table public.households(id uuid primary key default gen_random_uuid(),owner_id uuid not null unique references public.profiles(id) on delete cascade,name text not null default 'Mijn gezin',created_at timestamptz not null default now());
create table public.membership_types(id uuid primary key default gen_random_uuid(),name text not null unique,ride_fare_cents integer check(ride_fare_cents is null or ride_fare_cents>=0),priority boolean not null default false,active boolean not null default true,sort_order integer not null default 0);
create table public.family_members(id uuid primary key default gen_random_uuid(),household_id uuid not null references public.households(id) on delete cascade,name text not null,age_group text not null check(age_group in('adult','child')),membership_type_id uuid references public.membership_types(id) on delete set null,created_at timestamptz not null default now());
create table public.calendar_events(id uuid primary key default gen_random_uuid(),source text not null default 'manual' check(source in('manual','rbfa')),source_event_id text,source_url text,kind text not null check(kind in('match','activity')),title text not null,opponent text,starts_at timestamptz not null,venue text,details text,bus_registration_open boolean not null default false,bus_capacity integer not null default 0 check(bus_capacity>=0),bus_fare_cents integer not null default 1500 check(bus_fare_cents>=0),registration_deadline timestamptz,archived boolean not null default false,created_by uuid references public.profiles(id) on delete set null,created_at timestamptz not null default now(),unique(source,source_event_id));
create table public.reservations(id uuid primary key default gen_random_uuid(),event_id uuid not null references public.calendar_events(id) on delete restrict,household_id uuid not null references public.households(id) on delete cascade,passenger_id uuid not null references public.family_members(id) on delete restrict,created_by uuid not null references public.profiles(id) on delete restrict,status text not null default 'confirmed' check(status in('confirmed','waitlist','cancelled')),payment_status text not null default 'unpaid' check(payment_status in('unpaid','pending','paid','failed','cancelled','refunded','review')),price_cents integer not null check(price_cents>=0),membership_name_snapshot text,queue_position bigint generated always as identity,created_at timestamptz not null default now());
create unique index reservation_no_duplicate on public.reservations(event_id,passenger_id) where status<>'cancelled';
create table public.payments(id uuid primary key default gen_random_uuid(),reservation_id uuid not null references public.reservations(id) on delete restrict,user_id uuid not null references public.profiles(id) on delete restrict,mollie_payment_id text unique,checkout_url text,amount_cents integer not null check(amount_cents>=0),currency text not null default 'EUR' check(currency='EUR'),status text not null default 'open' check(status in('open','paid','failed','canceled','expired','refunded','review')),attempt integer not null,created_at timestamptz not null default now(),unique(reservation_id,attempt));
create index events_start_idx on public.calendar_events(starts_at) where archived=false;
create index reservations_trip_status_idx on public.reservations(event_id,status,queue_position);

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public,pg_temp as $$
declare n text; h uuid;
begin
 n:=coalesce(nullif(trim(new.raw_user_meta_data->>'display_name'),''),split_part(new.email,'@',1));
 insert into public.profiles(id,email,display_name) values(new.id,new.email,n);
 insert into public.households(owner_id,name) values(new.id,n||' gezin') returning id into h;
 insert into public.family_members(household_id,name,age_group) values(h,n,'adult');
 return new;
end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create or replace function public.is_admin() returns boolean language sql stable security definer set search_path=public,pg_temp as $$ select exists(select 1 from public.profiles where id=auth.uid() and role='admin') $$;
create or replace function public.owns_household(p uuid) returns boolean language sql stable security definer set search_path=public,pg_temp as $$ select exists(select 1 from public.households where id=p and owner_id=auth.uid()) $$;

alter table public.profiles enable row level security;
alter table public.households enable row level security;
alter table public.membership_types enable row level security;
alter table public.family_members enable row level security;
alter table public.calendar_events enable row level security;
alter table public.reservations enable row level security;
alter table public.payments enable row level security;

create policy profiles_read on public.profiles for select to authenticated using(id=auth.uid() or public.is_admin());
create policy profiles_update on public.profiles for update to authenticated using(id=auth.uid()) with check(id=auth.uid());
create policy households_read on public.households for select to authenticated using(owner_id=auth.uid() or public.is_admin());
create policy households_update on public.households for update to authenticated using(owner_id=auth.uid()) with check(owner_id=auth.uid());
create policy types_read on public.membership_types for select to authenticated using(active or public.is_admin());
create policy types_admin on public.membership_types for all to authenticated using(public.is_admin()) with check(public.is_admin());
create policy family_read on public.family_members for select to authenticated using(public.owns_household(household_id) or public.is_admin());
create policy family_add on public.family_members for insert to authenticated with check(public.owns_household(household_id));
create policy family_update on public.family_members for update to authenticated using(public.owns_household(household_id) or public.is_admin()) with check(public.owns_household(household_id) or public.is_admin());
create policy family_delete on public.family_members for delete to authenticated using(public.owns_household(household_id) or public.is_admin());
create policy events_read on public.calendar_events for select to anon,authenticated using(not archived or public.is_admin());
create policy events_admin on public.calendar_events for all to authenticated using(public.is_admin()) with check(public.is_admin());
create policy reservations_read on public.reservations for select to authenticated using(public.owns_household(household_id) or public.is_admin());
create policy payments_read on public.payments for select to authenticated using(user_id=auth.uid() or public.is_admin());

grant select on public.calendar_events to anon,authenticated;
grant select on public.membership_types to authenticated;
grant select on public.profiles,public.households to authenticated;
revoke update on public.profiles from authenticated;
grant update(display_name) on public.profiles to authenticated;
grant update(name) on public.households to authenticated;
grant select,insert,delete on public.family_members to authenticated;
revoke update on public.family_members from authenticated;
grant update(name,age_group) on public.family_members to authenticated;
grant select on public.reservations,public.payments to authenticated;
grant select,insert,update,delete on public.membership_types to authenticated;
grant insert,update,delete on public.calendar_events to authenticated;

create or replace function public.admin_set_membership_type(p_member_id uuid,p_membership_type_id uuid)
returns void language plpgsql security definer set search_path=public,pg_temp as $$
begin
 if not public.is_admin() then raise exception 'Alleen een beheerder kan statussen wijzigen.'; end if;
 if p_membership_type_id is not null and not exists(select 1 from public.membership_types where id=p_membership_type_id and active) then raise exception 'Lidstatus is niet actief.'; end if;
 update public.family_members set membership_type_id=p_membership_type_id where id=p_member_id;
 if not found then raise exception 'Gezinslid niet gevonden.'; end if;
end $$;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.owns_household(uuid) to authenticated;
grant execute on function public.admin_set_membership_type(uuid,uuid) to authenticated;

create or replace function public.register_household_for_event(p_event_id uuid,p_member_ids uuid[])
returns jsonb language plpgsql security definer set search_path=public,pg_temp as $$
declare h uuid; e public.calendar_events%rowtype; m record; seats integer; fare integer; row_added public.reservations%rowtype; out_rows jsonb:='[]'::jsonb; requested integer;
begin
 if auth.uid() is null then raise exception 'Meld je aan om in te schrijven.'; end if;
 select id into h from public.households where owner_id=auth.uid() for update;
 if h is null then raise exception 'Huishouden niet gevonden.'; end if;
 if coalesce(cardinality(p_member_ids),0)=0 then raise exception 'Selecteer minstens één persoon.'; end if;
 select count(distinct x) into requested from unnest(p_member_ids) x;
 if requested<>cardinality(p_member_ids) then raise exception 'Een persoon werd dubbel geselecteerd.'; end if;
 select * into e from public.calendar_events where id=p_event_id and not archived for update;
 if e.id is null or not e.bus_registration_open then raise exception 'Businschrijving is gesloten.'; end if;
 if e.registration_deadline is not null and e.registration_deadline<now() then raise exception 'De inschrijfdeadline is voorbij.'; end if;
 if (select count(*) from public.family_members where household_id=h and id=any(p_member_ids))<>cardinality(p_member_ids) then raise exception 'Een of meer personen horen niet bij jouw gezin.'; end if;
 select greatest(0,e.bus_capacity-count(*)) into seats from public.reservations where event_id=e.id and status='confirmed';
 for m in select fm.id,fm.name,mt.name status_name,mt.ride_fare_cents,coalesce(mt.priority,false) priority from public.family_members fm left join public.membership_types mt on mt.id=fm.membership_type_id where fm.household_id=h and fm.id=any(p_member_ids) order by coalesce(mt.priority,false) desc,fm.created_at,fm.id loop
  if exists(select 1 from public.reservations where event_id=e.id and passenger_id=m.id and status<>'cancelled') then raise exception 'Een persoon is al ingeschreven.'; end if;
  fare:=coalesce(m.ride_fare_cents,e.bus_fare_cents);
  insert into public.reservations(event_id,household_id,passenger_id,created_by,status,payment_status,price_cents,membership_name_snapshot)
   values(e.id,h,m.id,auth.uid(),case when seats>0 then 'confirmed' else 'waitlist' end,'unpaid',fare,m.status_name) returning * into row_added;
  if seats>0 then seats:=seats-1; end if;
  out_rows:=out_rows||jsonb_build_array(jsonb_build_object('id',row_added.id,'status',row_added.status,'price_cents',row_added.price_cents,'passenger_name',m.name));
 end loop;
 return jsonb_build_object('reservations',out_rows);
end $$;
create or replace function public.cancel_reservation(p_reservation_id uuid)
returns void language plpgsql security definer set search_path=public,pg_temp as $$
declare r public.reservations%rowtype; next_r public.reservations%rowtype;
begin
 if auth.uid() is null then raise exception 'Meld je aan.'; end if;
 select * into r from public.reservations where id=p_reservation_id for update;
 if r.id is null then raise exception 'Reservatie bestaat niet.'; end if;
 if r.created_by<>auth.uid() and not public.is_admin() then raise exception 'Geen toegang.'; end if;
 if r.status='cancelled' then return; end if;
 update public.reservations set status='cancelled',payment_status=case when payment_status in('paid','pending') then 'review' else payment_status end where id=r.id;
 if r.status='confirmed' then select * into next_r from public.reservations where event_id=r.event_id and status='waitlist' order by queue_position limit 1 for update; if next_r.id is not null then update public.reservations set status='confirmed' where id=next_r.id; end if; end if;
end $$;
revoke all on function public.register_household_for_event(uuid,uuid[]) from public;
revoke all on function public.cancel_reservation(uuid) from public;
grant execute on function public.register_household_for_event(uuid,uuid[]) to authenticated;
grant execute on function public.cancel_reservation(uuid) to authenticated;

insert into public.membership_types(name,ride_fare_cents,priority,sort_order) values('Geen kaart',1500,false,50),('Memberchip',1500,true,10),('Memberchip kind',1500,true,20),('Steunkaart',1000,false,30),('Steunkaart kind',1000,false,40) on conflict(name) do nothing;
