import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import HomeScreen from '../screens/home/HomeScreen';
import MatchesScreen from '../screens/matches/MatchesScreen';
import BusListScreen from '../screens/bus/BusListScreen';
import BusReservationScreen from '../screens/bus/BusReservationScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import MembershipScreen from '../screens/membership/MembershipScreen';
import ShopScreen from '../screens/shop/ShopScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import NewsScreen from '../screens/news/NewsScreen';
import NewsDetailScreen from '../screens/news/NewsDetailScreen';
import GalleryScreen from '../screens/gallery/GalleryScreen';
import AlbumDetailScreen from '../screens/gallery/AlbumDetailScreen';
import SponsorsScreen from '../screens/sponsors/SponsorsScreen';
import ContactScreen from '../screens/contact/ContactScreen';
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import AdminMembersScreen from '../screens/admin/AdminMembersScreen';
import AdminBusScreen from '../screens/admin/AdminBusScreen';
import AdminMatchesScreen from '../screens/admin/AdminMatchesScreen';
import AdminShopScreen from '../screens/admin/AdminShopScreen';
import AdminNewsScreen from '../screens/admin/AdminNewsScreen';
import AdminSponsorsScreen from '../screens/admin/AdminSponsorsScreen';
import AdminGalleryScreen from '../screens/admin/AdminGalleryScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

import { RootStackParamList } from '../types';
import { useAuth } from '../context/AuthContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const COLORS = {
  primary: '#1B4F8A',
  secondary: '#E8B800',
  gray: '#888',
};

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: focused ? 22 : 20, opacity: focused ? 1 : 0.6 }}>
      {emoji}
    </Text>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#EEE',
          paddingTop: 4,
          paddingBottom: 4,
          height: 60,
        },
        tabBarLabelStyle: { fontSize: 11, marginTop: 2 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Wedstrijden"
        component={MatchesScreen}
        options={{
          tabBarLabel: 'Kalender',
          tabBarIcon: ({ focused }) => <TabIcon emoji="⚽" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Bus"
        component={BusListScreen}
        options={{
          tabBarLabel: 'Bus',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🚌" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🛒" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Nieuws"
        component={NewsScreen}
        options={{
          tabBarLabel: 'Nieuws',
          tabBarIcon: ({ focused }) => <TabIcon emoji="📰" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Meer"
        component={MoreStackNavigator}
        options={{
          tabBarLabel: 'Meer',
          tabBarIcon: ({ focused }) => <TabIcon emoji="☰" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

// "More" stack for extra screens
const MoreStack = createNativeStackNavigator();
function MoreStackNavigator() {
  return (
    <MoreStack.Navigator>
      <MoreStack.Screen
        name="MoreHome"
        component={MoreMenuScreen}
        options={{ title: 'Menu' }}
      />
      <MoreStack.Screen
        name="Profiel"
        component={ProfileScreen}
        options={{ title: 'Mijn Pulafanatics' }}
      />
      <MoreStack.Screen
        name="Lidmaatschap"
        component={MembershipScreen}
        options={{ title: 'Word lid' }}
      />
      <MoreStack.Screen
        name="Galerij"
        component={GalleryScreen}
        options={{ title: 'Fotogalerij' }}
      />
      <MoreStack.Screen
        name="Sponsors"
        component={SponsorsScreen}
        options={{ title: 'Sponsors' }}
      />
      <MoreStack.Screen
        name="Contact"
        component={ContactScreen}
        options={{ title: 'Contact' }}
      />
    </MoreStack.Navigator>
  );
}

// Simple "More" menu screen
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function MoreMenuScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAuth();

  const items = [
    { label: '👤 Mijn Pulafanatics', screen: 'Profiel' },
    { label: '💳 Word lid', screen: 'Lidmaatschap' },
    { label: '📸 Fotogalerij', screen: 'Galerij' },
    { label: '🤝 Sponsors', screen: 'Sponsors' },
    { label: '📬 Contact', screen: 'Contact' },
  ];

  return (
    <ScrollView style={moreStyles.container}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.screen}
          style={moreStyles.menuItem}
          onPress={() => navigation.navigate(item.screen)}
        >
          <Text style={moreStyles.menuItemText}>{item.label}</Text>
          <Text style={moreStyles.chevron}>›</Text>
        </TouchableOpacity>
      ))}
      {user?.role === 'admin' && (
        <TouchableOpacity
          style={[moreStyles.menuItem, moreStyles.adminItem]}
          onPress={() => navigation.getParent()?.navigate('AdminDashboard')}
        >
          <Text style={moreStyles.adminItemText}>🔑 Beheerderspaneel</Text>
          <Text style={moreStyles.chevron}>›</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const moreStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  menuItem: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemText: { fontSize: 16, color: '#1A1A1A' },
  chevron: { fontSize: 20, color: '#888' },
  adminItem: { borderTopWidth: 4, borderTopColor: '#2C3E50', marginTop: 16 },
  adminItemText: { fontSize: 16, color: '#2C3E50', fontWeight: 'bold' },
});

// Root navigator
export default function AppNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: true, title: 'Registreren' }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen
            name="BusReservation"
            component={BusReservationScreen}
            options={{
              headerShown: true,
              title: 'Busreservatie',
              headerStyle: { backgroundColor: '#1B4F8A' },
              headerTintColor: '#FFF',
            }}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
            options={{
              headerShown: true,
              title: 'Product',
              headerStyle: { backgroundColor: '#1B4F8A' },
              headerTintColor: '#FFF',
            }}
          />
          <Stack.Screen
            name="AlbumDetail"
            component={AlbumDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NewsDetail"
            component={NewsDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdminDashboard"
            component={AdminDashboardScreen}
            options={{
              headerShown: true,
              title: 'Beheerderspaneel',
              headerStyle: { backgroundColor: '#2C3E50' },
              headerTintColor: '#FFF',
            }}
          />
          <Stack.Screen
            name="AdminMembers"
            component={AdminMembersScreen}
            options={{
              headerShown: true,
              title: 'Ledenbeheer',
              headerStyle: { backgroundColor: '#2C3E50' },
              headerTintColor: '#FFF',
            }}
          />
          <Stack.Screen
            name="AdminBus"
            component={AdminBusScreen}
            options={{
              headerShown: true,
              title: 'Busverplaatsingen',
              headerStyle: { backgroundColor: '#2C3E50' },
              headerTintColor: '#FFF',
            }}
          />
          <Stack.Screen
            name="AdminMatches"
            component={AdminMatchesScreen}
            options={{
              headerShown: true,
              title: 'Wedstrijden & Activiteiten',
              headerStyle: { backgroundColor: '#2C3E50' },
              headerTintColor: '#FFF',
            }}
          />
          <Stack.Screen
            name="AdminShop"
            component={AdminShopScreen}
            options={{
              headerShown: true,
              title: 'Webshop beheer',
              headerStyle: { backgroundColor: '#2C3E50' },
              headerTintColor: '#FFF',
            }}
          />
          <Stack.Screen
            name="AdminNews"
            component={AdminNewsScreen}
            options={{
              headerShown: true,
              title: 'Nieuwsberichten',
              headerStyle: { backgroundColor: '#2C3E50' },
              headerTintColor: '#FFF',
            }}
          />
          <Stack.Screen
            name="AdminSponsors"
            component={AdminSponsorsScreen}
            options={{
              headerShown: true,
              title: 'Sponsors beheer',
              headerStyle: { backgroundColor: '#2C3E50' },
              headerTintColor: '#FFF',
            }}
          />
          <Stack.Screen
            name="AdminGallery"
            component={AdminGalleryScreen}
            options={{
              headerShown: true,
              title: 'Fotoalbums',
              headerStyle: { backgroundColor: '#2C3E50' },
              headerTintColor: '#FFF',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
