import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.icon}>
            <MaterialCommunityIcons name="account-circle-outline" size={22} color="#111827" />
          </View>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.body}>
            Placeholder tab. Next: show identity status, role, preferences, and sign-out.
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
          onPress={() => router.push('/sign-in')}>
          <Text style={styles.primaryButtonText}>Open Sign In</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#FFFFFF" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#E6E6E3' },
  container: { flex: 1, padding: 16, gap: 16, justifyContent: 'space-between' },
  pressed: { opacity: 0.86 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#B7B09C',
    padding: 18,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6E6E3',
    marginBottom: 12,
  },
  title: { fontSize: 20, fontWeight: '800', color: '#111827', lineHeight: 28 },
  body: { marginTop: 8, fontSize: 14, lineHeight: 22, color: '#4B5563' },
  primaryButton: {
    backgroundColor: '#193328',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
});

