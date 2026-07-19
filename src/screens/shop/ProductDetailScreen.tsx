import React, { useState } from 'react';
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
import { useAuth } from '../../context/AuthContext';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;
  route: RouteProp<RootStackParamList, 'ProductDetail'>;
};

const COLORS = {
  primary: '#1B4F8A',
  secondary: '#E8B800',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#888',
  dark: '#1A1A1A',
  green: '#27AE60',
  red: '#E74C3C',
};

export default function ProductDetailScreen({ navigation, route }: Props) {
  const { product } = route.params;
  const { addToCart, cartItems } = useAuth();
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes[0] ?? '',
  );

  const stockForSize = selectedSize ? (product.stock[selectedSize] ?? 0) : 0;

  const cartCount = cartItems.reduce((sum, c) => sum + c.quantity, 0);

  const handleAddToCart = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      Alert.alert('Selecteer een maat', 'Kies een maat voordat je toevoegt.');
      return;
    }
    if (stockForSize === 0 && product.sizes.length > 0) {
      Alert.alert('Uitverkocht', 'Deze maat is niet meer beschikbaar.');
      return;
    }
    addToCart({
      productId: product.id,
      productName: product.name,
      size: selectedSize,
      quantity: 1,
      price: product.price,
      imageUrl: undefined,
    });
    Alert.alert(
      'Toegevoegd aan winkelmandje ✓',
      `${product.name}${selectedSize ? ` (${selectedSize})` : ''} is toegevoegd.`,
      [
        { text: 'Verder winkelen', style: 'cancel' },
        { text: 'Naar winkelmandje', onPress: () => navigation.goBack() },
      ],
    );
  };

  const categoryEmoji = () => {
    switch (product.category) {
      case 'hoodies': return '🧥';
      case 't-shirts': return '👕';
      case 'vesten': return '🧣';
      case 'lidmaatschappen': return '💳';
      default: return '⚽';
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Product image */}
      <View style={styles.imageContainer}>
        <Text style={styles.productEmoji}>{categoryEmoji()}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>€{product.price}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>

        {/* Size selector */}
        {product.sizes.length > 0 && (
          <View style={styles.sizeSection}>
            <Text style={styles.sizeTitle}>Maat kiezen</Text>
            <View style={styles.sizeGrid}>
              {product.sizes.map((size) => {
                const stock = product.stock[size] ?? 0;
                const isSelected = selectedSize === size;
                const isOutOfStock = stock === 0;
                return (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.sizeChip,
                      isSelected && styles.sizeChipSelected,
                      isOutOfStock && styles.sizeChipOOS,
                    ]}
                    onPress={() => !isOutOfStock && setSelectedSize(size)}
                    disabled={isOutOfStock}
                  >
                    <Text
                      style={[
                        styles.sizeChipText,
                        isSelected && styles.sizeChipTextSelected,
                        isOutOfStock && styles.sizeChipTextOOS,
                      ]}
                    >
                      {size}
                    </Text>
                    {isOutOfStock && (
                      <Text style={styles.oosLabel}>uitverkocht</Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
            {selectedSize && stockForSize <= 3 && stockForSize > 0 && (
              <Text style={styles.lowStockWarning}>
                ⚠️ Nog slechts {stockForSize} stuks beschikbaar
              </Text>
            )}
          </View>
        )}

        {/* Cart info */}
        <View style={styles.cartInfo}>
          <Text style={styles.cartInfoText}>
            🛒 Winkelmandje: {cartCount} artikel(en)
          </Text>
        </View>

        {/* Add to cart */}
        <TouchableOpacity
          style={[
            styles.addToCartBtn,
            stockForSize === 0 &&
              product.sizes.length > 0 &&
              styles.addToCartBtnDisabled,
          ]}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartBtnText}>
            {stockForSize === 0 && product.sizes.length > 0
              ? 'Uitverkocht'
              : '🛒 Voeg toe aan winkelmandje'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() =>
            Alert.alert(
              'Afrekenen',
              'In de productieversie wordt je hier doorgestuurd naar de betaalprovider.',
            )
          }
        >
          <Text style={styles.checkoutBtnText}>💳 Direct afrekenen</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  imageContainer: {
    height: 220,
    backgroundColor: '#F0F4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productEmoji: { fontSize: 100 },
  content: { padding: 20 },
  productName: { fontSize: 22, fontWeight: 'bold', color: COLORS.dark, marginBottom: 8 },
  productPrice: { fontSize: 28, fontWeight: 'bold', color: COLORS.primary, marginBottom: 12 },
  productDescription: {
    fontSize: 15,
    color: COLORS.gray,
    lineHeight: 22,
    marginBottom: 20,
  },
  sizeSection: { marginBottom: 20 },
  sizeTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.dark, marginBottom: 12 },
  sizeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  sizeChip: {
    borderWidth: 2,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    minWidth: 60,
  },
  sizeChipSelected: { borderColor: COLORS.primary, backgroundColor: '#EEF4FF' },
  sizeChipOOS: { borderColor: '#EEE', backgroundColor: '#F9F9F9' },
  sizeChipText: { fontSize: 15, fontWeight: '600', color: COLORS.dark },
  sizeChipTextSelected: { color: COLORS.primary },
  sizeChipTextOOS: { color: '#CCC' },
  oosLabel: { fontSize: 9, color: '#CCC', marginTop: 2 },
  lowStockWarning: { marginTop: 8, fontSize: 13, color: '#F39C12' },
  cartInfo: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  cartInfoText: { fontSize: 14, color: COLORS.gray },
  addToCartBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  addToCartBtnDisabled: { backgroundColor: '#CCC' },
  addToCartBtnText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
  checkoutBtn: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  checkoutBtnText: { color: COLORS.primary, fontSize: 16, fontWeight: 'bold' },
});
