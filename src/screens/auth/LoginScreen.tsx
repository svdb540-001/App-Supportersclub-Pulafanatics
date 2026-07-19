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
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { useAuth } from '../../context/AuthContext';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const COLORS = {
  primary: '#1B4F8A',
  secondary: '#E8B800',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#888',
  dark: '#1A1A1A',
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Fout', 'Vul je e-mail en wachtwoord in.');
      return;
    }
    setLoading(true);
    const success = await login(email.trim(), password);
    setLoading(false);
    if (!success) {
      Alert.alert('Inloggen mislukt', 'Onbekend e-mailadres of fout wachtwoord.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* Logo area */}
        <View style={styles.logoArea}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>⚽</Text>
          </View>
          <Text style={styles.appName}>Pulafanatics</Text>
          <Text style={styles.tagline}>Supportersclub</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>E-mailadres</Text>
          <TextInput
            style={styles.input}
            placeholder="naam@email.be"
            placeholderTextColor={COLORS.gray}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Wachtwoord</Text>
          <TextInput
            style={styles.input}
            placeholder="Wachtwoord"
            placeholderTextColor={COLORS.gray}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={[styles.loginBtn, loading && styles.loginBtnDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginBtnText}>
              {loading ? 'Inloggen...' : 'Inloggen'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Wachtwoord vergeten?</Text>
          </TouchableOpacity>
        </View>

        {/* Demo info */}
        <View style={styles.demoBox}>
          <Text style={styles.demoTitle}>Demo accounts:</Text>
          <Text style={styles.demoText}>Lid: jan@pulafanatics.be</Text>
          <Text style={styles.demoText}>Admin: admin@pulafanatics.be</Text>
          <Text style={styles.demoText}>(elk wachtwoord werkt)</Text>
        </View>

        {/* Register link */}
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>
            Nog geen lid?{' '}
            <Text style={styles.registerLink}>Word nu lid</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  scroll: { flexGrow: 1, padding: 24, justifyContent: 'center' },
  logoArea: { alignItems: 'center', marginBottom: 40 },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoText: { fontSize: 48 },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
    letterSpacing: 1,
  },
  tagline: { fontSize: 16, color: COLORS.secondary, marginTop: 4 },
  form: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
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
  loginBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  loginBtnDisabled: { opacity: 0.6 },
  loginBtnText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
  forgotBtn: { alignItems: 'center', marginTop: 12 },
  forgotText: { color: COLORS.gray, fontSize: 14 },
  demoBox: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  demoTitle: { color: COLORS.secondary, fontWeight: 'bold', marginBottom: 4 },
  demoText: { color: COLORS.white, fontSize: 13 },
  registerText: { textAlign: 'center', color: COLORS.white, fontSize: 14 },
  registerLink: { color: COLORS.secondary, fontWeight: 'bold' },
});
