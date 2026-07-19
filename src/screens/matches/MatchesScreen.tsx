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
import { Match, Activity } from '../../types';

const COLORS = {
  primary: '#1B4F8A',
  secondary: '#E8B800',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#888',
  dark: '#1A1A1A',
  green: '#27AE60',
  orange: '#F39C12',
};

type Tab = 'wedstrijden' | 'activiteiten';

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('nl-BE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export default function MatchesScreen() {
  const [tab, setTab] = useState<Tab>('wedstrijden');

  const addToCalendar = (title: string) => {
    Alert.alert(
      'Kalender',
      `"${title}" is toegevoegd aan je persoonlijke kalender.`,
    );
  };

  return (
    <View style={styles.container}>
      {/* Tab selector */}
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

      <ScrollView showsVerticalScrollIndicator={false}>
        {tab === 'wedstrijden' ? (
          <View style={styles.list}>
            {MOCK_MATCHES.map((match: Match) => (
              <View key={match.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View
                    style={[
                      styles.typeBadge,
                      match.isHome ? styles.homeBadge : styles.awayBadge,
                    ]}
                  >
                    <Text style={styles.typeBadgeText}>
                      {match.isHome ? '🏠 Thuis' : '🚌 Uit'}
                    </Text>
                  </View>
                  {match.hasBusTrip && (
                    <View style={styles.busBadge}>
                      <Text style={styles.busBadgeText}>🚌 Bus beschikbaar</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.matchTitle}>
                  {match.isHome
                    ? `Pulle — ${match.opponent}`
                    : `${match.opponent} — Pulle`}
                </Text>
                <Text style={styles.competition}>{match.competition}</Text>

                <View style={styles.detailRow}>
                  <Text style={styles.detail}>📅 {formatDate(match.date)}</Text>
                  <Text style={styles.detail}>⏰ {match.time}</Text>
                  <Text style={styles.detail}>📍 {match.location}</Text>
                </View>

                <TouchableOpacity
                  style={styles.calendarBtn}
                  onPress={() =>
                    addToCalendar(
                      `${match.isHome ? 'Pulle vs ' : ''}${match.opponent}`,
                    )
                  }
                >
                  <Text style={styles.calendarBtnText}>
                    ➕ Toevoegen aan kalender
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.list}>
            {MOCK_ACTIVITIES.map((activity: Activity) => (
              <View key={activity.id} style={styles.card}>
                <Text style={styles.matchTitle}>{activity.title}</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detail}>📅 {formatDate(activity.date)}</Text>
                  <Text style={styles.detail}>⏰ {activity.time}</Text>
                  <Text style={styles.detail}>📍 {activity.location}</Text>
                </View>
                <Text style={styles.description}>{activity.description}</Text>
                <TouchableOpacity
                  style={styles.calendarBtn}
                  onPress={() => addToCalendar(activity.title)}
                >
                  <Text style={styles.calendarBtnText}>
                    ➕ Toevoegen aan kalender
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGray },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: COLORS.primary },
  tabText: { fontSize: 14, color: COLORS.gray, fontWeight: '600' },
  tabTextActive: { color: COLORS.primary },
  list: { padding: 16 },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', marginBottom: 10, gap: 8 },
  typeBadge: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  homeBadge: { backgroundColor: '#E8F8F0' },
  awayBadge: { backgroundColor: '#EEF4FF' },
  typeBadgeText: { fontSize: 12, fontWeight: '600', color: COLORS.dark },
  busBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#FFF8E1',
  },
  busBadgeText: { fontSize: 12, fontWeight: '600', color: COLORS.orange },
  matchTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.dark, marginBottom: 4 },
  competition: { fontSize: 12, color: COLORS.gray, marginBottom: 12 },
  detailRow: { gap: 4, marginBottom: 12 },
  detail: { fontSize: 14, color: COLORS.gray },
  description: { fontSize: 14, color: COLORS.dark, lineHeight: 20, marginBottom: 12 },
  calendarBtn: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  calendarBtnText: { color: COLORS.primary, fontSize: 13, fontWeight: '600' },
});
