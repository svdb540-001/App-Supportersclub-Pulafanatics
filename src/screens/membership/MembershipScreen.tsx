import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { MEMBERSHIP_FORMULAS } from '../../data/mockData';
import { MembershipFormula } from '../../types';

const COLORS = {
  primary: '#1B4F8A',
  secondary: '#E8B800',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#888',
  dark: '#1A1A1A',
};

export default function MembershipScreen() {
  const handleJoin = (formula: MembershipFormula) => {
    Alert.alert(
      `${formula.label} – €${formula.price}`,
      `Je kiest voor het ${formula.label}-lidmaatschap.\n\nJe wordt doorgestuurd naar de betaalpagina.`,
      [
        { text: 'Annuleer', style: 'cancel' },
        {
          text: 'Doorgaan',
          onPress: () =>
            Alert.alert(
              'Betaling',
              'In de productieversie wordt je hier doorgestuurd naar de betaalprovider.',
            ),
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>💳 Word lid van Pulafanatics</Text>
        <Text style={styles.headerSubtitle}>
          Kies de formule die bij jou past
        </Text>
      </View>

      <View style={styles.priorityBox}>
        <Text style={styles.priorityTitle}>⭐ Voorrangsregeling busreservaties</Text>
        <Text style={styles.priorityText}>
          1. Members krijgen als eerste de kans om te reserveren{'\n'}
          2. Daarna kunnen andere supporters inschrijven{'\n'}
          3. Bij volle bus: automatisch op wachtlijst{'\n'}
          4. Vrijgekomen plaatsen → automatische melding
        </Text>
      </View>

      <View style={styles.formulaList}>
        {MEMBERSHIP_FORMULAS.map((formula) => (
          <View
            key={formula.type}
            style={[
              styles.formulaCard,
              formula.type === 'member' && styles.formulaCardFeatured,
            ]}
          >
            {formula.type === 'member' && (
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredBadgeText}>⭐ Populairste keuze</Text>
              </View>
            )}

            <View style={styles.formulaHeader}>
              <View>
                <Text style={styles.formulaName}>{formula.label}</Text>
                <Text style={styles.formulaAge}>{formula.ageDescription}</Text>
              </View>
              <View style={styles.priceBox}>
                <Text style={styles.priceValue}>€{formula.price}</Text>
                <Text style={styles.priceUnit}>/jaar</Text>
              </View>
            </View>

            <View style={styles.benefitsList}>
              {formula.benefits.map((benefit, idx) => (
                <View key={idx} style={styles.benefitRow}>
                  <Text style={styles.checkmark}>✓</Text>
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={[
                styles.joinBtn,
                formula.type === 'member' && styles.joinBtnFeatured,
              ]}
              onPress={() => handleJoin(formula)}
            >
              <Text
                style={[
                  styles.joinBtnText,
                  formula.type !== 'member' && styles.joinBtnTextOutline,
                ]}
              >
                Kies {formula.label}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>ℹ️ Info</Text>
        <Text style={styles.infoText}>
          Na betaling ontvang je een bevestigingsmail. Je digitale ledenkaart
          met QR-code is beschikbaar via het tabblad "Mijn Profiel". Het
          lidmaatschap loopt van 1 juli tot 30 juni.
        </Text>
      </View>

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
  priorityBox: {
    backgroundColor: '#EEF4FF',
    margin: 16,
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  priorityTitle: { fontSize: 15, fontWeight: 'bold', color: COLORS.primary, marginBottom: 8 },
  priorityText: { fontSize: 13, color: '#444', lineHeight: 22 },
  formulaList: { paddingHorizontal: 16 },
  formulaCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  formulaCardFeatured: {
    borderColor: COLORS.secondary,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  featuredBadge: {
    backgroundColor: COLORS.secondary,
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 12,
  },
  featuredBadgeText: { fontSize: 12, fontWeight: 'bold', color: COLORS.dark },
  formulaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  formulaName: { fontSize: 20, fontWeight: 'bold', color: COLORS.dark },
  formulaAge: { fontSize: 13, color: COLORS.gray, marginTop: 2 },
  priceBox: { alignItems: 'flex-end' },
  priceValue: { fontSize: 28, fontWeight: 'bold', color: COLORS.primary },
  priceUnit: { fontSize: 12, color: COLORS.gray },
  benefitsList: { marginBottom: 16 },
  benefitRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 },
  checkmark: { color: '#27AE60', fontWeight: 'bold', marginRight: 8, fontSize: 15 },
  benefitText: { fontSize: 14, color: COLORS.dark, flex: 1 },
  joinBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  joinBtnFeatured: { backgroundColor: COLORS.secondary },
  joinBtnText: { fontSize: 16, fontWeight: 'bold', color: COLORS.white },
  joinBtnTextOutline: { color: COLORS.white },
  infoBox: {
    backgroundColor: COLORS.white,
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  infoTitle: { fontSize: 15, fontWeight: 'bold', color: COLORS.dark, marginBottom: 8 },
  infoText: { fontSize: 13, color: COLORS.gray, lineHeight: 20 },
});
