import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, ProductCategory } from '../../types';
import { MOCK_PRODUCTS } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const COLORS = {
  primary: '#1B4F8A',
  secondary: '#E8B800',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#888',
  dark: '#1A1A1A',
};

type Nav = NativeStackNavigationProp<RootStackParamList>;

const CATEGORIES: { key: ProductCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'Alles' },
  { key: 'lidmaatschappen', label: '💳 Lidmaatschappen' },
  { key: 't-shirts', label: '👕 T-shirts' },
  { key: 'hoodies', label: '🧥 Hoodies' },
  { key: 'vesten', label: '🧥 Vesten' },
  { key: 'acties', label: '🔥 Acties' },
];

export default function ShopScreen() {
  const navigation = useNavigation<Nav>();
  const { cartItems } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<
    ProductCategory | 'all'
  >('all');

  const filtered =
    selectedCategory === 'all'
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter((p) => p.category === selectedCategory);

  const cartCount = cartItems.reduce((sum, c) => sum + c.quantity, 0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛒 Webshop</Text>
        <TouchableOpacity
          style={styles.cartBtn}
          onPress={() => Alert.alert('Winkelmandje', `${cartCount} artikel(en) in je mandje.`)}
        >
          <Text style={styles.cartBtnText}>🛒 {cartCount}</Text>
        </TouchableOpacity>
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
            key={cat.key}
            style={[
              styles.catChip,
              selectedCategory === cat.key && styles.catChipActive,
            ]}
            onPress={() => setSelectedCategory(cat.key)}
          >
            <Text
              style={[
                styles.catChipText,
                selectedCategory === cat.key && styles.catChipTextActive,
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products grid */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <View style={styles.productImage}>
              <Text style={styles.productEmoji}>
                {item.category === 'hoodies'
                  ? '🧥'
                  : item.category === 't-shirts'
                  ? '👕'
                  : item.category === 'vesten'
                  ? '🧣'
                  : item.category === 'lidmaatschappen'
                  ? '💳'
                  : '⚽'}
              </Text>
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={styles.productPrice}>€{item.price}</Text>
              {item.sizes.length > 0 && (
                <Text style={styles.productSizes}>
                  {item.sizes.slice(0, 4).join(' · ')}
                  {item.sizes.length > 4 ? ' …' : ''}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGray },
  header: {
    backgroundColor: COLORS.primary,
    padding: 16,
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.white },
  cartBtn: {
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  cartBtnText: { fontWeight: 'bold', color: COLORS.dark, fontSize: 14 },
  catScroll: { maxHeight: 50 },
  catContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    flexDirection: 'row',
  },
  catChip: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#DDD',
    marginRight: 8,
  },
  catChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  catChipText: { fontSize: 13, color: COLORS.dark },
  catChipTextActive: { color: COLORS.white, fontWeight: '600' },
  grid: { padding: 12 },
  productCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    margin: 6,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    height: 110,
    backgroundColor: '#F0F4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productEmoji: { fontSize: 50 },
  productInfo: { padding: 10 },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 4,
    lineHeight: 19,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  productSizes: { fontSize: 11, color: COLORS.gray },
});
