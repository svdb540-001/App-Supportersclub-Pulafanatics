import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { MOCK_NEWS } from '../../data/mockData';

const COLORS = {
  primary: '#1B4F8A',
  secondary: '#E8B800',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#888',
  dark: '#1A1A1A',
  green: '#27AE60',
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' });

const categoryEmoji = (cat: string) => {
  const map: Record<string, string> = {
    bus: '🚌',
    webshop: '👕',
    wedstrijd: '⚽',
    activiteit: '🎉',
  };
  return map[cat] ?? '📰';
};

export default function AdminNewsScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📰 Nieuwsberichten</Text>
        <Text style={styles.headerSubtitle}>{MOCK_NEWS.length} berichten</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => Alert.alert('Nieuw', 'Nieuwsbericht plaatsen – binnenkort beschikbaar.')}
        >
          <Text style={styles.addBtnText}>➕ Nieuw bericht</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pushBtn}
          onPress={() =>
            Alert.alert('Pushmelding', 'Pushmelding sturen naar alle leden – binnenkort beschikbaar.')
          }
        >
          <Text style={styles.pushBtnText}>🔔 Pushmelding</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        {MOCK_NEWS.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>
                  {categoryEmoji(item.category)} {item.category}
                </Text>
              </View>
              <Text style={styles.dateText}>{formatDate(item.date)}</Text>
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSummary} numberOfLines={2}>
              {item.summary}
            </Text>
            <View style={styles.cardActions}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => Alert.alert('Bewerken', `"${item.title}" bewerken.`)}
              >
                <Text style={styles.actionBtnText}>✏️ Bewerken</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, styles.deleteBtn]}
                onPress={() =>
                  Alert.alert(
                    'Verwijderen',
                    `Wil je "${item.title}" verwijderen?`,
                    [
                      { text: 'Annuleer', style: 'cancel' },
                      { text: 'Verwijderen', style: 'destructive', onPress: () => {} },
                    ],
                  )
                }
              >
                <Text style={styles.deleteBtnText}>🗑️ Verwijderen</Text>
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
  actions: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 8,
    gap: 10,
  },
  addBtn: {
    flex: 1,
    backgroundColor: COLORS.green,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  addBtnText: { color: COLORS.white, fontWeight: 'bold', fontSize: 13 },
  pushBtn: {
    flex: 1,
    backgroundColor: '#E74C3C',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  pushBtnText: { color: COLORS.white, fontWeight: 'bold', fontSize: 13 },
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: '#EEF4FF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  categoryBadgeText: { fontSize: 11, color: COLORS.primary, fontWeight: '600' },
  dateText: { fontSize: 12, color: COLORS.gray },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: COLORS.dark, marginBottom: 4 },
  cardSummary: { fontSize: 13, color: COLORS.gray, marginBottom: 10, lineHeight: 18 },
  cardActions: { flexDirection: 'row', gap: 8 },
  actionBtn: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionBtnText: { fontSize: 12, color: COLORS.primary, fontWeight: '600' },
  deleteBtn: { borderColor: '#E74C3C' },
  deleteBtnText: { fontSize: 12, color: '#E74C3C', fontWeight: '600' },
});
