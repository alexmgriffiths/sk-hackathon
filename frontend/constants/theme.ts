/**
 * Barnsley Resort Theme
 * Inspired by nature, elegance, and deep connections
 */

import { Platform } from 'react-native';

// Barnsley Resort color palette
const forestGreen = '#1B3B2F';
const darkTeal = '#2D4A47';
const cream = '#F8F6F2';
const warmWhite = '#FEFDFB';
const charcoal = '#2C2C2C';
const mutedGold = '#B8A88A';
const softGray = '#8A8A8A';

export const Colors = {
  light: {
    text: charcoal,
    background: cream,
    tint: forestGreen,
    icon: softGray,
    tabIconDefault: softGray,
    tabIconSelected: forestGreen,
    // Extended palette
    primary: forestGreen,
    secondary: darkTeal,
    accent: mutedGold,
    surface: warmWhite,
    border: '#E5E2DC',
    error: '#B85450',
    errorBackground: '#FDF2F2',
  },
  dark: {
    text: cream,
    background: '#1A1A1A',
    tint: mutedGold,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: mutedGold,
    // Extended palette
    primary: mutedGold,
    secondary: darkTeal,
    accent: forestGreen,
    surface: '#252525',
    border: '#3A3A3A',
    error: '#E57373',
    errorBackground: '#2D2020',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** Elegant serif for headings - matches Barnsley Resort's refined typography */
    serif: 'Georgia',
    /** Clean sans-serif for body text and navigation */
    sans: 'System',
    /** Monospace for code */
    mono: 'Menlo',
  },
  android: {
    serif: 'serif',
    sans: 'sans-serif',
    mono: 'monospace',
  },
  default: {
    serif: 'serif',
    sans: 'sans-serif',
    mono: 'monospace',
  },
  web: {
    serif: "Georgia, 'Times New Roman', 'Playfair Display', serif",
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
});

// Spacing scale for consistent layout
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius for consistent rounded corners
export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
};
