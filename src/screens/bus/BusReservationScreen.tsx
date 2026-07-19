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
import { RootStackParamList, ReservationPassenger, MembershipType } from '../../types';
import { useAuth } from '../../context/AuthContext';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'BusReservation'>;
  route: RouteProp<RootStackParamList, 'BusReservation'>;
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

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('nl-BE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const getPriceForMembership = (
  trip: RootStackParamList['BusReservation']['trip'],
  type: MembershipType,
): number => {
  switch (type) {
    case 'member': return trip.pricesMember;
    case 'member_kind': return trip.pricesMemberKind;
    case 'steunkaart': return trip.pricesSteunkaart;
    case 'steunkaart_kind': return trip.pricesSteunkaartKind;
    default: return trip.pricesSteunkaart;
  }
};

export default function BusReservationScreen({ navigation, route }: Props) {
  const { trip } = route.params;
  const { user } = useAuth();

  const defaultPassengers: ReservationPassenger[] = user
    ? [
        {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          membershipType: user.membershipType,
        },
      ]
    : [];

  const [passengers, setPassengers] =
    useState<ReservationPassenger[]>(defaultPassengers);

  const addFamilyMember = (fm: NonNullable<typeof user>['familyMembers'][0]) => {
    if (!fm) return;
    if (passengers.find((p) => p.id === fm.id)) {
      Alert.alert('Al toegevoegd', `${fm.firstName} staat al op de lijst.`);
      return;
    }
    setPassengers((prev) => [
      ...prev,
      {
        id: fm.id,
        firstName: fm.firstName,
        lastName: fm.lastName,
        membershipType: fm.membershipType,
      },
    ]);
  };

  const removePassenger = (id: string) => {
    if (id === user?.id) {
      Alert.alert('Fout', 'Je kan jezelf niet verwijderen.');
      return;
    }
    setPassengers((prev) => prev.filter((p) => p.id !== id));
  };

  const totalPrice = passengers.reduce(
    (sum, p) => sum + getPriceForMembership(trip, p.membershipType),
    0,
  );

  const freeSeats = trip.totalSeats - trip.reservedSeats;

  const handleReserve = () => {
    Alert.alert(
      'Reservatie bevestigd!',
      `Je hebt ${passengers.length} plaats(en) gereserveerd op de bus naar ${trip.opponent}.\n\nTotaalprijs: €${totalPrice}\n\nJe ontvangt een bevestigingsmail.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }],
    );
  };

  const membershipLabel = (type: MembershipType) => {
    const map: Record<MembershipType, string> = {
      member: 'Member',
      member_kind: 'Member Kind',
      steunkaart: 'Steunkaart',
      steunkaart_kind: 'Steunkaart Kind',
    };
    return map[type] ?? type;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Trip info */}
      <View style={styles.tripCard}>
        <Text style={styles.tripTitle}>🚌 Verplaatsing naar {trip.opponent}</Text>
        <Text style={styles.tripDetail}>📅 {formatDate(trip.matchDate)} – {trip.matchTime}</Text>
        <Text style={styles.tripDetail}>🚏 {trip.departureLocation}</Text>
        <Text style={styles.tripDetail}>⏰ Vertrek: {trip.departureTime}</Text>
        <Text
          style={[
            styles.tripDetail,
            freeSeats <= 5 ? styles.textRed : styles.textGreen,
          ]}
        >
          💺 {freeSeats} plaatsen vrij
        </Text>
      </View>

      {/* Passengers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👥 Reizigers</Text>

        {passengers.map((p) => (
          <View key={p.id} style={styles.passengerRow}>
            <View>
              <Text style={styles.passengerName}>
                {p.firstName} {p.lastName}
              </Text>
              <Text style={styles.passengerType}>
                {membershipLabel(p.membershipType)} – €{getPriceForMembership(trip, p.membershipType)}
              </Text>
            </View>
            {p.id !== user?.id && (
              <TouchableOpacity
                onPress={() => removePassenger(p.id)}
                style={styles.removeBtn}
              >
                <Text style={styles.removeBtnText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {/* Add family members */}
        {user && user.familyMembers.length > 0 && (
          <View style={styles.familySection}>
            <Text style={styles.familyTitle}>Voeg gezinsleden toe:</Text>
            {user.familyMembers.map((fm) => {
              const added = passengers.find((p) => p.id === fm.id);
              return (
                <TouchableOpacity
                  key={fm.id}
                  style={[styles.familyBtn, added && styles.familyBtnAdded]}
                  onPress={() => !added && addFamilyMember(fm)}
                >
                  <Text style={styles.familyBtnText}>
                    {added ? '✓ ' : '+ '}
                    {fm.firstName} {fm.lastName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>

      {/* Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Overzicht</Text>
        {passengers.map((p) => (
          <View key={p.id} style={styles.summaryRow}>
            <Text style={styles.summaryName}>
              {p.firstName} {p.lastName}
            </Text>
            <Text style={styles.summaryPrice}>
              €{getPriceForMembership(trip, p.membershipType)}
            </Text>
          </View>
        ))}
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Totaal</Text>
          <Text style={styles.totalPrice}>€{totalPrice}</Text>
        </View>
      </View>

      {freeSeats === 0 && (
        <View style={styles.waitingBox}>
          <Text style={styles.waitingText}>
            ⚠️ De bus is vol. Je wordt op de wachtlijst geplaatst en krijgt een
            melding als er een plaats vrijkomt.
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.reserveBtn, passengers.length === 0 && styles.reserveBtnDisabled]}
        onPress={handleReserve}
        disabled={passengers.length === 0}
      >
        <Text style={styles.reserveBtnText}>
          {freeSeats === 0
            ? '📋 Plaats me op de wachtlijst'
            : '✅ Bevestig reservatie'}
        </Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  tripCard: {
    backgroundColor: '#1B4F8A',
    padding: 20,
    gap: 6,
  },
  tripTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFF', marginBottom: 8 },
  tripDetail: { fontSize: 14, color: '#E8E8FF' },
  textRed: { color: '#FF6B6B' },
  textGreen: { color: '#A8FFD0' },
  section: { backgroundColor: '#FFF', margin: 16, borderRadius: 12, padding: 16 },
  sectionTitle: { fontSize: 17, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 12 },
  passengerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  passengerName: { fontSize: 15, fontWeight: '600', color: '#1A1A1A' },
  passengerType: { fontSize: 13, color: '#888', marginTop: 2 },
  removeBtn: {
    backgroundColor: '#FFE8E8',
    borderRadius: 14,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeBtnText: { color: '#E74C3C', fontWeight: 'bold' },
  familySection: { marginTop: 14 },
  familyTitle: { fontSize: 14, color: '#888', marginBottom: 8 },
  familyBtn: {
    borderWidth: 1,
    borderColor: '#1B4F8A',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  familyBtnAdded: { backgroundColor: '#EEF4FF', borderColor: '#27AE60' },
  familyBtnText: { color: '#1B4F8A', fontWeight: '600' },
  summaryCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  summaryTitle: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryName: { fontSize: 14, color: '#444' },
  summaryPrice: { fontSize: 14, color: '#444' },
  divider: { height: 1, backgroundColor: '#EEE', marginVertical: 8 },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A' },
  totalPrice: { fontSize: 18, fontWeight: 'bold', color: '#1B4F8A' },
  waitingBox: {
    backgroundColor: '#FFF8E1',
    borderRadius: 10,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F39C12',
  },
  waitingText: { fontSize: 14, color: '#8A6000', lineHeight: 20 },
  reserveBtn: {
    backgroundColor: '#1B4F8A',
    margin: 16,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  reserveBtnDisabled: { opacity: 0.5 },
  reserveBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});
