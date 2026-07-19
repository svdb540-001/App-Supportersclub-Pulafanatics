import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import { MOCK_SPONSORS } from '../../data/mockData';

const COLORS = {
  primary: '#1B4F8A',
  secondary: '#E8B800',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#888',
  dark: '#1A1A1A',
};

export default function SponsorsScreen() {
  const openLink = (url: string) => {
    if (url) {
      Linking.openURL(url).catch(() => Alert.alert('Fout', 'Kan de link niet openen.'));
    }
  };

  const callPhone = (phone: string) => {
    Linking.openURL(`tel:${phone.replace(/\s/g, '')}`).catch(() =>
      Alert.alert('Fout', 'Kan niet bellen.'),
    );
  };

  const openMaps = (address: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(url).catch(() => Alert.alert('Fout', 'Kan Maps niet openen.'));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🤝 Sponsors</Text>
        <Text style={styles.headerSubtitle}>
          Onze trouwe partners die Pulafanatics steunen
        </Text>
      </View>

      <View style={styles.list}>
        {MOCK_SPONSORS.map((sponsor) => (
          <View key={sponsor.id} style={styles.card}>
            {sponsor.isBannerSponsor && (
              <View style={styles.mainSponsorBadge}>
                <Text style={styles.mainSponsorText}>⭐ Hoofdsponsor</Text>
              </View>
            )}

            <View style={styles.cardHeader}>
              <View style={styles.logoPlaceholder}>
                <Text style={styles.logoText}>{sponsor.name.charAt(0)}</Text>
              </View>
              <View style={styles.sponsorInfo}>
                <Text style={styles.sponsorName}>{sponsor.name}</Text>
                <Text style={styles.sponsorDesc}>{sponsor.description}</Text>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              {sponsor.phone && (
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => callPhone(sponsor.phone)}
                >
                  <Text style={styles.actionBtnText}>📞 Bellen</Text>
                </TouchableOpacity>
              )}
              {sponsor.website && (
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => openLink(sponsor.website)}
                >
                  <Text style={styles.actionBtnText}>🌐 Website</Text>
                </TouchableOpacity>
              )}
              {sponsor.address && (
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => openMaps(sponsor.address)}
                >
                  <Text style={styles.actionBtnText}>📍 Route</Text>
                </TouchableOpacity>
              )}
            </View>

            {sponsor.address && (
              <Text style={styles.addressText}>📍 {sponsor.address}</Text>
            )}
          </View>
        ))}
      </View>

      <View style={styles.cta}>
        <Text style={styles.ctaTitle}>Word ook sponsor!</Text>
        <Text style={styles.ctaText}>
          Wil jij ook Pulafanatics steunen? Neem contact met ons op via
          info@pulafanatics.be
        </Text>
        <TouchableOpacity
          style={styles.ctaBtn}
          onPress={() =>
            Linking.openURL('mailto:info@pulafanatics.be?subject=Sponsorschap Pulafanatics')
          }
        >
          <Text style={styles.ctaBtnText}>✉️ Contacteer ons</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGray },
  header: {
    backgroundColor: COLORS.primary,
    padding: 20,
    paddingBottom: 24,
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.white },
  headerSubtitle: { fontSize: 14, color: COLORS.secondary, marginTop: 4 },
  list: { padding: 16 },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  mainSponsorBadge: {
    backgroundColor: COLORS.secondary,
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 10,
  },
  mainSponsorText: { fontSize: 12, fontWeight: 'bold', color: COLORS.dark },
  cardHeader: { flexDirection: 'row', marginBottom: 14, gap: 12 },
  logoPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  logoText: { fontSize: 24, color: COLORS.white, fontWeight: 'bold' },
  sponsorInfo: { flex: 1 },
  sponsorName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 4,
  },
  sponsorDesc: { fontSize: 13, color: COLORS.gray, lineHeight: 18 },
  actions: { flexDirection: 'row', gap: 8, marginBottom: 10, flexWrap: 'wrap' },
  actionBtn: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  actionBtnText: { fontSize: 13, color: COLORS.primary, fontWeight: '600' },
  addressText: { fontSize: 13, color: COLORS.gray },
  cta: {
    backgroundColor: COLORS.primary,
    margin: 16,
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
  },
  ctaTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.white, marginBottom: 8 },
  ctaText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  ctaBtn: {
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  ctaBtnText: { color: COLORS.dark, fontWeight: 'bold', fontSize: 15 },
});
