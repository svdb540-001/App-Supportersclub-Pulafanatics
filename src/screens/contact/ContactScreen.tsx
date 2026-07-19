import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const COLORS = {
  primary: '#1B4F8A',
  secondary: '#E8B800',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#888',
  dark: '#1A1A1A',
};

export default function ContactScreen() {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const sendMessage = () => {
    if (!name || !email || !message) {
      Alert.alert('Fout', 'Vul alle velden in.');
      return;
    }
    Alert.alert(
      'Bericht verzonden ✓',
      'Bedankt! We nemen zo snel mogelijk contact met je op.',
      [{ text: 'OK', onPress: () => { setName(''); setEmail(''); setMessage(''); } }],
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>📬 Contact</Text>
          <Text style={styles.headerSubtitle}>
            Neem rechtstreeks contact op met Pulafanatics
          </Text>
        </View>

        {/* Quick actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickBtn}
            onPress={() => Linking.openURL('tel:+3203484XXXX')}
          >
            <Text style={styles.quickBtnEmoji}>📞</Text>
            <Text style={styles.quickBtnText}>Bellen</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickBtn}
            onPress={() => Linking.openURL('mailto:info@pulafanatics.be')}
          >
            <Text style={styles.quickBtnEmoji}>✉️</Text>
            <Text style={styles.quickBtnText}>E-mail</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickBtn}
            onPress={() =>
              Linking.openURL('https://www.facebook.com/pulafanatics')
            }
          >
            <Text style={styles.quickBtnEmoji}>👍</Text>
            <Text style={styles.quickBtnText}>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickBtn}
            onPress={() =>
              Linking.openURL('https://www.pulafanatics.be')
            }
          >
            <Text style={styles.quickBtnEmoji}>🌐</Text>
            <Text style={styles.quickBtnText}>Website</Text>
          </TouchableOpacity>
        </View>

        {/* Contact info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>Contactgegevens</Text>
          {[
            { icon: '📧', label: 'E-mail', value: 'info@pulafanatics.be' },
            { icon: '🌐', label: 'Website', value: 'www.pulafanatics.be' },
            {
              icon: '📍',
              label: 'Stamcafé',
              value: 'Café De Kopere, Dorpstraat 1, 2980 Zandhoven',
            },
          ].map((item) => (
            <View key={item.label} style={styles.infoRow}>
              <Text style={styles.infoIcon}>{item.icon}</Text>
              <View>
                <Text style={styles.infoLabel}>{item.label}</Text>
                <Text style={styles.infoValue}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Contact form */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>📝 Contactformulier</Text>

          <Text style={styles.formLabel}>Naam</Text>
          <TextInput
            style={styles.input}
            placeholder="Jan De Smedt"
            placeholderTextColor={COLORS.gray}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.formLabel}>E-mailadres</Text>
          <TextInput
            style={styles.input}
            placeholder="jan@email.be"
            placeholderTextColor={COLORS.gray}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.formLabel}>Bericht</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Typ je bericht hier..."
            placeholderTextColor={COLORS.gray}
            multiline
            numberOfLines={5}
            value={message}
            onChangeText={setMessage}
          />

          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Text style={styles.sendBtnText}>📨 Verstuur bericht</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
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
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.white,
    padding: 20,
    marginBottom: 16,
  },
  quickBtn: { alignItems: 'center', gap: 6 },
  quickBtnEmoji: { fontSize: 32 },
  quickBtnText: { fontSize: 13, color: COLORS.dark, fontWeight: '600' },
  infoCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  infoCardTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.dark, marginBottom: 12 },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  infoIcon: { fontSize: 20, marginRight: 10, marginTop: 2 },
  infoLabel: { fontSize: 12, color: COLORS.gray, marginBottom: 2 },
  infoValue: { fontSize: 14, color: COLORS.dark },
  formCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
  },
  formTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.dark, marginBottom: 14 },
  formLabel: { fontSize: 14, color: COLORS.dark, fontWeight: '600', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    marginBottom: 14,
    color: COLORS.dark,
    backgroundColor: COLORS.lightGray,
  },
  textArea: { height: 120, textAlignVertical: 'top' },
  sendBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  sendBtnText: { color: COLORS.white, fontSize: 15, fontWeight: 'bold' },
});
