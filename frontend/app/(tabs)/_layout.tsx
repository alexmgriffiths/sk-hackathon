import { Tabs, usePathname, router } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, Platform, Pressable, ScrollView } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemedText } from '@/components/themed-text';

// Main navigation items matching Figma design
const MAIN_NAV_ITEMS = [
  { name: 'home', label: 'STAY' },
  { name: 'experiences', label: 'EXPERIENCES' },
  { name: 'home', label: 'DINE' },
  { name: 'home', label: 'GATHER' },
  { name: 'home', label: 'THE RESORT' },
  { name: 'index', label: 'HOTEL VOICE' },
  { name: 'home', label: 'OFFERS' },
];

// Promotional Banner
function PromoBanner({ onClose }: { onClose: () => void }) {
  return (
    <View style={styles.promoBanner}>
      <Pressable style={styles.promoArrow}>
        <IconSymbol name="chevron.left" size={14} color="#F8F6F2" />
      </Pressable>
      <ThemedText style={styles.promoText}>
        Winter Flash Sale: Save 15% + $50 Breakfast Credit. Please Click For Details  ›
      </ThemedText>
      <Pressable style={styles.promoArrow}>
        <IconSymbol name="chevron.right" size={14} color="#F8F6F2" />
      </Pressable>
      <Pressable style={styles.promoClose} onPress={onClose}>
        <IconSymbol name="xmark" size={14} color="#F8F6F2" />
      </Pressable>
    </View>
  );
}

// Top utility navigation (MEMBERSHIP, GALLERY, logo, phone, BOOK NOW)
function TopUtilityNav() {
  return (
    <View style={styles.utilityNav}>
      <View style={styles.utilityLeft}>
        <Pressable style={styles.utilityLink}>
          <ThemedText style={styles.utilityLinkText}>MEMBERSHIP</ThemedText>
        </Pressable>
        <View style={styles.utilityDivider} />
        <Pressable style={styles.utilityLink}>
          <ThemedText style={styles.utilityLinkText}>GALLERY</ThemedText>
        </Pressable>
      </View>

      <View style={styles.logoContainer}>
        <IconSymbol name="bird.fill" size={32} color="#1B3B2F" />
      </View>

      <View style={styles.utilityRight}>
        <ThemedText style={styles.phoneText}>877.773.2447</ThemedText>
        <Pressable style={styles.bookNowButton}>
          <ThemedText style={styles.bookNowText}>BOOK NOW</ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

// Main navigation bar
function MainNavBar({ colors }: { colors: typeof Colors.light }) {
  const pathname = usePathname();

  const isActive = (name: string) => {
    if (name === 'home' && pathname === '/home') return true;
    if (name === 'experiences' && pathname === '/experiences') return true;
    if (name === 'index' && (pathname === '/' || pathname === '/index')) return true;
    return false;
  };

  return (
    <View style={[styles.mainNavBar, { borderBottomColor: colors.border }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.mainNavContent}
      >
        {MAIN_NAV_ITEMS.map((item, index) => {
          const active = isActive(item.name) && index === 0;
          return (
            <Pressable
              key={`${item.label}-${index}`}
              style={styles.mainNavItem}
              onPress={() => router.push(`/${item.name === 'index' ? '' : item.name}` as any)}
            >
              <ThemedText
                style={[
                  styles.mainNavLabel,
                  { color: active ? colors.tint : '#2C2C2C' },
                ]}
              >
                {item.label}
              </ThemedText>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [showPromo, setShowPromo] = useState(true);

  return (
    <View style={styles.container}>
      {/* Promotional Banner */}
      {showPromo && <PromoBanner onClose={() => setShowPromo(false)} />}

      {/* Top Utility Navigation */}
      <TopUtilityNav />

      {/* Main Navigation Bar */}
      <MainNavBar colors={colors} />

      {/* Hidden Tabs - still needed for routing */}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}>
        <Tabs.Screen name="home" />
        <Tabs.Screen name="experiences" />
        <Tabs.Screen name="index" />
        <Tabs.Screen name="explore" options={{ href: null }} />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // Promo Banner
  promoBanner: {
    backgroundColor: '#2D4A47',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoText: {
    color: '#F8F6F2',
    fontSize: 13,
    textAlign: 'center',
    flex: 1,
    letterSpacing: 0.5,
  },
  promoArrow: {
    padding: 8,
  },
  promoClose: {
    padding: 8,
    marginLeft: 8,
  },

  // Utility Navigation
  utilityNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  utilityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  utilityLink: {
    paddingVertical: 4,
  },
  utilityLinkText: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1.5,
    color: '#1B3B2F',
  },
  utilityDivider: {
    width: 1,
    height: 12,
    backgroundColor: '#ccc',
    marginHorizontal: 12,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  utilityRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    gap: 16,
  },
  phoneText: {
    fontSize: 12,
    letterSpacing: 1,
    color: '#2C2C2C',
  },
  bookNowButton: {
    paddingVertical: 4,
  },
  bookNowText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    color: '#2C2C2C',
  },

  // Main Navigation
  mainNavBar: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#E5E2DC',
    backgroundColor: '#fff',
  },
  mainNavContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  mainNavItem: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  mainNavLabel: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 1.5,
  },
});
