# Pulafanatics App

Officiële app van Supportersclub Pulafanatics – gebasseerd op [www.pulafanatics.be](https://www.pulafanatics.be).

## Overzicht

Een volledige React Native (Expo) app voor supporters en beheerders van Pulafanatics, met twee luiken: **leden** en **beheerders**.

## Functionaliteiten

### Ledengedeelte
- **Startscherm** – logo, eerstvolgende wedstrijd/busverplaatsing/activiteit, snelkoppelingen, nieuws, sponsors
- **Wedstrijden & Activiteiten** – kalender met thuis/uitwedstrijden, activiteiten, toevoegen aan persoonlijke kalender
- **Bus reserveren** – overzicht per verplaatsing (tegenstander, datum, vertrekuur, vrije plaatsen, prijs), inschrijven met gezinsleden, wachtlijst
- **Mijn Pulafanatics** – persoonlijk profiel, digitale ledenkaart, QR-code, gezinsleden, busreservaties, webshopbestellingen
- **Lid worden** – alle lidformules (Member €85, Member Kind €15, Steunkaart €10, Steunkaart Kind €10), voorrangsregeling bus
- **Webshop** – producten per categorie (hoodies, vesten, T-shirts voor volwassenen & kinderen, lidmaatschappen, acties), maat kiezen, winkelmandje
- **Nieuws** – nieuwsberichten per categorie, pushmeldingen
- **Fotogalerij** – albums per wedstrijd/activiteit
- **Sponsors** – sponsorpagina met bellen, website, route
- **Contact** – bellen, e-mail, Facebook, contactformulier

### Beheerdersgedeelte (admin)
- **Dashboard** – statistieken, pushmeldingen versturen
- **Ledenbeheer** – leden zoeken, toevoegen, bewerken, lidmaatschappen activeren
- **Busverplaatsingen** – aanmaken, capaciteit instellen, deelnemerslijsten, wachtlijstbeheer
- **Wedstrijden & Activiteiten** – toevoegen en beheren
- **Webshop** – producten en voorraad beheren, bestellingen opvolgen
- **Nieuwsberichten** – plaatsen, bewerken, pushmeldingen
- **Sponsors** – toevoegen, bewerken, bannersponsors instellen
- **Fotoalbums** – albums aanmaken, foto's toevoegen

## Technologie

- **React Native** met [Expo](https://expo.dev) (SDK 57)
- **TypeScript**
- **React Navigation** (Bottom Tabs + Native Stack)
- **React Native Safe Area Context**

## Installatie & Opstarten

```bash
# Installeer afhankelijkheden
npm install

# Start de app (Expo Go op je smartphone)
npm start

# Of specifiek platform
npm run android
npm run ios
npm run web
```

## Demo accounts

| E-mail | Rol | Wachtwoord |
|--------|-----|------------|
| jan@pulafanatics.be | Lid (Member) | elk wachtwoord |
| admin@pulafanatics.be | Beheerder (Admin) | elk wachtwoord |

## Projectstructuur

```
src/
├── context/        # AuthContext (authenticatie + winkelmandje)
├── data/           # Mock data (wedstrijden, leden, producten, ...)
├── navigation/     # AppNavigator (tabs + stack)
├── screens/
│   ├── auth/       # Login, Register
│   ├── home/       # Startscherm
│   ├── matches/    # Wedstrijden & Activiteiten
│   ├── bus/        # Busoverzicht + reservatie
│   ├── profile/    # Mijn Pulafanatics
│   ├── membership/ # Lid worden
│   ├── shop/       # Webshop + productdetail
│   ├── news/       # Nieuws
│   ├── gallery/    # Fotogalerij
│   ├── sponsors/   # Sponsors
│   ├── contact/    # Contact
│   └── admin/      # Beheerderspaneel
└── types/          # TypeScript types
```

