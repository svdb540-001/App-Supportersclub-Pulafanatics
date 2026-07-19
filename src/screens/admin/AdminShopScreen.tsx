import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import { MOCK_PRODUCTS } from '../../data/mockData';
import { Product } from '../../types';

const COLORS = {
  primary: '#1B4F8A',
  secondary: '#E8B800',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#888',
  dark: '#1A1A1A',
  green: '#27AE60',
  red: '#E74C3C',
  orange: '#F39C12',
};

const totalStock = (product: Product) =>
  Object.values(product.stock).reduce((a, b) => a + b, 0);

const categoryEmoji = (cat: string) => {
  const map: Record<string, string> = {
    hoodies: '🧥',
    't-shirts': '👕',
    vesten: '🧣',
    lidmaatschappen: '💳',
    accessoires: '⚽',
    acties: '🔥',
  };
  return map[cat] ?? '📦';
};

export default function AdminShopScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛒 Webshop beheer</Text>
        <Text style={styles.headerSubtitle}>{MOCK_PRODUCTS.length} producten</Text>
      </View>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() =>
          Alert.alert('Nieuw product', 'Product toevoegen – binnenkort beschikbaar.')
        }
      >
        <Text style={styles.addBtnText}>➕ Nieuw product toevoegen</Text>
      </TouchableOpacity>

      <View style={styles.list}>
        {MOCK_PRODUCTS.map((product) => {
          const stock = totalStock(product);
          const stockColor =
            stock === 0 ? COLORS.red : stock <= 5 ? COLORS.orange : COLORS.green;

          return (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productRow}>
                <View style={styles.productIcon}>
                  <Text style={styles.productEmoji}>
                    {categoryEmoji(product.category)}
                  </Text>
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productCategory}>{product.category}</Text>
                  <Text style={styles.productPrice}>€{product.price}</Text>
                </View>
                <View style={styles.stockBadge}>
                  <Text style={[styles.stockValue, { color: stockColor }]}>
                    {stock}
                  </Text>
                  <Text style={styles.stockLabel}>in stock</Text>
                </View>
              </View>

              {/* Stock per size */}
              {product.sizes.length > 0 && (
                <View style={styles.sizeStock}>
                  {product.sizes.map((size) => (
                    <View key={size} style={styles.sizePill}>
                      <Text style={styles.sizeLabel}>{size}</Text>
                      <Text
                        style={[
                          styles.sizeCount,
                          {
                            color:
                              (product.stock[size] ?? 0) === 0
                                ? COLORS.red
                                : COLORS.dark,
                          },
                        ]}
                      >
                        {product.stock[size] ?? 0}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              <View style={styles.productActions}>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() =>
                    Alert.alert('Bewerken', `${product.name} bewerken.`)
                  }
                >
                  <Text style={styles.actionBtnText}>✏️ Bewerken</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() =>
                    Alert.alert('Voorraad', `Voorraad van ${product.name} aanpassen.`)
                  }
                >
                  <Text style={styles.actionBtnText}>📦 Voorraad</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
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
  productCard: {
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
  productRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  productIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#F0F4FF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  productEmoji: { fontSize: 26 },
  productInfo: { flex: 1 },
  productName: { fontSize: 15, fontWeight: 'bold', color: COLORS.dark },
  productCategory: { fontSize: 12, color: COLORS.gray, marginTop: 2 },
  productPrice: { fontSize: 15, fontWeight: '600', color: COLORS.primary, marginTop: 4 },
  stockBadge: { alignItems: 'center' },
  stockValue: { fontSize: 22, fontWeight: 'bold' },
  stockLabel: { fontSize: 11, color: COLORS.gray },
  sizeStock: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  sizePill: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    minWidth: 48,
  },
  sizeLabel: { fontSize: 11, color: COLORS.gray, fontWeight: '600' },
  sizeCount: { fontSize: 14, fontWeight: 'bold' },
  productActions: { flexDirection: 'row', gap: 8 },
  actionBtn: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionBtnText: { fontSize: 12, color: COLORS.primary, fontWeight: '600' },
});
