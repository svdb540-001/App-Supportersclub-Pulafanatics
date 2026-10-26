# Pulafanatics supportersapp

Productiegerichte PWA-basis. De lokale demo-opslag en demo-rolwissel zijn verwijderd. De app is gebouwd voor Supabase Auth/Postgres/RLS en server-side Mollie Edge Functions.

## Klaar in deze branch

- E-mailaccounts, bevestigingsmail, wachtwoordreset en afmelden.
- Huishouden met kinderen als gezinsleden.
- Beheerbare Memberchip-, Memberchip kind-, Steunkaart- en andere statussen met tarief per persoon.
- Atomaire inschrijving per passagier, capaciteit, dubbele-inschrijving blokkering, prijsopname, wachtlijst en annulering/promotie.
- Kalender, busbeheer, dashboard en links naar de officiële RBFA/Voetbal Vlaanderen ploegpagina.
- Mollie-betaallinks aanmaken op de server; betaling wordt pas als betaald gezien na serververificatie bij Mollie.
- Vercel, securityheaders, GitHub buildworkflow, Dependabot en go-livechecklist.

## Koppelen

1. Maak aparte Supabase-projecten voor TEST en PRODUCTIE.
2. Voer supabase/migrations/0001_initial.sql in Supabase TEST uit.
3. Deploy de functies create-mollie-payment en mollie-webhook naar TEST.
4. Voeg MOLLIE_API_KEY en APP_URL als Supabase Edge Function Secrets toe. De projectwaarden SUPABASE_URL, SUPABASE_ANON_KEY en SUPABASE_SERVICE_ROLE_KEY blijven server-side.
5. Maak een testaccount, bevestig e-mail en wijs het bestuurdersaccount toe met security/bootstrap-admin.sql.example.
6. Stel Vercel Preview in met alleen de TEST-waarden uit .env.example. Gebruik aparte PRODUCTIE-waarden voor Production.
7. Koppel de repository aan Vercel: build npm run build, output dist.
8. Test de volledige checklist in security/GO-LIVE-CHECKLIST.md voordat je echte gegevens invoert.
9. Maak productie-backend, auth en Mollie Live pas klaar na acceptatie van de testomgeving.
10. Koppel app.pulafanatics.be bij Vercel; neem de DNS-records exact over in Webnode en stel het domein daarna in bij Supabase Auth.

Lokaal: kopieer .env.example naar .env.local, vul de TEST-waarden in, voer npm install en npm run dev uit. .env.local staat in .gitignore.

## RBFA-kalender

De officiële eerste-elftalpagina is https://www.voetbalvlaanderen.be/club/2559/ploeg/365579. De app linkt naar die pagina en beheerders kunnen geverifieerde wedstrijden invoeren. Automatische import is nog niet geconfigureerd: er is nog geen bevestigde openbare ICS/API-feed voor deze ploeg in de projectconfiguratie. Wanneer jullie de officiële feed-URL hebben, kan die aan de importkoppeling worden gehangen.

## Nog aan te sluiten vóór live

Supabase, Mollie, Vercel, SMTP en DNS moeten op de Pulafanatics-accounts worden aangesloten. Het repo bevat geen echte links, accounts of sleutels. Gebruik voor test en preview uitsluitend fictieve gegevens. Laat SQL/RLS, de betaalflow en privacydocumenten nakijken vóór echte persoonsgegevens worden verwerkt.
