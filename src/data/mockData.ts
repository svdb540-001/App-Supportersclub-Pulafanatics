import {
  User,
  Match,
  Activity,
  BusTrip,
  NewsItem,
  Product,
  GalleryAlbum,
  Sponsor,
  MembershipFormula,
  BusReservation,
  Order,
} from '../types';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    firstName: 'Jan',
    lastName: 'De Smedt',
    email: 'jan@pulafanatics.be',
    phone: '+32 477 12 34 56',
    dateOfBirth: '1985-03-15',
    membershipType: 'member',
    membershipExpiry: '2025-06-30',
    memberNumber: 'PF-0042',
    role: 'member',
    familyMembers: [
      {
        id: 'fm1',
        firstName: 'Marie',
        lastName: 'De Smedt',
        dateOfBirth: '2010-07-22',
        membershipType: 'member_kind',
        memberNumber: 'PF-0043',
      },
    ],
  },
  {
    id: '2',
    firstName: 'Admin',
    lastName: 'Pulafanatics',
    email: 'admin@pulafanatics.be',
    phone: '+32 475 00 00 01',
    dateOfBirth: '1980-01-01',
    membershipType: 'member',
    membershipExpiry: '2025-06-30',
    memberNumber: 'PF-0001',
    role: 'admin',
    familyMembers: [],
  },
];

export const MOCK_MATCHES: Match[] = [
  {
    id: 'm1',
    opponent: 'FC Retie',
    date: '2025-08-10',
    time: '15:00',
    isHome: false,
    location: 'Sportpark Retie, Retie',
    competition: 'Provinciale 1',
    hasBusTrip: true,
    busTripId: 'bt1',
  },
  {
    id: 'm2',
    opponent: 'KFC Dessel Sport',
    date: '2025-08-17',
    time: '15:00',
    isHome: true,
    location: 'Sportpark Pulle',
    competition: 'Provinciale 1',
    hasBusTrip: false,
  },
  {
    id: 'm3',
    opponent: 'Turnhout VV',
    date: '2025-08-24',
    time: '15:00',
    isHome: false,
    location: 'Albertpark, Turnhout',
    competition: 'Provinciale 1',
    hasBusTrip: true,
    busTripId: 'bt2',
  },
  {
    id: 'm4',
    opponent: 'SKW Zandhoven',
    date: '2025-08-31',
    time: '15:00',
    isHome: true,
    location: 'Sportpark Pulle',
    competition: 'Provinciale 1',
    hasBusTrip: false,
  },
  {
    id: 'm5',
    opponent: 'FC Mol',
    date: '2025-09-07',
    time: '15:00',
    isHome: false,
    location: 'Sportcomplex Mol',
    competition: 'Provinciale 1',
    hasBusTrip: true,
    busTripId: 'bt3',
  },
];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'a1',
    title: 'Paardenkoers Zandhoven',
    date: '2025-09-14',
    time: '13:00',
    location: 'Zandhoven',
    description:
      'Jaarlijkse paardenkoers! Kom meegenieten van een gezellige dag met de supportersclub.',
  },
  {
    id: 'a2',
    title: 'Ontbijtactie',
    date: '2025-10-05',
    time: '09:00',
    location: 'Café De Kopere, Pulle',
    description:
      'Gezellig ontbijt voor alle leden. Inschrijven vereist. Prijs: €10 per persoon.',
  },
  {
    id: 'a3',
    title: 'Nieuwjaarsreceptie',
    date: '2026-01-11',
    time: '16:00',
    location: 'Gemeentehuis Zandhoven',
    description: 'Jaarlijkse nieuwjaarsreceptie voor alle leden en sympathisanten.',
  },
];

export const MOCK_BUS_TRIPS: BusTrip[] = [
  {
    id: 'bt1',
    matchId: 'm1',
    opponent: 'FC Retie',
    matchDate: '2025-08-10',
    matchTime: '15:00',
    departureLocation: 'Café De Kopere, Pulle',
    departureTime: '13:30',
    totalSeats: 50,
    reservedSeats: 32,
    waitingList: 0,
    pricesMember: 8,
    pricesMemberKind: 4,
    pricesSteunkaart: 10,
    pricesSteunkaartKind: 5,
  },
  {
    id: 'bt2',
    matchId: 'm3',
    opponent: 'Turnhout VV',
    matchDate: '2025-08-24',
    matchTime: '15:00',
    departureLocation: 'Café De Kopere, Pulle',
    departureTime: '13:45',
    totalSeats: 50,
    reservedSeats: 48,
    waitingList: 3,
    pricesMember: 8,
    pricesMemberKind: 4,
    pricesSteunkaart: 10,
    pricesSteunkaartKind: 5,
  },
  {
    id: 'bt3',
    matchId: 'm5',
    opponent: 'FC Mol',
    matchDate: '2025-09-07',
    matchTime: '15:00',
    departureLocation: 'Café De Kopere, Pulle',
    departureTime: '13:15',
    totalSeats: 50,
    reservedSeats: 10,
    waitingList: 0,
    pricesMember: 8,
    pricesMemberKind: 4,
    pricesSteunkaart: 10,
    pricesSteunkaartKind: 5,
  },
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: '🚌 Nog 8 plaatsen beschikbaar voor Retie!',
    summary: 'Reserveer snel je plaats op de bus naar FC Retie.',
    content:
      'Er zijn nog slechts 8 plaatsen beschikbaar voor de verplaatsing naar FC Retie op 10 augustus. Reserveer snel via de app om zeker te zijn van je plek op de bus. Vertrek om 13:30 aan Café De Kopere.',
    date: '2025-08-05',
    category: 'bus',
  },
  {
    id: 'n2',
    title: '👕 Nieuwe Pulafanatics-hoodies beschikbaar!',
    summary: 'De nieuwe collectie hoodies is nu verkrijgbaar in onze webshop.',
    content:
      'Onze nieuwe Pulafanatics-hoodies zijn nu beschikbaar in alle maten. Bestel ze snel via de webshop. Beschikbaar in S, M, L, XL en XXL. Prijs: €45.',
    date: '2025-08-01',
    category: 'webshop',
  },
  {
    id: 'n3',
    title: '⚽ Seizoensstart 2025-2026',
    summary: 'Het nieuwe seizoen staat voor de deur! Alle info hier.',
    content:
      'Na een geslaagde voorbereiding staat de ploeg klaar voor het nieuwe seizoen in Provinciale 1. De eerste thuiswedstrijd is op 17 augustus tegen KFC Dessel Sport. Afspraak om 14:00 aan het sportpark.',
    date: '2025-07-28',
    category: 'wedstrijd',
  },
  {
    id: 'n4',
    title: '📣 Inschrijvingen paardenkoers geopend!',
    summary: 'Schrijf je nu in voor de jaarlijkse paardenkoers op 14 september.',
    content:
      'De inschrijvingen voor de jaarlijkse paardenkoers in Zandhoven zijn nu geopend. Dit jaar organiseren we ook een BBQ na de koers. Inschrijven kan via de app of bij een bestuurslid.',
    date: '2025-07-20',
    category: 'activiteit',
  },
  {
    id: 'n5',
    title: '🎉 Ledenfeest groot succes!',
    summary: 'Het jaarlijkse ledenfeest was opnieuw een voltreffer.',
    content:
      'Meer dan 150 leden en sympathisanten kwamen samen voor het jaarlijkse ledenfeest. Met een optreden van een lokale band en een gezellige sfeer was het opnieuw een succesvolle avond. Bedankt aan iedereen die aanwezig was!',
    date: '2025-06-15',
    category: 'activiteit',
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Pulafanatics Hoodie 2025',
    description:
      'Officiële Pulafanatics hoodie van het seizoen 2025-2026. Gemaakt van hoogwaardig katoen.',
    category: 'hoodies',
    price: 45,
    images: [],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: { S: 5, M: 8, L: 10, XL: 6, XXL: 3 },
  },
  {
    id: 'p2',
    name: 'Pulafanatics T-shirt 2025',
    description:
      'Officieel T-shirt van Pulafanatics. Comfortabel en stijlvol voor elke supporter.',
    category: 't-shirts',
    price: 25,
    images: [],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: { S: 10, M: 15, L: 12, XL: 8, XXL: 5 },
  },
  {
    id: 'p3',
    name: 'Pulafanatics Vest 2025',
    description:
      'Stijlvol vest met Pulafanatics-logo. Ideaal voor koelere wedstrijddagen.',
    category: 'vesten',
    price: 55,
    images: [],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: { S: 3, M: 5, L: 7, XL: 4, XXL: 2 },
  },
  {
    id: 'p4',
    name: 'Pulafanatics Kinderhoodie',
    description: 'Hoodie voor de kleinste supporters van Pulafanatics.',
    category: 'hoodies',
    price: 30,
    images: [],
    sizes: ['104', '116', '128', '140', '152'],
    stock: { '104': 4, '116': 6, '128': 5, '140': 3, '152': 4 },
  },
  {
    id: 'p5',
    name: 'Kinder T-shirt Pulafanatics',
    description: 'T-shirt voor kinderen met Pulafanatics-logo.',
    category: 't-shirts',
    price: 18,
    images: [],
    sizes: ['104', '116', '128', '140', '152'],
    stock: { '104': 8, '116': 10, '128': 7, '140': 5, '152': 6 },
  },
  {
    id: 'p6',
    name: 'Member Lidmaatschap 2025-2026',
    description:
      'Jaarlijks lidmaatschap voor supporters vanaf 16 jaar. Inclusief voorrangsregeling bus.',
    category: 'lidmaatschappen',
    price: 85,
    images: [],
    sizes: [],
    stock: {},
  },
  {
    id: 'p7',
    name: 'Member Kind Lidmaatschap 2025-2026',
    description: 'Jaarlijks lidmaatschap voor kinderen jonger dan 16 jaar.',
    category: 'lidmaatschappen',
    price: 15,
    images: [],
    sizes: [],
    stock: {},
  },
];

export const MOCK_GALLERY_ALBUMS: GalleryAlbum[] = [
  {
    id: 'g1',
    title: 'Busverplaatsing FC Retie 2025',
    date: '2025-08-10',
    category: 'busverplaatsingen',
    coverImage: '',
    photos: [],
  },
  {
    id: 'g2',
    title: 'Paardenkoers Zandhoven 2024',
    date: '2024-09-15',
    category: 'paardenkoers',
    coverImage: '',
    photos: [],
  },
  {
    id: 'g3',
    title: 'Ontbijtactie oktober 2024',
    date: '2024-10-06',
    category: 'ontbijtactie',
    coverImage: '',
    photos: [],
  },
  {
    id: 'g4',
    title: 'Ledenfeest 2024',
    date: '2024-06-15',
    category: 'supportersactiviteiten',
    coverImage: '',
    photos: [],
  },
  {
    id: 'g5',
    title: 'Sfeerbeelden thuis 2024-2025',
    date: '2025-05-01',
    category: 'sfeerbeelden',
    coverImage: '',
    photos: [],
  },
];

export const MOCK_SPONSORS: Sponsor[] = [
  {
    id: 's1',
    name: 'Café De Kopere',
    description: 'Stamcafé van Pulafanatics. Alle wedstrijden live op groot scherm.',
    logoUrl: '',
    website: 'https://cafedekopere.be',
    phone: '+32 03 484 12 34',
    address: 'Dorpstraat 1, 2980 Zandhoven',
    isBannerSponsor: true,
  },
  {
    id: 's2',
    name: 'Garage Pieters',
    description:
      'Uw vertrouwde garagist in de regio Zandhoven. Voor aankoop en onderhoud van uw wagen.',
    logoUrl: '',
    website: 'https://garagepieters.be',
    phone: '+32 03 484 56 78',
    address: 'Industrieweg 5, 2980 Zandhoven',
    isBannerSponsor: false,
  },
  {
    id: 's3',
    name: 'Bakkerij Vermeersch',
    description:
      'Verse broden en gebak elke dag. Officieel leverancier van de Pulafanatics ontbijtactie.',
    logoUrl: '',
    website: '',
    phone: '+32 03 484 90 12',
    address: 'Kerkstraat 12, 2980 Zandhoven',
    isBannerSponsor: false,
  },
  {
    id: 's4',
    name: 'Bouwbedrijf Janssen',
    description: 'Specialist in renovatie en nieuwbouw in de provincie Antwerpen.',
    logoUrl: '',
    website: 'https://bouwbedrijfjanssen.be',
    phone: '+32 476 34 56 78',
    address: 'Nijverheidsstraat 8, 2980 Zandhoven',
    isBannerSponsor: true,
  },
];

export const MEMBERSHIP_FORMULAS: MembershipFormula[] = [
  {
    type: 'member',
    label: 'Member',
    ageDescription: 'Vanaf 16 jaar',
    price: 85,
    benefits: [
      'Volwaardige stemrecht op algemene vergadering',
      'Voorrang bij busreservaties',
      'Korting in de webshop',
      'Digitale ledenkaart',
      'Toegang tot alle ledenactiviteiten',
    ],
  },
  {
    type: 'member_kind',
    label: 'Member Kind',
    ageDescription: 'Jonger dan 16 jaar',
    price: 15,
    benefits: [
      'Voorrang bij busreservaties',
      'Digitale ledenkaart',
      'Toegang tot alle ledenactiviteiten',
    ],
  },
  {
    type: 'steunkaart',
    label: 'Steunkaart',
    ageDescription: 'Vanaf 16 jaar',
    price: 10,
    benefits: [
      'Steun de supportersclub',
      'Digitale ledenkaart',
      'Toegang tot ledenaanbiedingen',
    ],
  },
  {
    type: 'steunkaart_kind',
    label: 'Steunkaart Kind',
    ageDescription: 'Jonger dan 16 jaar',
    price: 10,
    benefits: ['Steun de supportersclub', 'Digitale ledenkaart'],
  },
];

export const MOCK_RESERVATIONS: BusReservation[] = [
  {
    id: 'r1',
    busTripId: 'bt1',
    userId: '1',
    passengers: [
      { id: 'p1', firstName: 'Jan', lastName: 'De Smedt', membershipType: 'member' },
      {
        id: 'p2',
        firstName: 'Marie',
        lastName: 'De Smedt',
        membershipType: 'member_kind',
      },
    ],
    totalPrice: 12,
    status: 'confirmed',
    createdAt: '2025-07-30',
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'o1',
    userId: '1',
    items: [
      {
        productId: 'p1',
        productName: 'Pulafanatics Hoodie 2025',
        size: 'L',
        quantity: 1,
        price: 45,
      },
    ],
    totalAmount: 45,
    status: 'delivered',
    createdAt: '2025-06-20',
  },
];
