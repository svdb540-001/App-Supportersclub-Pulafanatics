import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import { MOCK_USERS } from '../../data/mockData';
import { User, MembershipType } from '../../types';

const COLORS = {
  primary: '#1B4F8A',
  secondary: '#E8B800',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#888',
  dark: '#1A1A1A',
  green: '#27AE60',
};

const membershipLabel = (type: MembershipType): string => {
  const map: Record<MembershipType, string> = {
    member: 'Member',
    member_kind: 'Member Kind',
    steunkaart: 'Steunkaart',
    steunkaart_kind: 'Steunkaart Kind',
  };
  return map[type];
};

export default function AdminMembersScreen() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<User[]>(MOCK_USERS);

  const filtered = search
    ? users.filter(
        (u) =>
          u.firstName.toLowerCase().includes(search.toLowerCase()) ||
          u.lastName.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase()) ||
          u.memberNumber.toLowerCase().includes(search.toLowerCase()),
      )
    : users;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>👥 Ledenbeheer</Text>
        <Text style={styles.headerSubtitle}>{users.length} leden</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Zoek op naam, e-mail of lidnummer…"
          placeholderTextColor={COLORS.gray}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Add member button */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() =>
          Alert.alert('Lid toevoegen', 'Functionaliteit komt binnenkort beschikbaar.')
        }
      >
        <Text style={styles.addBtnText}>➕ Nieuw lid toevoegen</Text>
      </TouchableOpacity>

      {/* Members list */}
      <View style={styles.list}>
        {filtered.map((user) => (
          <View key={user.id} style={styles.memberCard}>
            <View style={styles.memberCardHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </Text>
              </View>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>
                  {user.firstName} {user.lastName}
                </Text>
                <Text style={styles.memberNumber}>{user.memberNumber}</Text>
                <Text style={styles.memberEmail}>{user.email}</Text>
              </View>
              <View style={styles.memberRight}>
                <View style={styles.memberTypeBadge}>
                  <Text style={styles.memberTypeText}>
                    {membershipLabel(user.membershipType)}
                  </Text>
                </View>
                {user.role === 'admin' && (
                  <View style={styles.adminBadge}>
                    <Text style={styles.adminBadgeText}>Admin</Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.memberDetails}>
              <Text style={styles.memberDetailText}>
                📅 Geldig tot: {user.membershipExpiry}
              </Text>
              {user.familyMembers.length > 0 && (
                <Text style={styles.memberDetailText}>
                  👨‍👩‍👧 {user.familyMembers.length} gezinslid(leden)
                </Text>
              )}
            </View>

            <View style={styles.memberActions}>
              <TouchableOpacity
                style={styles.memberActionBtn}
                onPress={() =>
                  Alert.alert('Bewerken', `Profiel van ${user.firstName} bewerken.`)
                }
              >
                <Text style={styles.memberActionText}>✏️ Bewerken</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.memberActionBtn}
                onPress={() =>
                  Alert.alert(
                    'Lidmaatschap',
                    `Lidmaatschap van ${user.firstName} activeren/verlengen.`,
                  )
                }
              >
                <Text style={styles.memberActionText}>💳 Lidmaatschap</Text>
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
  header: {
    backgroundColor: '#2C3E50',
    padding: 20,
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.white },
  headerSubtitle: { fontSize: 14, color: COLORS.secondary, marginTop: 4 },
  searchContainer: { padding: 16, paddingBottom: 0 },
  searchInput: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    color: COLORS.dark,
  },
  addBtn: {
    backgroundColor: COLORS.green,
    margin: 16,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  addBtnText: { color: COLORS.white, fontWeight: 'bold', fontSize: 15 },
  list: { paddingHorizontal: 16 },
  memberCard: {
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
  memberCardHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 },
  memberInfo: { flex: 1 },
  memberName: { fontSize: 16, fontWeight: 'bold', color: COLORS.dark },
  memberNumber: { fontSize: 12, color: COLORS.primary, marginTop: 2 },
  memberEmail: { fontSize: 12, color: COLORS.gray, marginTop: 2 },
  memberRight: { alignItems: 'flex-end', gap: 4 },
  memberTypeBadge: {
    backgroundColor: '#EEF4FF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  memberTypeText: { fontSize: 11, color: COLORS.primary, fontWeight: '600' },
  adminBadge: {
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  adminBadgeText: { fontSize: 11, fontWeight: 'bold', color: COLORS.dark },
  memberDetails: { flexDirection: 'row', gap: 16, marginBottom: 10 },
  memberDetailText: { fontSize: 12, color: COLORS.gray },
  memberActions: { flexDirection: 'row', gap: 8 },
  memberActionBtn: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  memberActionText: { fontSize: 12, color: COLORS.primary, fontWeight: '600' },
});
