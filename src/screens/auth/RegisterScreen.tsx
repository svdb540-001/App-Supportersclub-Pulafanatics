import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
};

const COLORS = {
  primary: '#1B4F8A',
  secondary: '#E8B800',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#888',
  dark: '#1A1A1A',
};

export default function RegisterScreen({ navigation }: Props) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
  });

  const update = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleRegister = () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.password ||
      !form.dateOfBirth
    ) {
      Alert.alert('Fout', 'Vul alle verplichte velden in.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      Alert.alert('Fout', 'Wachtwoorden komen niet overeen.');
      return;
    }
    Alert.alert(
      'Registratie ontvangen',
      'Je aanvraag is doorgestuurd naar het bestuur. Je ontvangt een bevestigingsmail.',
      [{ text: 'OK', onPress: () => navigation.goBack() }],
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Word lid van Pulafanatics</Text>
        <Text style={styles.subtitle}>Vul je gegevens in om je aan te melden</Text>

        {[
          { label: 'Voornaam *', field: 'firstName', placeholder: 'Jan' },
          { label: 'Achternaam *', field: 'lastName', placeholder: 'De Smedt' },
          { label: 'E-mailadres *', field: 'email', placeholder: 'jan@email.be' },
          { label: 'Telefoonnummer', field: 'phone', placeholder: '+32 477 00 00 00' },
          {
            label: 'Geboortedatum *',
            field: 'dateOfBirth',
            placeholder: 'DD/MM/JJJJ',
          },
          { label: 'Wachtwoord *', field: 'password', placeholder: '••••••••', secure: true },
          {
            label: 'Bevestig wachtwoord *',
            field: 'confirmPassword',
            placeholder: '••••••••',
            secure: true,
          },
        ].map(({ label, field, placeholder, secure }) => (
          <View key={field}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              placeholderTextColor={COLORS.gray}
              secureTextEntry={secure}
              value={form[field as keyof typeof form]}
              onChangeText={(v) => update(field as keyof typeof form, v)}
              autoCapitalize={field === 'email' ? 'none' : 'words'}
              keyboardType={field === 'email' ? 'email-address' : 'default'}
            />
          </View>
        ))}

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            🔒 Na registratie wordt je aanvraag beoordeeld door het bestuur. Je ontvangt
            een e-mail zodra je account is geactiveerd.
          </Text>
        </View>

        <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
          <Text style={styles.registerBtnText}>Registreer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backBtnText}>← Terug naar inloggen</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  scroll: { padding: 24 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
    marginTop: 16,
  },
  subtitle: { fontSize: 14, color: COLORS.gray, marginBottom: 24 },
  label: { fontSize: 14, color: COLORS.dark, marginBottom: 6, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    color: COLORS.dark,
    backgroundColor: COLORS.lightGray,
  },
  infoBox: {
    backgroundColor: '#EEF4FF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  infoText: { fontSize: 13, color: COLORS.primary, lineHeight: 20 },
  registerBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  registerBtnText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
  backBtn: { alignItems: 'center', padding: 8 },
  backBtnText: { color: COLORS.primary, fontSize: 14 },
});
