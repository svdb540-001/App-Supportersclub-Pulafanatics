import{createClient}from"https://esm.sh/@supabase/supabase-js@2";
Deno.serve(async req=>{
 if(req.method!=="POST")return new Response("Method not allowed",{status:405});
 try{
  const form=await req.formData(),id=String(form.get("id")||"");if(!id)return new Response("Missing id",{status:400});
  const key=Deno.env.get("MOLLIE_API_KEY");if(!key)throw new Error("Missing Mollie secret.");
  const check=await fetch("https://api.mollie.com/v2/payments/"+encodeURIComponent(id),{headers:{Authorization:"Bearer "+key}}),p=await check.json();if(!check.ok)throw new Error("Mollie verification failed.");
  const db=createClient(Deno.env.get("SUPABASE_URL")!,Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const{data:saved,error}=await db.from("payments").select("id,reservation_id,amount_cents,status").eq("mollie_payment_id",id).single();if(error||!saved)return new Response("Unknown payment",{status:404});
  const cents=Math.round(Number(p.amount?.value)*100),matches=p.amount?.currency==="EUR"&&cents===saved.amount_cents&&p.metadata?.reservation_id===saved.reservation_id;
  const map={paid:"paid",failed:"failed",canceled:"canceled",expired:"expired",refunded:"refunded",open:"open",pending:"open"},status=matches?(map[p.status]||"review"):"review";
  if(saved.status!==status){await db.from("payments").update({status}).eq("id",saved.id);const next={paid:"paid",failed:"failed",canceled:"cancelled",expired:"cancelled",refunded:"refunded",review:"review",open:"pending"}[status]||"pending";await db.from("reservations").update({payment_status:next}).eq("id",saved.reservation_id)}
  return new Response("OK",{status:200})
 }catch(_){return new Response("Webhook verification failed",{status:500})}
});