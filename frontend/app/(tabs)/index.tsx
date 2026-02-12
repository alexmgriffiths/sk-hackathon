import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeDashboardScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.heading}>Welcome back, Sarah!</Text>
            <Text style={styles.subheading}>Front Desk Team • Morning Shift</Text>
          </View>

          <View style={styles.headerRight}>
            <Text style={styles.todayLabel}>Today</Text>
            <Text style={styles.dateLabel}>Dec 12, 2024</Text>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [styles.ctaButton, pressed && styles.pressed]}
          onPress={() => router.push('/start-report')}>
          <View style={styles.ctaLeft}>
            <View style={styles.ctaIconWrap}>
              <MaterialCommunityIcons name="plus" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.ctaText}>
              <Text style={styles.ctaTitle}>Start New Guided Report</Text>
              <Text style={styles.ctaSubtitle}>Share your observations & suggestions</Text>
            </View>
          </View>
          <MaterialCommunityIcons name="arrow-right" size={20} color="#FFFFFF" />
        </Pressable>

        <View style={styles.placeholderCard}>
          <Text style={styles.placeholderTitle}>Next sections</Text>
          <Text style={styles.placeholderBody}>
            Recent activity, drafts, insights, and learning resources can be added next.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#E6E6E3' },
  content: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24, gap: 12 },
  pressed: { opacity: 0.86 },

  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerLeft: { gap: 2, flex: 1, paddingRight: 12 },
  heading: { fontSize: 20, fontWeight: '800', lineHeight: 28, color: '#111827' },
  subheading: { fontSize: 12, lineHeight: 16, color: '#4B5563' },
  headerRight: { alignItems: 'flex-end' },
  todayLabel: { fontSize: 12, lineHeight: 16, color: '#6B7280' },
  dateLabel: { fontSize: 14, fontWeight: '600', lineHeight: 20, color: '#111827' },

  ctaButton: {
    backgroundColor: '#193328',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    minHeight: 88,
  },
  ctaLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, paddingRight: 12 },
  ctaIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: { marginLeft: 16, gap: 2, flex: 1 },
  ctaTitle: { fontSize: 16, fontWeight: '800', lineHeight: 24, color: '#FFFFFF' },
  ctaSubtitle: { fontSize: 12, lineHeight: 16, color: 'rgba(255,255,255,0.9)' },

  placeholderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#B7B09C',
    padding: 16,
  },
  placeholderTitle: { fontSize: 14, fontWeight: '800', color: '#111827', lineHeight: 20 },
  placeholderBody: { marginTop: 6, fontSize: 12, lineHeight: 16, color: '#4B5563' },
});
