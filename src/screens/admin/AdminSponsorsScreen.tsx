import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import { MOCK_SPONSORS } from '../../data/mockData';

const COLORS = {
  primary: '#1B4F8A',
  secondary: '#E8B800',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#888',
  dark: '#1A1A1A',
  green: '#27AE60',
};

export default function AdminSponsorsScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🤝 Sponsors beheer</Text>
        <Text style={styles.headerSubtitle}>{MOCK_SPONSORS.length} sponsors</Text>
      </View>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => Alert.alert('Nieuw', 'Sponsor toevoegen – binnenkort beschikbaar.')}
      >
        <Text style={styles.addBtnText}>➕ Nieuwe sponsor toevoegen</Text>
      </TouchableOpacity>

      <View style={styles.list}>
        {MOCK_SPONSORS.map((sponsor) => (
          <View key={sponsor.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.logoPlaceholder}>
                <Text style={styles.logoText}>{sponsor.name.charAt(0)}</Text>
              </View>
              <View style={styles.sponsorInfo}>
                <Text style={styles.sponsorName}>{sponsor.name}</Text>
                <Text style={styles.sponsorDesc} numberOfLines={2}>
                  {sponsor.description}
                </Text>
                {sponsor.isBannerSponsor && (
                  <View style={styles.bannerBadge}>
                    <Text style={styles.bannerBadgeText}>⭐ Bannersponsor</Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.contactInfo}>
              <Text style={styles.contactText}>📞 {sponsor.phone}</Text>
              {sponsor.website && (
                <Text style={styles.contactText}>🌐 {sponsor.website}</Text>
              )}
              <Text style={styles.contactText}>📍 {sponsor.address}</Text>
            </View>

            <View style={styles.cardActions}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => Alert.alert('Bewerken', `${sponsor.name} bewerken.`)}
              >
                <Text style={styles.actionBtnText}>✏️ Bewerken</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, sponsor.isBannerSponsor && styles.bannerBtn]}
                onPress={() =>
                  Alert.alert(
                    'Banner',
                    `${sponsor.isBannerSponsor ? 'Verwijder' : 'Activeer'} bannersponsor.`,
                  )
                }
              >
                <Text
                  style={[
                    styles.actionBtnText,
                    sponsor.isBannerSponsor && styles.bannerBtnText,
                  ]}
                >
                  {sponsor.isBannerSponsor ? '⭐ Banner actief' : '⭐ Maak banner'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGray },
  header: { backgroundColor: '#2C3E50', padding: 20 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.white },
  headerSubtitle: { fontSize: 14, color: COLORS.secondary, marginTop: 4 },
  addBtn: {
    backgroundColor: COLORS.green,
    margin: 16,
    marginBottom: 8,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  addBtnText: { color: COLORS.white, fontWeight: 'bold', fontSize: 14 },
  list: { padding: 16, paddingTop: 8 },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  cardHeader: { flexDirection: 'row', marginBottom: 12, gap: 12 },
  logoPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  logoText: { fontSize: 20, color: COLORS.white, fontWeight: 'bold' },
  sponsorInfo: { flex: 1 },
  sponsorName: { fontSize: 16, fontWeight: 'bold', color: COLORS.dark },
  sponsorDesc: { fontSize: 12, color: COLORS.gray, marginTop: 3, lineHeight: 17 },
  bannerBadge: {
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  bannerBadgeText: { fontSize: 11, fontWeight: 'bold', color: COLORS.dark },
  contactInfo: { gap: 3, marginBottom: 12 },
  contactText: { fontSize: 12, color: COLORS.gray },
  cardActions: { flexDirection: 'row', gap: 8 },
  actionBtn: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionBtnText: { fontSize: 12, color: COLORS.primary, fontWeight: '600' },
  bannerBtn: { borderColor: COLORS.secondary, backgroundColor: '#FFFBE6' },
  bannerBtnText: { color: '#B7860B' },
});
