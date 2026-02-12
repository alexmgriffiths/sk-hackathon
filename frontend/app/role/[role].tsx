import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type RoleId =
  | 'front-desk'
  | 'housekeeping'
  | 'food-beverage'
  | 'maintenance'
  | 'manager'
  | 'other';

function formatRoleTitle(role?: string) {
  if (!role) return 'Role';
  return role
    .split('-')
    .map((part) => (part ? part[0]!.toUpperCase() + part.slice(1) : part))
    .join(' ');
}

export default function RoleScreen() {
  const params = useLocalSearchParams<{ role?: RoleId }>();
  const role = params.role;

  const title = useMemo(() => formatRoleTitle(role), [role]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <Stack.Screen options={{ title }} />

      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.icon}>
            <MaterialCommunityIcons name="account-check-outline" size={22} color="#111827" />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.body}>
            This is a placeholder screen so the role buttons have a destination. Next, we can
            start the guided feedback chat flow for this role.
          </Text>
        </View>

        <Pressable accessibilityRole="button" style={styles.primaryButton} onPress={() => {}}>
          <Text style={styles.primaryButtonText}>Start feedback chat</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#FFFFFF" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F2EF' },
  container: { flex: 1, padding: 16, gap: 16, justifyContent: 'space-between' },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(17,24,39,0.08)',
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
  title: { fontSize: 22, fontWeight: '800', color: '#111827', lineHeight: 28 },
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
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});

