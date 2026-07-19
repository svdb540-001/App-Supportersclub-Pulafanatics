// ============================================================
// Pulafanatics App – Type definitions
// ============================================================

export type MembershipType =
  | 'member'
  | 'member_kind'
  | 'steunkaart'
  | 'steunkaart_kind';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  profileImage?: string;
  membershipType: MembershipType;
  membershipExpiry: string;
  memberNumber: string;
  role: 'member' | 'admin';
  familyMembers: FamilyMember[];
}

export interface FamilyMember {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  membershipType: MembershipType;
  memberNumber: string;
}

export interface Match {
  id: string;
  opponent: string;
  date: string;
  time: string;
  isHome: boolean;
  location: string;
  competition: string;
  hasBusTrip: boolean;
  busTripId?: string;
}

export interface Activity {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl?: string;
}

export interface BusTrip {
  id: string;
  matchId: string;
  opponent: string;
  matchDate: string;
  matchTime: string;
  departureLocation: string;
  departureTime: string;
  totalSeats: number;
  reservedSeats: number;
  waitingList: number;
  pricesMember: number;
  pricesMemberKind: number;
  pricesSteunkaart: number;
  pricesSteunkaartKind: number;
}

export interface BusReservation {
  id: string;
  busTripId: string;
  userId: string;
  passengers: ReservationPassenger[];
  totalPrice: number;
  status: 'confirmed' | 'waiting' | 'cancelled';
  createdAt: string;
}

export interface ReservationPassenger {
  id: string;
  firstName: string;
  lastName: string;
  membershipType: MembershipType;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  imageUrl?: string;
  category: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  images: string[];
  sizes: string[];
  stock: Record<string, number>;
}

export type ProductCategory =
  | 'lidmaatschappen'
  | 't-shirts'
  | 'hoodies'
  | 'vesten'
  | 'accessoires'
  | 'acties';

export interface CartItem {
  productId: string;
  productName: string;
  size: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  date: string;
  category: string;
  coverImage: string;
  photos: string[];
}

export interface Sponsor {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  website: string;
  phone: string;
  address: string;
  isBannerSponsor: boolean;
}

export interface MembershipFormula {
  type: MembershipType;
  label: string;
  ageDescription: string;
  price: number;
  benefits: string[];
}

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  BusReservation: { trip: BusTrip };
  ProductDetail: { product: Product };
  AlbumDetail: { album: GalleryAlbum };
  NewsDetail: { item: NewsItem };
  AdminDashboard: undefined;
  AdminMembers: undefined;
  AdminBus: undefined;
  AdminMatches: undefined;
  AdminShop: undefined;
  AdminNews: undefined;
  AdminSponsors: undefined;
  AdminGallery: undefined;
};
