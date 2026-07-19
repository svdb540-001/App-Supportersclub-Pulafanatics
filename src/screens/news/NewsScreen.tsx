import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { MOCK_NEWS } from '../../data/mockData';

const COLORS = {
  primary: '#1B4F8A',
  secondary: '#E8B800',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#888',
  dark: '#1A1A1A',
};

type Nav = NativeStackNavigationProp<RootStackParamList>;

const CATEGORIES = ['Alles', 'bus', 'webshop', 'wedstrijd', 'activiteit'];

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('nl-BE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const categoryEmoji = (cat: string) => {
  const map: Record<string, string> = {
    bus: '🚌',
    webshop: '👕',
    wedstrijd: '⚽',
    activiteit: '🎉',
  };
  return map[cat] ?? '📰';
};

export default function NewsScreen() {
  const navigation = useNavigation<Nav>();
  const [selectedCat, setSelectedCat] = useState('Alles');

  const filtered =
    selectedCat === 'Alles'
      ? MOCK_NEWS
      : MOCK_NEWS.filter((n) => n.category === selectedCat);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📰 Nieuws & Meldingen</Text>
      </View>

      {/* Category filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.catScroll}
        contentContainerStyle={styles.catContainer}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.catChip, selectedCat === cat && styles.catChipActive]}
            onPress={() => setSelectedCat(cat)}
          >
            <Text
              style={[
                styles.catChipText,
                selectedCat === cat && styles.catChipTextActive,
              ]}
            >
              {cat === 'Alles' ? 'Alles' : `${categoryEmoji(cat)} ${cat}`}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.list}>
          {filtered.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.newsCard}
              onPress={() => navigation.navigate('NewsDetail', { item })}
            >
              <View style={styles.newsCardHeader}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>
                    {categoryEmoji(item.category)} {item.category}
                  </Text>
                </View>
                <Text style={styles.newsDate}>{formatDate(item.date)}</Text>
              </View>
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text style={styles.newsSummary} numberOfLines={2}>
                {item.summary}
              </Text>
              <Text style={styles.readMore}>Lees meer →</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGray },
  header: { backgroundColor: COLORS.primary, padding: 16 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.white },
  catScroll: { maxHeight: 50, backgroundColor: COLORS.white },
  catContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  catChip: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 5,
    backgroundColor: COLORS.lightGray,
    borderWidth: 1,
    borderColor: '#DDD',
    marginRight: 8,
  },
  catChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  catChipText: { fontSize: 13, color: COLORS.dark },
  catChipTextActive: { color: COLORS.white, fontWeight: '600' },
  list: { padding: 16 },
  newsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  newsCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: '#EEF4FF',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  categoryBadgeText: { fontSize: 11, color: COLORS.primary, fontWeight: '600' },
  newsDate: { fontSize: 12, color: COLORS.gray },
  newsTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.dark, marginBottom: 6 },
  newsSummary: { fontSize: 14, color: COLORS.gray, lineHeight: 20, marginBottom: 8 },
  readMore: { fontSize: 13, color: COLORS.primary, fontWeight: '600' },
});
