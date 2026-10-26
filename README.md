# Pulafanatics supportersapp

Mobiele PWA-prototype voor Supportersclub Pulafanatics en KFC Punt-Larum.

## In deze versie

- Kalender voor wedstrijden van de eerste ploeg en clubactiviteiten.
- Beheerder kan wedstrijden en activiteiten toevoegen, met buscapaciteit en uiterste inschrijfdatum.
- Supporters kunnen gezinsleden toevoegen en meerdere personen tegelijk voor een busrit inschrijven.
- Beheerder kan per persoon de status beheren: Memberchip, Memberchip kind, Steunkaart, Steunkaart kind of Geen kaart.
- Tarieven per status en voorrangsregels zijn instelbaar. Bij een inschrijving worden bedragen per persoon berekend en als lokaal betaalverzoek getoond.
- Busplaatsen, wachtlijstsignaal, betaalstatusbeheer en CSV-export.
- Installable PWA met eenvoudige offline shell.

## Demo gebruiken

Open `index.html` lokaal of zet GitHub Pages aan voor de repository. De startpagina heeft een knop **Wissel demo rol**. Alles wordt alleen in localStorage van die browser bewaard. De twee vooraf ingevulde kalenderitems zijn voorbeelddata; vervang ze door de officiële wedstrijden en activiteiten.

**Voer geen echte ledengegevens in.** De repository is publiek en deze versie heeft geen echte accounts, centrale database, rolbeveiliging of betaalverwerking. Demo-rolwissel is geen toegangscontrole. De getoonde betaalverzoeken worden niet naar leden verstuurd en er wordt geen geld geïnd.

## Nodig voor ingebruikname

1. Maak de GitHub-repository privé en activeer MFA voor persoonlijke accounts.
2. Koppel Supabase Auth en een Postgres-database met RLS; beperk leden tot hun eigen huishouden en beheerders tot expliciete beheerrechten.
3. Voeg server-side reserveringsfuncties toe die capaciteit, dubbelboekingen, voorrang, tarieven en prijsopname atomair valideren; bouw ook annulering en wachtlijstpromotie.
4. Laat een beveiligde serverfunctie een Mollie-betaallink maken en verifieer de webhook voordat een betaling als voltooid geldt. Bewaar Mollie-sleutels nooit in browsercode of GitHub.
5. Laad de officiële seizoenskalender in en stel de werkelijke tarieven en buscapaciteiten vast.

Deze repository bevat bewust nog geen API-sleutels of productiebetalingen.
