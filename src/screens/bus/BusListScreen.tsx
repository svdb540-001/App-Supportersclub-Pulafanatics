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
import { RootStackParamList, BusTrip } from '../../types';
import { MOCK_BUS_TRIPS } from '../../data/mockData';

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

type Nav = NativeStackNavigationProp<RootStackParamList>;

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('nl-BE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export default function BusListScreen() {
  const navigation = useNavigation<Nav>();

  const getStatusColor = (trip: BusTrip) => {
    const free = trip.totalSeats - trip.reservedSeats;
    if (free === 0) return COLORS.red;
    if (free <= 5) return COLORS.orange;
    return COLORS.green;
  };

  const getStatusText = (trip: BusTrip) => {
    const free = trip.totalSeats - trip.reservedSeats;
    if (free === 0 && trip.waitingList > 0)
      return `Vol – ${trip.waitingList} op wachtlijst`;
    if (free === 0) return 'Vol';
    return `${free} plaatsen vrij`;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🚌 Busverplaatsingen</Text>
        <Text style={styles.headerSubtitle}>
          Reserveer eenvoudig je plaats op de bus
        </Text>
      </View>

      <View style={styles.list}>
        {MOCK_BUS_TRIPS.map((trip) => {
          const freeSeats = trip.totalSeats - trip.reservedSeats;
          const statusColor = getStatusColor(trip);
          const statusText = getStatusText(trip);

          return (
            <View key={trip.id} style={styles.card}>
              <Text style={styles.cardTitle}>→ {trip.opponent}</Text>

              <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>📅 Wedstrijd</Text>
                  <Text style={styles.infoValue}>
                    {formatDate(trip.matchDate)} – {trip.matchTime}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>🚏 Vertrekplaats</Text>
                  <Text style={styles.infoValue}>{trip.departureLocation}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>⏰ Vertrekuur</Text>
                  <Text style={styles.infoValue}>{trip.departureTime}</Text>
                </View>
              </View>

              {/* Seat gauge */}
              <View style={styles.seatRow}>
                <View style={styles.seatBar}>
                  <View
                    style={[
                      styles.seatFill,
                      {
                        width: `${(trip.reservedSeats / trip.totalSeats) * 100}%`,
                        backgroundColor: statusColor,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.seatText, { color: statusColor }]}>
                  {statusText}
                </Text>
              </View>

              {/* Prices */}
              <View style={styles.pricesRow}>
                <View style={styles.priceChip}>
                  <Text style={styles.priceLabel}>Member</Text>
                  <Text style={styles.priceValue}>€{trip.pricesMember}</Text>
                </View>
                <View style={styles.priceChip}>
                  <Text style={styles.priceLabel}>Member Kind</Text>
                  <Text style={styles.priceValue}>€{trip.pricesMemberKind}</Text>
                </View>
                <View style={styles.priceChip}>
                  <Text style={styles.priceLabel}>Steunkaart</Text>
                  <Text style={styles.priceValue}>€{trip.pricesSteunkaart}</Text>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.reserveBtn,
                  freeSeats === 0 && styles.reserveBtnWaiting,
                ]}
                onPress={() => navigation.navigate('BusReservation', { trip })}
              >
                <Text style={styles.reserveBtnText}>
                  {freeSeats === 0
                    ? '📋 Zet mij op de wachtlijst'
                    : '🚌 Reserveer mijn plaats'}
                </Text>
              </TouchableOpacity>
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
  header: {
    backgroundColor: COLORS.primary,
    padding: 20,
    paddingBottom: 24,
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.white },
  headerSubtitle: { fontSize: 14, color: COLORS.secondary, marginTop: 4 },
  list: { padding: 16 },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 12,
  },
  infoGrid: { gap: 8, marginBottom: 16 },
  infoItem: {},
  infoLabel: { fontSize: 12, color: COLORS.gray, fontWeight: '600' },
  infoValue: { fontSize: 14, color: COLORS.dark },
  seatRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 10 },
  seatBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#EEE',
    borderRadius: 4,
    overflow: 'hidden',
  },
  seatFill: { height: '100%', borderRadius: 4 },
  seatText: { fontSize: 13, fontWeight: '700', minWidth: 120, textAlign: 'right' },
  pricesRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  priceChip: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    minWidth: 80,
  },
  priceLabel: { fontSize: 11, color: COLORS.gray, marginBottom: 2 },
  priceValue: { fontSize: 15, fontWeight: 'bold', color: COLORS.primary },
  reserveBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  reserveBtnWaiting: { backgroundColor: COLORS.orange },
  reserveBtnText: { color: COLORS.white, fontSize: 15, fontWeight: 'bold' },
});
