import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AlbumDetail'>;
  route: RouteProp<RootStackParamList, 'AlbumDetail'>;
};

const COLORS = {
  primary: '#1B4F8A',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#888',
  dark: '#1A1A1A',
};

export default function AlbumDetailScreen({ navigation, route }: Props) {
  const { album } = route.params;

  const placeholderPhotos = Array.from({ length: 9 }, (_, i) => `photo-${i + 1}`);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Terug</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{album.title}</Text>
        <Text style={styles.date}>{album.date}</Text>
      </View>

      <View style={styles.grid}>
        {placeholderPhotos.map((photo, idx) => (
          <TouchableOpacity
            key={photo}
            style={styles.photoCard}
            onPress={() => Alert.alert('Foto', `Foto ${idx + 1} van ${album.title}`)}
          >
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoEmoji}>📷</Text>
              <Text style={styles.photoLabel}>Foto {idx + 1}</Text>
            </View>
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
    backgroundColor: COLORS.primary,
    padding: 16,
    paddingTop: 20,
  },
  backBtn: { color: COLORS.white, fontSize: 16, marginBottom: 10 },
  title: { fontSize: 20, fontWeight: 'bold', color: COLORS.white },
  date: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    gap: 4,
  },
  photoCard: {
    width: '32%',
    aspectRatio: 1,
    margin: '0.5%',
  },
  photoPlaceholder: {
    flex: 1,
    backgroundColor: '#1B4F8A22',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoEmoji: { fontSize: 28 },
  photoLabel: { fontSize: 10, color: COLORS.gray, marginTop: 4 },
});
