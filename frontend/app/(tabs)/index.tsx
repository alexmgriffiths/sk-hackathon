import { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  View,
} from 'react-native';
import Markdown from 'react-native-markdown-display';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Colors, Spacing, BorderRadius, Fonts } from '@/constants/theme';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080';

export default function HomeScreen() {
  const [concern, setConcern] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');
  const surfaceColor = useThemeColor({}, 'surface');
  const borderColor = useThemeColor({}, 'border');
  const errorBgColor = useThemeColor({}, 'errorBackground');
  const errorTextColor = useThemeColor({}, 'error');

  const handleSubmit = async () => {
    if (!concern.trim()) {
      setError('Please enter a concern');
      return;
    }

    setLoading(true);
    setError('');
    setAnalysis('');

    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concern }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze concern');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor }]}
      contentContainerStyle={styles.content}
    >
      {/* Header Section */}
      <ThemedView style={styles.header}>
        <ThemedText type="label" style={styles.labelText}>
          Workplace Insights
        </ThemedText>
        <ThemedText type="title" style={styles.titleText}>
          Transform Your Concerns
        </ThemedText>
        <ThemedText type="body" style={styles.subtitleText}>
          Time here is an invitation to articulate your workplace concerns
          and transform them into compelling, actionable business cases.
        </ThemedText>
      </ThemedView>

      {/* Form Section */}
      <ThemedView style={[styles.form, { backgroundColor: surfaceColor }]}>
        <ThemedText type="label" style={styles.formLabel}>
          Share Your Concern
        </ThemedText>
        <TextInput
          style={[
            styles.input,
            {
              color: textColor,
              borderColor: borderColor,
              backgroundColor: backgroundColor,
            }
          ]}
          placeholder="Describe your workplace concern in detail..."
          placeholderTextColor="#8A8A8A"
          multiline
          numberOfLines={6}
          value={concern}
          onChangeText={setConcern}
          textAlignVertical="top"
        />

        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: tintColor },
            pressed && styles.buttonPressed
          ]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#F8F6F2" />
          ) : (
            <ThemedText style={styles.buttonText}>ANALYZE CONCERN</ThemedText>
          )}
        </Pressable>
      </ThemedView>

      {/* Error Display */}
      {error ? (
        <ThemedView style={[styles.errorBox, { backgroundColor: errorBgColor }]}>
          <ThemedText style={[styles.errorText, { color: errorTextColor }]}>
            {error}
          </ThemedText>
        </ThemedView>
      ) : null}

      {/* Results Section */}
      {analysis ? (
        <ThemedView style={[styles.result, { backgroundColor: surfaceColor }]}>
          <ThemedText type="label" style={styles.resultLabel}>
            Your Business Case
          </ThemedText>
          <ThemedText type="subtitle" style={styles.resultTitle}>
            Strategic Analysis
          </ThemedText>
          <View style={[styles.divider, { backgroundColor: borderColor }]} />
          <Markdown style={markdownStyles(textColor)}>{analysis}</Markdown>
        </ThemedView>
      ) : null}
    </ScrollView>
  );
}

const fonts = Fonts || { serif: 'serif', sans: 'sans-serif', mono: 'monospace' };

const markdownStyles = (textColor: string) => ({
  body: {
    color: textColor,
    fontSize: 16,
    lineHeight: 26,
    fontFamily: fonts.sans,
  },
  heading1: {
    color: textColor,
    fontSize: 24,
    fontWeight: '400' as const,
    marginVertical: 12,
    fontFamily: fonts.serif,
  },
  heading2: {
    color: textColor,
    fontSize: 20,
    fontWeight: '400' as const,
    marginVertical: 10,
    fontFamily: fonts.serif,
  },
  heading3: {
    color: textColor,
    fontSize: 18,
    fontWeight: '500' as const,
    marginVertical: 8,
    fontFamily: fonts.sans,
  },
  paragraph: { marginVertical: 10 },
  listItem: { marginVertical: 6 },
  bullet_list: { marginVertical: 10 },
  ordered_list: { marginVertical: 10 },
  strong: { fontWeight: '600' as const },
  em: { fontStyle: 'italic' as const },
  code_inline: {
    backgroundColor: '#E8E5DF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontFamily: fonts.mono,
    fontSize: 14,
  },
  fence: {
    backgroundColor: '#E8E5DF',
    padding: 16,
    borderRadius: BorderRadius.md,
    marginVertical: 12,
    fontFamily: fonts.mono,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
    paddingTop: 72,
    paddingBottom: Spacing.xxl,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  labelText: {
    marginBottom: Spacing.sm,
    opacity: 0.7,
  },
  titleText: {
    marginBottom: Spacing.md,
  },
  subtitleText: {
    opacity: 0.8,
    lineHeight: 26,
  },
  form: {
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  formLabel: {
    marginBottom: Spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    minHeight: 160,
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonText: {
    color: '#F8F6F2',
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 1.5,
  },
  errorBox: {
    marginTop: Spacing.lg,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  errorText: {
    fontSize: 14,
  },
  result: {
    marginTop: Spacing.xl,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  resultLabel: {
    marginBottom: Spacing.xs,
    opacity: 0.7,
  },
  resultTitle: {
    marginBottom: Spacing.md,
  },
  divider: {
    height: 1,
    marginBottom: Spacing.lg,
  },
});
