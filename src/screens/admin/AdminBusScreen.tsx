import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { MOCK_BUS_TRIPS } from '../../data/mockData';
import { BusTrip } from '../../types';

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

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('nl-BE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export default function AdminBusScreen() {
  const [trips, setTrips] = useState<BusTrip[]>(MOCK_BUS_TRIPS);

  const viewPassengers = (trip: BusTrip) => {
    Alert.alert(
      `Deelnemers – ${trip.opponent}`,
      `${trip.reservedSeats}/${trip.totalSeats} plaatsen bezet.\n\nFunctionaliteit om deelnemerslijst te bekijken en af te drukken wordt binnenkort beschikbaar.`,
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🚌 Busverplaatsingen</Text>
        <Text style={styles.headerSubtitle}>{trips.length} verplaatsingen</Text>
      </View>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() =>
          Alert.alert('Nieuw', 'Nieuwe busverplaatsing aanmaken – komt binnenkort beschikbaar.')
        }
      >
        <Text style={styles.addBtnText}>➕ Nieuwe verplaatsing aanmaken</Text>
      </TouchableOpacity>

      <View style={styles.list}>
        {trips.map((trip) => {
          const freeSeats = trip.totalSeats - trip.reservedSeats;
          const fillPct = (trip.reservedSeats / trip.totalSeats) * 100;
          const barColor =
            freeSeats === 0
              ? COLORS.red
              : freeSeats <= 5
              ? COLORS.orange
              : COLORS.green;

          return (
            <View key={trip.id} style={styles.card}>
              <Text style={styles.cardTitle}>{trip.opponent}</Text>
              <Text style={styles.cardDate}>
                📅 {formatDate(trip.matchDate)} – {trip.matchTime}
              </Text>
              <Text style={styles.cardDetail}>
                🚏 {trip.departureLocation} – {trip.departureTime}
              </Text>

              {/* Occupancy bar */}
              <View style={styles.occupancyRow}>
                <View style={styles.occupancyBar}>
                  <View
                    style={[
                      styles.occupancyFill,
                      { width: `${fillPct}%`, backgroundColor: barColor },
                    ]}
                  />
                </View>
                <Text style={[styles.occupancyText, { color: barColor }]}>
                  {trip.reservedSeats}/{trip.totalSeats}
                </Text>
              </View>

              {trip.waitingList > 0 && (
                <Text style={styles.waitingText}>
                  ⏳ {trip.waitingList} personen op wachtlijst
                </Text>
              )}

              <View style={styles.cardActions}>
                <TouchableOpacity
                  style={styles.cardActionBtn}
                  onPress={() => viewPassengers(trip)}
                >
                  <Text style={styles.cardActionText}>👥 Deelnemers</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cardActionBtn}
                  onPress={() =>
                    Alert.alert('Bewerken', 'Verplaatsing bewerken – binnenkort beschikbaar.')
                  }
                >
                  <Text style={styles.cardActionText}>✏️ Bewerken</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.cardActionBtn, styles.printBtn]}
                  onPress={() =>
                    Alert.alert('Afdrukken', 'Deelnemerslijst wordt afgedrukt.')
                  }
                >
                  <Text style={styles.printBtnText}>🖨️ Afdrukken</Text>
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
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.dark, marginBottom: 6 },
  cardDate: { fontSize: 14, color: COLORS.gray, marginBottom: 2 },
  cardDetail: { fontSize: 14, color: COLORS.gray, marginBottom: 12 },
  occupancyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  occupancyBar: {
    flex: 1,
    height: 10,
    backgroundColor: '#EEE',
    borderRadius: 5,
    overflow: 'hidden',
  },
  occupancyFill: { height: '100%', borderRadius: 5 },
  occupancyText: { fontWeight: 'bold', fontSize: 14, minWidth: 50 },
  waitingText: { fontSize: 13, color: COLORS.orange, marginBottom: 10 },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    flexWrap: 'wrap',
  },
  cardActionBtn: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  cardActionText: { fontSize: 12, color: COLORS.primary, fontWeight: '600' },
  printBtn: { borderColor: COLORS.green },
  printBtnText: { fontSize: 12, color: COLORS.green, fontWeight: '600' },
});
