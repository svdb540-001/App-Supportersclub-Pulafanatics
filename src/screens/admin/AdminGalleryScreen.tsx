import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { MOCK_GALLERY_ALBUMS } from '../../data/mockData';

const COLORS = {
  primary: '#1B4F8A',
  secondary: '#E8B800',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#888',
  dark: '#1A1A1A',
  green: '#27AE60',
};

const CATEGORY_EMOJIS: Record<string, string> = {
  busverplaatsingen: '🚌',
  wedstrijden: '⚽',
  paardenkoers: '🐴',
  ontbijtactie: '🥞',
  supportersactiviteiten: '🎉',
  sfeerbeelden: '📸',
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' });

export default function AdminGalleryScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📸 Fotoalbums</Text>
        <Text style={styles.headerSubtitle}>{MOCK_GALLERY_ALBUMS.length} albums</Text>
      </View>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => Alert.alert('Nieuw album', 'Fotoalbum aanmaken – binnenkort beschikbaar.')}
      >
        <Text style={styles.addBtnText}>➕ Nieuw fotoalbum aanmaken</Text>
      </TouchableOpacity>

      <View style={styles.list}>
        {MOCK_GALLERY_ALBUMS.map((album) => (
          <View key={album.id} style={styles.card}>
            <View style={styles.cardRow}>
              <View style={styles.albumIcon}>
                <Text style={styles.albumEmoji}>
                  {CATEGORY_EMOJIS[album.category] ?? '📁'}
                </Text>
              </View>
              <View style={styles.albumInfo}>
                <Text style={styles.albumTitle}>{album.title}</Text>
                <Text style={styles.albumCategory}>{album.category}</Text>
                <Text style={styles.albumDate}>{formatDate(album.date)}</Text>
                <Text style={styles.albumPhotos}>
                  📷 {album.photos.length} foto's
                </Text>
              </View>
            </View>

            <View style={styles.cardActions}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() =>
                  Alert.alert("Foto's toevoegen", `Foto's toevoegen aan "${album.title}".`)
                }
              >
                <Text style={styles.actionBtnText}>➕ Foto's toevoegen</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => Alert.alert('Bewerken', `"${album.title}" bewerken.`)}
              >
                <Text style={styles.actionBtnText}>✏️ Bewerken</Text>
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
  cardRow: { flexDirection: 'row', marginBottom: 12, gap: 12 },
  albumIcon: {
    width: 56,
    height: 56,
    backgroundColor: '#F0F4FF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  albumEmoji: { fontSize: 30 },
  albumInfo: { flex: 1 },
  albumTitle: { fontSize: 15, fontWeight: 'bold', color: COLORS.dark },
  albumCategory: { fontSize: 12, color: COLORS.gray, marginTop: 2 },
  albumDate: { fontSize: 12, color: COLORS.gray, marginTop: 2 },
  albumPhotos: { fontSize: 12, color: COLORS.primary, marginTop: 4 },
  cardActions: { flexDirection: 'row', gap: 8 },
  actionBtn: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionBtnText: { fontSize: 12, color: COLORS.primary, fontWeight: '600' },
});
