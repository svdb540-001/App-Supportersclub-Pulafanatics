import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'NewsDetail'>;
  route: RouteProp<RootStackParamList, 'NewsDetail'>;
};

const COLORS = {
  primary: '#1B4F8A',
  secondary: '#E8B800',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#888',
  dark: '#1A1A1A',
};

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('nl-BE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export default function NewsDetailScreen({ navigation, route }: Props) {
  const { item } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backBtnText}>← Terug</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.meta}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{item.category}</Text>
          </View>
          <Text style={styles.dateText}>{formatDate(item.date)}</Text>
        </View>

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.content}</Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { backgroundColor: COLORS.primary, padding: 16 },
  backBtn: {},
  backBtnText: { color: COLORS.white, fontSize: 16 },
  content: { padding: 20 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  categoryBadge: {
    backgroundColor: '#EEF4FF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryBadgeText: { fontSize: 12, color: COLORS.primary, fontWeight: '600' },
  dateText: { fontSize: 13, color: COLORS.gray },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 16,
    lineHeight: 32,
  },
  body: { fontSize: 16, color: '#333', lineHeight: 26 },
});
