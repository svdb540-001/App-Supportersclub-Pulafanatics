import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { MOCK_RESERVATIONS, MOCK_ORDERS } from '../../data/mockData';
import { MembershipType } from '../../types';

const COLORS = {
  primary: '#1B4F8A',
  secondary: '#E8B800',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#888',
  dark: '#1A1A1A',
  green: '#27AE60',
};

type Tab = 'profiel' | 'reservaties' | 'bestellingen';

const membershipLabel = (type: MembershipType): string => {
  const map: Record<MembershipType, string> = {
    member: 'Member',
    member_kind: 'Member Kind',
    steunkaart: 'Steunkaart',
    steunkaart_kind: 'Steunkaart Kind',
  };
  return map[type];
};

const membershipPrice = (type: MembershipType): number => {
  const map: Record<MembershipType, number> = {
    member: 85,
    member_kind: 15,
    steunkaart: 10,
    steunkaart_kind: 10,
  };
  return map[type];
};

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState<Tab>('profiel');

  if (!user) return null;

  const userReservations = MOCK_RESERVATIONS.filter((r) => r.userId === user.id);
  const userOrders = MOCK_ORDERS.filter((o) => o.userId === user.id);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile header */}
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>
            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
          </Text>
        </View>
        <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
        <Text style={styles.memberNumber}>Lidnummer: {user.memberNumber}</Text>
        {user.role === 'admin' && (
          <View style={styles.adminBadge}>
            <Text style={styles.adminBadgeText}>🔑 Beheerder</Text>
          </View>
        )}
      </View>

      {/* Digital membership card */}
      <View style={styles.memberCard}>
        <View style={styles.memberCardLeft}>
          <Text style={styles.memberCardClub}>⚽ Pulafanatics</Text>
          <Text style={styles.memberCardName}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={styles.memberCardType}>{membershipLabel(user.membershipType)}</Text>
          <Text style={styles.memberCardNumber}>{user.memberNumber}</Text>
        </View>
        <View style={styles.memberCardRight}>
          {/* QR code placeholder */}
          <View style={styles.qrPlaceholder}>
            <Text style={styles.qrText}>▦</Text>
            <Text style={styles.qrLabel}>QR</Text>
          </View>
          <Text style={styles.expiryText}>Geldig t/m</Text>
          <Text style={styles.expiryDate}>{user.membershipExpiry}</Text>
        </View>
      </View>

      {/* Tab navigation */}
      <View style={styles.tabBar}>
        {(['profiel', 'reservaties', 'bestellingen'] as Tab[]).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, tab === t && styles.tabActive]}
            onPress={() => setTab(t)}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t === 'profiel' ? '👤 Profiel' : t === 'reservaties' ? '🚌 Bus' : '🛒 Webshop'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab content */}
      <View style={styles.content}>
        {tab === 'profiel' && (
          <View>
            <View style={styles.infoCard}>
              <Text style={styles.infoCardTitle}>Persoonlijke gegevens</Text>
              {[
                { label: 'Voornaam', value: user.firstName },
                { label: 'Achternaam', value: user.lastName },
                { label: 'E-mail', value: user.email },
                { label: 'Telefoon', value: user.phone },
                { label: 'Geboortedatum', value: user.dateOfBirth },
              ].map((item) => (
                <View key={item.label} style={styles.infoRow}>
                  <Text style={styles.infoLabel}>{item.label}</Text>
                  <Text style={styles.infoValue}>{item.value}</Text>
                </View>
              ))}
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoCardTitle}>Lidmaatschap</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Type</Text>
                <Text style={styles.infoValue}>
                  {membershipLabel(user.membershipType)}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Prijs</Text>
                <Text style={styles.infoValue}>
                  €{membershipPrice(user.membershipType)}/jaar
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Geldig tot</Text>
                <Text style={styles.infoValue}>{user.membershipExpiry}</Text>
              </View>
            </View>

            {user.familyMembers.length > 0 && (
              <View style={styles.infoCard}>
                <Text style={styles.infoCardTitle}>Gezinsleden</Text>
                {user.familyMembers.map((fm) => (
                  <View key={fm.id} style={styles.familyRow}>
                    <Text style={styles.familyName}>
                      {fm.firstName} {fm.lastName}
                    </Text>
                    <Text style={styles.familyMembership}>
                      {membershipLabel(fm.membershipType)} – {fm.memberNumber}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={() =>
                Alert.alert('Afmelden', 'Wil je uitloggen?', [
                  { text: 'Annuleer', style: 'cancel' },
                  { text: 'Uitloggen', onPress: logout, style: 'destructive' },
                ])
              }
            >
              <Text style={styles.logoutBtnText}>Uitloggen</Text>
            </TouchableOpacity>
          </View>
        )}

        {tab === 'reservaties' && (
          <View>
            {userReservations.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>🚌</Text>
                <Text style={styles.emptyText}>Nog geen busreservaties.</Text>
              </View>
            ) : (
              userReservations.map((res) => (
                <View key={res.id} style={styles.reservationCard}>
                  <View style={styles.resHeader}>
                    <Text style={styles.resOpponent}>
                      Verplaatsing #{res.id}
                    </Text>
                    <View
                      style={[
                        styles.resBadge,
                        res.status === 'confirmed'
                          ? styles.resBadgeGreen
                          : styles.resBadgeOrange,
                      ]}
                    >
                      <Text style={styles.resBadgeText}>
                        {res.status === 'confirmed' ? '✓ Bevestigd' : '⏳ Wachtlijst'}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.resDetail}>
                    👥 {res.passengers.length} reiziger(s)
                  </Text>
                  <Text style={styles.resDetail}>💶 €{res.totalPrice}</Text>
                  <Text style={styles.resDetail}>📅 {res.createdAt}</Text>
                </View>
              ))
            )}
          </View>
        )}

        {tab === 'bestellingen' && (
          <View>
            {userOrders.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>🛒</Text>
                <Text style={styles.emptyText}>Nog geen bestellingen.</Text>
              </View>
            ) : (
              userOrders.map((order) => (
                <View key={order.id} style={styles.orderCard}>
                  <View style={styles.orderHeader}>
                    <Text style={styles.orderId}>Bestelling #{order.id}</Text>
                    <Text style={styles.orderStatus}>{order.status}</Text>
                  </View>
                  {order.items.map((item) => (
                    <Text key={item.productId} style={styles.orderItem}>
                      • {item.productName} – Maat {item.size} – €{item.price}
                    </Text>
                  ))}
                  <Text style={styles.orderTotal}>Totaal: €{order.totalAmount}</Text>
                  <Text style={styles.orderDate}>{order.createdAt}</Text>
                </View>
              ))
            )}
          </View>
        )}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGray },
  header: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    padding: 24,
    paddingTop: 32,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: { fontSize: 28, fontWeight: 'bold', color: COLORS.dark },
  userName: { fontSize: 22, fontWeight: 'bold', color: COLORS.white },
  memberNumber: { fontSize: 14, color: COLORS.secondary, marginTop: 4 },
  adminBadge: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 8,
  },
  adminBadgeText: { fontSize: 13, fontWeight: 'bold', color: COLORS.dark },
  memberCard: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 16,
    marginTop: -16,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  memberCardLeft: { flex: 1 },
  memberCardClub: { fontSize: 12, color: COLORS.secondary, fontWeight: 'bold', marginBottom: 8 },
  memberCardName: { fontSize: 18, fontWeight: 'bold', color: COLORS.white },
  memberCardType: { fontSize: 14, color: COLORS.secondary, marginTop: 4 },
  memberCardNumber: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 8 },
  memberCardRight: { alignItems: 'center' },
  qrPlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.white,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  qrText: { fontSize: 30, color: COLORS.dark },
  qrLabel: { fontSize: 10, color: COLORS.gray },
  expiryText: { fontSize: 11, color: 'rgba(255,255,255,0.7)' },
  expiryDate: { fontSize: 13, fontWeight: 'bold', color: COLORS.white },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 10,
    padding: 4,
  },
  tab: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8 },
  tabActive: { backgroundColor: COLORS.primary },
  tabText: { fontSize: 12, color: COLORS.gray, fontWeight: '600' },
  tabTextActive: { color: COLORS.white },
  content: { padding: 16 },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  infoCardTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.dark, marginBottom: 12 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  infoLabel: { fontSize: 14, color: COLORS.gray },
  infoValue: { fontSize: 14, color: COLORS.dark, fontWeight: '500', flex: 1, textAlign: 'right' },
  familyRow: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  familyName: { fontSize: 15, fontWeight: '600', color: COLORS.dark },
  familyMembership: { fontSize: 13, color: COLORS.gray, marginTop: 2 },
  logoutBtn: {
    backgroundColor: '#FFEEEE',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#FFD0D0',
  },
  logoutBtnText: { color: '#E74C3C', fontWeight: 'bold', fontSize: 15 },
  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, color: COLORS.gray },
  reservationCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  resHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  resOpponent: { fontSize: 16, fontWeight: 'bold', color: COLORS.dark },
  resBadge: { borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3 },
  resBadgeGreen: { backgroundColor: '#E8F8F0' },
  resBadgeOrange: { backgroundColor: '#FFF8E1' },
  resBadgeText: { fontSize: 12, fontWeight: '600' },
  resDetail: { fontSize: 14, color: COLORS.gray, marginBottom: 2 },
  orderCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  orderId: { fontSize: 16, fontWeight: 'bold', color: COLORS.dark },
  orderStatus: { fontSize: 13, color: COLORS.green, fontWeight: '600' },
  orderItem: { fontSize: 14, color: COLORS.dark, marginBottom: 4 },
  orderTotal: { fontSize: 15, fontWeight: 'bold', color: COLORS.primary, marginTop: 8 },
  orderDate: { fontSize: 12, color: COLORS.gray, marginTop: 4 },
});

