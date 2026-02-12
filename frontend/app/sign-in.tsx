import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type CardHeaderProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  subtitle: string;
};

function CardHeader({ icon, title, subtitle }: CardHeaderProps) {
  return (
    <View style={styles.cardHeader}>
      <MaterialCommunityIcons name={icon} size={18} color="#111827" />
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

type LabeledInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'number-pad';
  textContentType?: React.ComponentProps<typeof TextInput>['textContentType'];
  autoCapitalize?: React.ComponentProps<typeof TextInput>['autoCapitalize'];
  autoCorrect?: boolean;
};

function LabeledInput({
  label,
  placeholder,
  value,
  onChangeText,
  icon,
  secureTextEntry,
  keyboardType = 'default',
  textContentType,
  autoCapitalize = 'none',
  autoCorrect = false,
}: LabeledInputProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrap}>
        <MaterialCommunityIcons name={icon} size={18} color="#9CA3AF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          textContentType={textContentType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
        />
      </View>
    </View>
  );
}

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  trailingIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
};

function PrimaryButton({ title, onPress, trailingIcon = 'chevron-right' }: PrimaryButtonProps) {
  return (
    <Pressable accessibilityRole="button" style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]} onPress={onPress}>
      <Text style={styles.primaryButtonText}>{title}</Text>
      <MaterialCommunityIcons name={trailingIcon} size={20} color="#FFFFFF" />
    </Pressable>
  );
}

type SecondaryButtonProps = {
  title: string;
  onPress: () => void;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

function SecondaryButton({ title, onPress, icon }: SecondaryButtonProps) {
  return (
    <Pressable accessibilityRole="button" style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={18} color="#111827" />
      <Text style={styles.secondaryButtonText}>{title}</Text>
    </Pressable>
  );
}

export default function SignInAccessCodeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessCode, setAccessCode] = useState('');

  const ssoButtons = useMemo(
    () => [
      { id: 'google', title: 'Sign in with Google', icon: 'google' as const, show: true },
      { id: 'apple', title: 'Sign in with Apple', icon: 'apple' as const, show: Platform.OS === 'ios' },
    ],
    []
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Stack.Screen options={{ title: 'Sign In', headerShown: false }} />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <View style={styles.heroLogo}>
              <MaterialCommunityIcons name="heart-pulse" size={34} color="#FFFFFF" />
            </View>
            <Text style={styles.heroTitle}>Welcome Back</Text>
            <Text style={styles.heroBody}>
              Sign in to continue sharing your valuable{'\n'}feedback and track your reports
            </Text>
          </View>

          <View style={styles.card}>
            <CardHeader
              icon="account-badge-outline"
              title="Staff Access"
              subtitle="Sign in with your hotel staff credentials to access personalized features"
            />

            <LabeledInput
              label="Email Address"
              placeholder="your.email@hotel.com"
              value={email}
              onChangeText={setEmail}
              icon="email-outline"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoCapitalize="none"
            />

            <LabeledInput
              label="Password"
              placeholder="••••••••••"
              value={password}
              onChangeText={setPassword}
              icon="lock-outline"
              secureTextEntry
              textContentType="password"
              autoCapitalize="none"
            />

            <PrimaryButton
              title="Sign In"
              trailingIcon="login"
              onPress={() => {
                // Placeholder: integrate with backend auth.
              }}
            />

            <Pressable accessibilityRole="button" onPress={() => {}}>
              <Text style={styles.link}>Forgot password?</Text>
            </Pressable>
          </View>

          <View style={styles.card}>
            <CardHeader
              icon="key-outline"
              title="Access Code"
              subtitle="Enter your access code to verify your identity and access sensitive features"
            />

            <LabeledInput
              label="Access Code"
              placeholder="Enter 6-digit code"
              value={accessCode}
              onChangeText={setAccessCode}
              icon="form-textbox-password"
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoCapitalize="none"
            />

            <PrimaryButton
              title="Verify Code"
              trailingIcon="check-circle-outline"
              onPress={() => {
                // Placeholder: verify access code.
              }}
            />

            <View style={styles.helperRow}>
              <Text style={styles.helperText}>Didn’t get a code?</Text>
              <Pressable accessibilityRole="button" onPress={() => {}}>
                <Text style={[styles.link, { marginTop: 0 }]}>Resend</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.card}>
            <CardHeader
              icon="shield-account-outline"
              title="Single Sign-On"
              subtitle="Use your preferred identity provider"
            />

            <View style={styles.ssoRow}>
              {ssoButtons
                .filter((b) => b.show)
                .map((b) => (
                  <SecondaryButton
                    key={b.id}
                    title={b.title}
                    icon={b.icon}
                    onPress={() => {
                      // Placeholder: OAuth flow.
                    }}
                  />
                ))}
            </View>
          </View>

          <View style={[styles.card, styles.anonymousCard]}>
            <CardHeader
              icon="incognito"
              title="Continue Anonymously"
              subtitle="No account required. Your feedback stays anonymous and is not linked to your identity."
            />

            <Pressable
              accessibilityRole="button"
              style={({ pressed }) => [styles.anonymousButton, pressed && styles.pressed]}
              onPress={() => {
                router.replace('/');
              }}>
              <Text style={styles.anonymousButtonText}>Continue Anonymously</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#FFFFFF" />
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: '#E6E6E3' },
  pressed: { opacity: 0.86 },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
    gap: 16,
  },

  hero: { alignItems: 'center', gap: 12, paddingBottom: 12 },
  heroLogo: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#193328',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  heroTitle: {
    marginTop: 4,
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 32,
    color: '#111827',
    textAlign: 'center',
  },
  heroBody: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5563',
    textAlign: 'center',
    paddingHorizontal: 8,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#B7B09C',
    padding: 21,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  cardTitle: { fontSize: 16, fontWeight: '800', lineHeight: 24, color: '#111827' },
  cardSubtitle: { marginTop: 2, fontSize: 12, lineHeight: 16, color: '#4B5563' },

  field: { gap: 8 },
  label: { fontSize: 12, fontWeight: '600', lineHeight: 16, color: '#374151' },
  inputWrap: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 14, color: '#111827', paddingVertical: 12 },

  primaryButton: {
    backgroundColor: '#193328',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 4,
  },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },

  secondaryButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryButtonText: { color: '#111827', fontSize: 13, fontWeight: '700' },
  ssoRow: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },

  link: { color: '#0A7EA4', fontSize: 12, fontWeight: '700', marginTop: 4 },

  helperRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  helperText: { fontSize: 12, color: '#4B5563' },

  anonymousCard: { borderColor: 'rgba(25,51,40,0.25)' },
  anonymousButton: {
    backgroundColor: '#193328',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  anonymousButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
});

