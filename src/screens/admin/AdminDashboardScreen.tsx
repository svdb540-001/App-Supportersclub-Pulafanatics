import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { MOCK_USERS, MOCK_BUS_TRIPS, MOCK_NEWS, MOCK_PRODUCTS } from '../../data/mockData';

const COLORS = {
  primary: '#1B4F8A',
  secondary: '#E8B800',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#888',
  dark: '#1A1A1A',
  green: '#27AE60',
  red: '#E74C3C',
};

type Nav = NativeStackNavigationProp<RootStackParamList>;

interface AdminTile {
  icon: string;
  title: string;
  subtitle: string;
  screen: keyof RootStackParamList;
  color: string;
}

const ADMIN_TILES: AdminTile[] = [
  {
    icon: '👥',
    title: 'Leden',
    subtitle: `${MOCK_USERS.length} leden`,
    screen: 'AdminMembers',
    color: '#1B4F8A',
  },
  {
    icon: '🚌',
    title: 'Busverplaatsingen',
    subtitle: `${MOCK_BUS_TRIPS.length} ritten`,
    screen: 'AdminBus',
    color: '#27AE60',
  },
  {
    icon: '⚽',
    title: 'Wedstrijden',
    subtitle: 'Agenda beheren',
    screen: 'AdminMatches',
    color: '#8E44AD',
  },
  {
    icon: '🛒',
    title: 'Webshop',
    subtitle: `${MOCK_PRODUCTS.length} producten`,
    screen: 'AdminShop',
    color: '#E67E22',
  },
  {
    icon: '📰',
    title: 'Nieuwsberichten',
    subtitle: `${MOCK_NEWS.length} berichten`,
    screen: 'AdminNews',
    color: '#E74C3C',
  },
  {
    icon: '🤝',
    title: 'Sponsors',
    subtitle: 'Sponsors beheren',
    screen: 'AdminSponsors',
    color: '#16A085',
  },
  {
    icon: '📸',
    title: 'Fotoalbums',
    subtitle: 'Galerij beheren',
    screen: 'AdminGallery',
    color: '#2980B9',
  },
];

export default function AdminDashboardScreen() {
  const navigation = useNavigation<Nav>();

  const sendPushNotification = () => {
    Alert.prompt
      ? Alert.prompt(
          'Pushmelding versturen',
          'Typ je bericht:',
          (msg) => {
            if (msg) Alert.alert('Verstuurd ✓', `Melding verstuurd naar alle leden: "${msg}"`);
          },
        )
      : Alert.alert('Pushmelding', 'Voer je bericht in via het nieuwsscherm.');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔑 Beheerderspaneel</Text>
        <Text style={styles.headerSubtitle}>Pulafanatics Admin</Text>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        {[
          { label: 'Leden', value: MOCK_USERS.length, color: COLORS.primary },
          {
            label: 'Bus ritten',
            value: MOCK_BUS_TRIPS.length,
            color: COLORS.green,
          },
          { label: 'Producten', value: MOCK_PRODUCTS.length, color: '#E67E22' },
        ].map((stat) => (
          <View key={stat.label} style={[styles.statCard, { borderTopColor: stat.color }]}>
            <Text style={[styles.statValue, { color: stat.color }]}>
              {stat.value}
            </Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Push notification button */}
      <TouchableOpacity style={styles.pushBtn} onPress={sendPushNotification}>
        <Text style={styles.pushBtnText}>🔔 Pushmelding versturen</Text>
      </TouchableOpacity>

      {/* Tiles grid */}
      <View style={styles.tilesGrid}>
        {ADMIN_TILES.map((tile) => (
          <TouchableOpacity
            key={tile.screen}
            style={styles.tile}
            onPress={() => navigation.navigate(tile.screen as any)}
          >
            <View style={[styles.tileIcon, { backgroundColor: tile.color + '20' }]}>
              <Text style={styles.tileEmoji}>{tile.icon}</Text>
            </View>
            <Text style={styles.tileTitle}>{tile.title}</Text>
            <Text style={styles.tileSubtitle}>{tile.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGray },
  header: {
    backgroundColor: '#2C3E50',
    padding: 20,
    paddingTop: 24,
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.white },
  headerSubtitle: { fontSize: 14, color: COLORS.secondary, marginTop: 4 },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    borderTopWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  statValue: { fontSize: 26, fontWeight: 'bold' },
  statLabel: { fontSize: 12, color: COLORS.gray, marginTop: 2 },
  pushBtn: {
    backgroundColor: '#E74C3C',
    margin: 16,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  pushBtnText: { color: COLORS.white, fontWeight: 'bold', fontSize: 15 },
  tilesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 12,
  },
  tile: {
    width: '45%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: '2%',
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  tileIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tileEmoji: { fontSize: 28 },
  tileTitle: { fontSize: 15, fontWeight: 'bold', color: COLORS.dark, textAlign: 'center' },
  tileSubtitle: { fontSize: 12, color: COLORS.gray, marginTop: 3, textAlign: 'center' },
});
