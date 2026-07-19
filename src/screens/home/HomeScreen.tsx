import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { useAuth } from '../../context/AuthContext';
import {
  MOCK_MATCHES,
  MOCK_BUS_TRIPS,
  MOCK_ACTIVITIES,
  MOCK_NEWS,
  MOCK_SPONSORS,
} from '../../data/mockData';

const COLORS = {
  primary: '#1B4F8A',
  secondary: '#E8B800',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#888',
  dark: '#1A1A1A',
  green: '#27AE60',
  red: '#E74C3C',
  orange: '#F39C12',
};

type Nav = NativeStackNavigationProp<RootStackParamList>;

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('nl-BE', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
  });
};

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { user } = useAuth();

  const nextMatch = MOCK_MATCHES[0];
  const nextBusTrip = MOCK_BUS_TRIPS[0];
  const nextActivity = MOCK_ACTIVITIES[0];
  const latestNews = MOCK_NEWS.slice(0, 3);
  const bannerSponsors = MOCK_SPONSORS.filter((s) => s.isBannerSponsor);

  const freeSeats = nextBusTrip
    ? nextBusTrip.totalSeats - nextBusTrip.reservedSeats
    : 0;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoEmoji}>⚽</Text>
        </View>
        <Text style={styles.appTitle}>Pulafanatics</Text>
        <Text style={styles.appSubtitle}>Supportersclub</Text>
        {user && (
          <Text style={styles.welcomeText}>
            Welkom, {user.firstName}!
            {user.role === 'admin' && (
              <Text style={styles.adminBadge}> 🔑 Admin</Text>
            )}
          </Text>
        )}
      </View>

      {/* Quick cards */}
      <View style={styles.quickCards}>
        {/* Next match */}
        {nextMatch && (
          <View style={styles.card}>
            <Text style={styles.cardLabel}>⚽ Eerstvolgende wedstrijd</Text>
            <Text style={styles.cardTitle}>
              {nextMatch.isHome
                ? `Pulle vs ${nextMatch.opponent}`
                : `${nextMatch.opponent} vs Pulle`}
            </Text>
            <Text style={styles.cardDetail}>📅 {formatDate(nextMatch.date)}</Text>
            <Text style={styles.cardDetail}>⏰ {nextMatch.time}</Text>
            <Text style={styles.cardDetail}>📍 {nextMatch.location}</Text>
            <View
              style={[
                styles.badge,
                nextMatch.isHome ? styles.badgeGreen : styles.badgeBlue,
              ]}
            >
              <Text style={styles.badgeText}>
                {nextMatch.isHome ? '🏠 Thuis' : '🚌 Uit'}
              </Text>
            </View>
          </View>
        )}

        {/* Next bus trip */}
        {nextBusTrip && (
          <View style={styles.card}>
            <Text style={styles.cardLabel}>🚌 Eerstvolgende busverplaatsing</Text>
            <Text style={styles.cardTitle}>→ {nextBusTrip.opponent}</Text>
            <Text style={styles.cardDetail}>
              📅 {formatDate(nextBusTrip.matchDate)}
            </Text>
            <Text style={styles.cardDetail}>
              🚏 Vertrek: {nextBusTrip.departureTime}
            </Text>
            <Text
              style={[
                styles.cardDetail,
                freeSeats <= 5 ? styles.textRed : styles.textGreen,
              ]}
            >
              💺 {freeSeats} plaatsen vrij
            </Text>
          </View>
        )}

        {/* Next activity */}
        {nextActivity && (
          <View style={styles.card}>
            <Text style={styles.cardLabel}>🎉 Eerstvolgende activiteit</Text>
            <Text style={styles.cardTitle}>{nextActivity.title}</Text>
            <Text style={styles.cardDetail}>
              📅 {formatDate(nextActivity.date)}
            </Text>
            <Text style={styles.cardDetail}>⏰ {nextActivity.time}</Text>
            <Text style={styles.cardDetail}>📍 {nextActivity.location}</Text>
          </View>
        )}
      </View>

      {/* Action buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: COLORS.primary }]}
          onPress={() => navigation.navigate('BusReservation', { trip: nextBusTrip })}
        >
          <Text style={styles.actionBtnText}>🚌 Reserveer je plaats op de bus</Text>
        </TouchableOpacity>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionBtnSmall, { backgroundColor: COLORS.secondary }]}
            onPress={() =>
              navigation.navigate('MainTabs')
            }
          >
            <Text style={styles.actionBtnSmallText}>💳 Word lid</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtnSmall, { backgroundColor: COLORS.primary }]}
            onPress={() => navigation.navigate('MainTabs')}
          >
            <Text style={styles.actionBtnSmallText}>🛒 Webshop</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Latest news */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📰 Laatste nieuws</Text>
        {latestNews.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.newsCard}
            onPress={() => navigation.navigate('NewsDetail', { item })}
          >
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsSummary}>{item.summary}</Text>
            <Text style={styles.newsDate}>{formatDate(item.date)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sponsors */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🤝 Sponsors</Text>
        {bannerSponsors.map((sponsor) => (
          <TouchableOpacity
            key={sponsor.id}
            style={styles.sponsorBanner}
            onPress={() =>
              sponsor.website
                ? Linking.openURL(sponsor.website)
                : null
            }
          >
            <View style={styles.sponsorLogoPlaceholder}>
              <Text style={styles.sponsorLogoText}>
                {sponsor.name.charAt(0)}
              </Text>
            </View>
            <View style={styles.sponsorInfo}>
              <Text style={styles.sponsorName}>{sponsor.name}</Text>
              <Text style={styles.sponsorDesc} numberOfLines={2}>
                {sponsor.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Admin button */}
      {user?.role === 'admin' && (
        <TouchableOpacity
          style={styles.adminBtn}
          onPress={() => navigation.navigate('AdminDashboard')}
        >
          <Text style={styles.adminBtnText}>🔑 Beheerderspaneel openen</Text>
        </TouchableOpacity>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGray },
  header: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 28,
    paddingHorizontal: 20,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  logoEmoji: { fontSize: 40 },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    letterSpacing: 1,
  },
  appSubtitle: { fontSize: 14, color: COLORS.secondary, marginTop: 2 },
  welcomeText: { fontSize: 14, color: COLORS.white, marginTop: 8 },
  adminBadge: { color: COLORS.secondary, fontWeight: 'bold' },
  quickCards: { padding: 16, gap: 12 },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
  },
  cardLabel: { fontSize: 12, color: COLORS.gray, marginBottom: 6, fontWeight: '600' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.dark, marginBottom: 8 },
  cardDetail: { fontSize: 14, color: COLORS.gray, marginBottom: 4 },
  badge: { alignSelf: 'flex-start', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4, marginTop: 8 },
  badgeGreen: { backgroundColor: '#E8F8F0' },
  badgeBlue: { backgroundColor: '#EEF4FF' },
  badgeText: { fontSize: 12, fontWeight: '600' },
  textRed: { color: COLORS.red },
  textGreen: { color: COLORS.green },
  actions: { paddingHorizontal: 16, marginBottom: 8 },
  actionBtn: {
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionBtnText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
  actionRow: { flexDirection: 'row', gap: 10 },
  actionBtnSmall: {
    flex: 1,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  actionBtnSmallText: { color: COLORS.white, fontSize: 14, fontWeight: 'bold' },
  section: { padding: 16 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 12,
  },
  newsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  newsTitle: { fontSize: 15, fontWeight: '700', color: COLORS.dark, marginBottom: 4 },
  newsSummary: { fontSize: 13, color: COLORS.gray, marginBottom: 6, lineHeight: 18 },
  newsDate: { fontSize: 12, color: COLORS.primary },
  sponsorBanner: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondary,
  },
  sponsorLogoPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  sponsorLogoText: { fontSize: 22, color: COLORS.white, fontWeight: 'bold' },
  sponsorInfo: { flex: 1 },
  sponsorName: { fontSize: 15, fontWeight: 'bold', color: COLORS.dark, marginBottom: 4 },
  sponsorDesc: { fontSize: 12, color: COLORS.gray, lineHeight: 17 },
  adminBtn: {
    margin: 16,
    backgroundColor: '#2C3E50',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  adminBtnText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 },
});
