import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { MOCK_MATCHES, MOCK_ACTIVITIES } from '../../data/mockData';

const COLORS = {
  primary: '#1B4F8A',
  secondary: '#E8B800',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#888',
  dark: '#1A1A1A',
  green: '#27AE60',
};

type Tab = 'wedstrijden' | 'activiteiten';

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('nl-BE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export default function AdminMatchesScreen() {
  const [tab, setTab] = useState<Tab>('wedstrijden');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>⚽ Wedstrijden & Activiteiten</Text>
      </View>

      <View style={styles.tabBar}>
        {(['wedstrijden', 'activiteiten'] as Tab[]).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, tab === t && styles.tabActive]}
            onPress={() => setTab(t)}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t === 'wedstrijden' ? '⚽ Wedstrijden' : '🎉 Activiteiten'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() =>
          Alert.alert(
            'Toevoegen',
            `Nieuwe ${tab === 'wedstrijden' ? 'wedstrijd' : 'activiteit'} toevoegen – binnenkort beschikbaar.`,
          )
        }
      >
        <Text style={styles.addBtnText}>
          ➕ {tab === 'wedstrijden' ? 'Wedstrijd' : 'Activiteit'} toevoegen
        </Text>
      </TouchableOpacity>

      <View style={styles.list}>
        {tab === 'wedstrijden'
          ? MOCK_MATCHES.map((match) => (
              <View key={match.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={[styles.typeBadge, match.isHome ? styles.homeTag : styles.awayTag]}>
                    <Text style={styles.typeBadgeText}>
                      {match.isHome ? '🏠 Thuis' : '🚌 Uit'}
                    </Text>
                  </View>
                  {match.hasBusTrip && (
                    <View style={styles.busBadge}>
                      <Text style={styles.busBadgeText}>🚌 Bus</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.cardTitle}>
                  {match.isHome ? `Pulle vs ${match.opponent}` : `${match.opponent} vs Pulle`}
                </Text>
                <Text style={styles.cardDate}>
                  📅 {formatDate(match.date)} – {match.time}
                </Text>
                <Text style={styles.cardDetail}>📍 {match.location}</Text>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() =>
                    Alert.alert('Bewerken', 'Wedstrijd bewerken – binnenkort beschikbaar.')
                  }
                >
                  <Text style={styles.editBtnText}>✏️ Bewerken</Text>
                </TouchableOpacity>
              </View>
            ))
          : MOCK_ACTIVITIES.map((activity) => (
              <View key={activity.id} style={styles.card}>
                <Text style={styles.cardTitle}>{activity.title}</Text>
                <Text style={styles.cardDate}>
                  📅 {formatDate(activity.date)} – {activity.time}
                </Text>
                <Text style={styles.cardDetail}>📍 {activity.location}</Text>
                <Text style={styles.cardDesc} numberOfLines={2}>
                  {activity.description}
                </Text>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() =>
                    Alert.alert('Bewerken', 'Activiteit bewerken – binnenkort beschikbaar.')
                  }
                >
                  <Text style={styles.editBtnText}>✏️ Bewerken</Text>
                </TouchableOpacity>
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
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: { backgroundColor: COLORS.primary },
  tabText: { fontSize: 14, color: COLORS.gray, fontWeight: '600' },
  tabTextActive: { color: COLORS.white },
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
  cardHeader: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  typeBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  homeTag: { backgroundColor: '#E8F8F0' },
  awayTag: { backgroundColor: '#EEF4FF' },
  typeBadgeText: { fontSize: 11, fontWeight: '600', color: COLORS.dark },
  busBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: '#FFF8E1',
  },
  busBadgeText: { fontSize: 11, fontWeight: '600', color: '#F39C12' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.dark, marginBottom: 4 },
  cardDate: { fontSize: 13, color: COLORS.gray, marginBottom: 2 },
  cardDetail: { fontSize: 13, color: COLORS.gray, marginBottom: 8 },
  cardDesc: { fontSize: 13, color: COLORS.gray, marginBottom: 8, lineHeight: 18 },
  editBtn: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  editBtnText: { fontSize: 12, color: COLORS.primary, fontWeight: '600' },
});
