import { StyleSheet, Text, type TextProps, Platform } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { Fonts, Colors } from '@/constants/theme';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'label' | 'body';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const tintColor = useThemeColor({}, 'tint');

  const getTypeStyle = () => {
    switch (type) {
      case 'title':
        return styles.title;
      case 'subtitle':
        return styles.subtitle;
      case 'defaultSemiBold':
        return styles.defaultSemiBold;
      case 'link':
        return [styles.link, { color: tintColor }];
      case 'label':
        return styles.label;
      case 'body':
        return styles.body;
      default:
        return styles.default;
    }
  };

  return (
    <Text
      style={[
        { color },
        getTypeStyle(),
        style,
      ]}
      {...rest}
    />
  );
}

const fonts = Fonts || { serif: 'serif', sans: 'sans-serif' };

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fonts.sans,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    fontFamily: fonts.sans,
  },
  // Elegant serif title - inspired by Barnsley Resort headings
  title: {
    fontSize: 28,
    fontWeight: '400',
    lineHeight: 36,
    fontFamily: fonts.serif,
    letterSpacing: 0.5,
  },
  // Serif subtitle for section headers
  subtitle: {
    fontSize: 22,
    fontWeight: '400',
    lineHeight: 28,
    fontFamily: fonts.serif,
  },
  // All-caps label style (like "RESORT & GROUNDS" in the design)
  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontFamily: fonts.sans,
  },
  // Body text for paragraphs
  body: {
    fontSize: 16,
    lineHeight: 26,
    fontFamily: fonts.sans,
  },
  // Underlined link style (like "LEARN MORE" in the design)
  link: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
    fontFamily: fonts.sans,
  },
});
