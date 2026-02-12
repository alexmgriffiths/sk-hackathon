import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyReportsScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.icon}>
            <MaterialCommunityIcons name="folder-outline" size={22} color="#111827" />
          </View>
          <Text style={styles.title}>My Reports</Text>
          <Text style={styles.body}>Placeholder tab. Next: list drafts + submitted reports.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#E6E6E3' },
  container: { flex: 1, padding: 16 },
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
});

