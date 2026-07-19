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
import { MOCK_GALLERY_ALBUMS } from '../../data/mockData';

const COLORS = {
  primary: '#1B4F8A',
  secondary: '#E8B800',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#888',
  dark: '#1A1A1A',
};

type Nav = NativeStackNavigationProp<RootStackParamList>;

const CATEGORY_EMOJIS: Record<string, string> = {
  busverplaatsingen: '🚌',
  wedstrijden: '⚽',
  paardenkoers: '🐴',
  ontbijtactie: '🥞',
  supportersactiviteiten: '🎉',
  sfeerbeelden: '📸',
};

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('nl-BE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export default function GalleryScreen() {
  const navigation = useNavigation<Nav>();

  const categories = [...new Set(MOCK_GALLERY_ALBUMS.map((a) => a.category))];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📸 Fotogalerij</Text>
        <Text style={styles.headerSubtitle}>
          Herinneringen aan wedstrijden en activiteiten
        </Text>
      </View>

      {categories.map((cat) => {
        const albums = MOCK_GALLERY_ALBUMS.filter((a) => a.category === cat);
        return (
          <View key={cat} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>
              {CATEGORY_EMOJIS[cat] ?? '📁'} {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.albumRow}
            >
              {albums.map((album) => (
                <TouchableOpacity
                  key={album.id}
                  style={styles.albumCard}
                  onPress={() =>
                    navigation.navigate('AlbumDetail', { album })
                  }
                >
                  <View style={styles.albumCover}>
                    <Text style={styles.albumEmoji}>
                      {CATEGORY_EMOJIS[album.category] ?? '📁'}
                    </Text>
                  </View>
                  <Text style={styles.albumTitle} numberOfLines={2}>
                    {album.title}
                  </Text>
                  <Text style={styles.albumDate}>{formatDate(album.date)}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        );
      })}

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
  categorySection: { marginTop: 20, paddingHorizontal: 16 },
  categoryTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 12,
  },
  albumRow: { paddingBottom: 8, gap: 12 },
  albumCard: { width: 150, marginRight: 12 },
  albumCover: {
    height: 110,
    backgroundColor: '#1B4F8A22',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  albumEmoji: { fontSize: 50 },
  albumTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 2,
    lineHeight: 18,
  },
  albumDate: { fontSize: 11, color: COLORS.gray },
});
