import { useRef } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Dimensions,
  FlatList,
  ImageBackground,
} from 'react-native';
import { Image } from 'expo-image';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing, BorderRadius, Fonts } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const GALLERY_IMAGE_WIDTH = Math.min(SCREEN_WIDTH * 0.4, 300);

// Hero background image - cozy fire pit gathering
const HERO_IMAGE = 'https://images.unsplash.com/photo-1475483768296-6163e08872a1?w=1200';

// Dining venues data
const diningVenues = [
  {
    id: '1',
    title: 'The Woodlands Grill',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
  },
  {
    id: '2',
    title: 'Rice House',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600',
  },
  {
    id: '3',
    title: 'The Biergarten',
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600',
  },
  {
    id: '4',
    title: 'Bourbon Bar',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600',
  },
];

type DiningVenue = typeof diningVenues[0];

// Barnsley Resort sage/olive color
const SAGE_BACKGROUND = '#E8E4C9';
const FOREST_GREEN = '#1B3B2F';

export default function HomeScreen() {
  const flatListRef = useRef<FlatList>(null);

  const tintColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');

  const renderDiningCard = ({ item }: { item: DiningVenue }) => (
    <Pressable style={styles.galleryCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.galleryImage}
        contentFit="cover"
      />
    </Pressable>
  );

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Section with Background Image */}
      <ImageBackground
        source={{ uri: HERO_IMAGE }}
        style={styles.heroSection}
        resizeMode="cover"
      >
        {/* Content Overlay Card */}
        <View style={styles.heroOverlay}>
          <ThemedText type="label" style={styles.heroLabel}>
            RESORT & GROUNDS
          </ThemedText>

          <ThemedText type="title" style={styles.heroTitle}>
            Embrace Deep Connections
          </ThemedText>

          <ThemedText style={styles.heroDescription}>
            Time here is an invitation to reset to the rhythms of nature,
            togetherness and conversation. In storied gardens and on lush
            fairways. Over starlit suppers, around the fire and amid the
            convivial din of friends and family. These are the moments that
            delight — and live forever.
          </ThemedText>

          <Pressable style={styles.heroLink}>
            <ThemedText style={styles.heroLinkText}>LEARN MORE</ThemedText>
          </Pressable>

          <Pressable style={styles.heroLink}>
            <ThemedText style={styles.heroLinkText}>EXPLORE ON MAP</ThemedText>
          </Pressable>
        </View>
      </ImageBackground>

      {/* Dining Section - Sage Background */}
      <View style={[styles.diningSection, { backgroundColor: SAGE_BACKGROUND }]}>
        <ThemedText type="title" style={styles.sectionTitle}>
          Flavors That Connect
        </ThemedText>

        <ThemedText type="body" style={styles.sectionDescription}>
          Whether it's Southern comfort food shared around a table, slow-smoked
          barbecue and brews at the Biergarten, a sunset dinner in an elegant
          dining room or a nod to the spirit and culture of bourbon, wherever
          you dine, it all begins with gathering together to savor the freshest flavors.
        </ThemedText>

        <Pressable style={styles.ctaButton}>
          <ThemedText style={styles.ctaText}>
            EXPLORE ALL DINING
          </ThemedText>
        </Pressable>
      </View>

      {/* Dining Gallery */}
      <View style={styles.gallerySection}>
        <FlatList
          ref={flatListRef}
          data={diningVenues}
          renderItem={renderDiningCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.galleryContent}
          snapToInterval={GALLERY_IMAGE_WIDTH + Spacing.md}
          decelerationRate="fast"
        />
      </View>

      {/* Experiences Section */}
      <View style={[styles.experiencesSection, { backgroundColor }]}>
        <View style={styles.experiencesHeader}>
          <IconSymbol name="leaf.fill" size={32} color={tintColor} />
          <ThemedText type="label" style={styles.experiencesLabel}>
            Experiences
          </ThemedText>
        </View>

        <ThemedText type="title" style={styles.experiencesTitle}>
          Experience Joy & Discovery
        </ThemedText>

        <ThemedText type="body" style={styles.experiencesDescription}>
          From world-class golf to rejuvenating spa treatments, horseback
          riding through scenic trails to shooting sports at our Beretta
          grounds — discover endless ways to create unforgettable memories.
        </ThemedText>

        <View style={styles.experienceLinks}>
          <Pressable style={styles.experienceLink}>
            <ThemedText type="link">VIEW ALL ACTIVITIES</ThemedText>
          </Pressable>
          <Pressable style={styles.experienceLink}>
            <ThemedText type="link">VIEW RELATED ARTICLES</ThemedText>
          </Pressable>
        </View>
      </View>

      {/* Stay Section */}
      <View style={[styles.staySection, { backgroundColor: tintColor }]}>
        <ThemedText type="label" style={styles.stayLabel}>
          Accommodations
        </ThemedText>
        <ThemedText type="title" style={styles.stayTitle}>
          Your Home Away From Home
        </ThemedText>
        <ThemedText type="body" style={styles.stayDescription}>
          From historic cottages to luxurious suites, find the perfect
          retreat for your stay at Barnsley Resort.
        </ThemedText>
        <Pressable style={styles.stayButton}>
          <ThemedText style={styles.stayButtonText}>
            VIEW ACCOMMODATIONS
          </ThemedText>
        </Pressable>
      </View>

      {/* Footer spacer */}
      <View style={styles.footerSpacer} />
    </ScrollView>
  );
}

const fonts = Fonts || { serif: 'serif', sans: 'sans-serif' };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // Hero Section
  heroSection: {
    minHeight: SCREEN_HEIGHT * 0.65,
    justifyContent: 'flex-end',
    paddingBottom: Spacing.xl,
  },
  heroOverlay: {
    backgroundColor: 'rgba(27, 59, 47, 0.95)',
    marginLeft: Spacing.lg,
    marginRight: SCREEN_WIDTH * 0.35,
    padding: Spacing.xl,
    minWidth: 280,
    maxWidth: 400,
  },
  heroLabel: {
    color: '#F8F6F2',
    opacity: 0.8,
    marginBottom: Spacing.sm,
    fontSize: 11,
    letterSpacing: 2,
  },
  heroTitle: {
    color: '#F8F6F2',
    fontFamily: fonts.serif,
    fontSize: 28,
    lineHeight: 34,
    marginBottom: Spacing.md,
  },
  heroDescription: {
    color: '#F8F6F2',
    opacity: 0.9,
    fontSize: 14,
    lineHeight: 24,
    marginBottom: Spacing.lg,
  },
  heroLink: {
    marginBottom: Spacing.sm,
  },
  heroLinkText: {
    color: '#F8F6F2',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.5,
    textDecorationLine: 'underline',
  },

  // Dining Section
  diningSection: {
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  sectionTitle: {
    textAlign: 'center',
    marginBottom: Spacing.lg,
    fontFamily: fonts.serif,
    color: '#2C2C2C',
  },
  sectionDescription: {
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 600,
    marginBottom: Spacing.xl,
    color: '#2C2C2C',
  },
  ctaButton: {
    paddingBottom: 4,
  },
  ctaText: {
    color: '#2C2C2C',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.5,
    textDecorationLine: 'underline',
  },

  // Gallery Section
  gallerySection: {
    marginTop: -Spacing.xl,
    marginBottom: Spacing.xl,
  },
  galleryContent: {
    paddingHorizontal: Spacing.lg,
  },
  galleryCard: {
    width: GALLERY_IMAGE_WIDTH,
    marginRight: Spacing.md,
  },
  galleryImage: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: BorderRadius.sm,
  },

  // Experiences Section
  experiencesSection: {
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
  },
  experiencesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  experiencesLabel: {
    opacity: 0.7,
  },
  experiencesTitle: {
    marginBottom: Spacing.md,
    fontFamily: fonts.serif,
  },
  experiencesDescription: {
    lineHeight: 28,
    marginBottom: Spacing.lg,
    opacity: 0.85,
  },
  experienceLinks: {
    flexDirection: 'row',
    gap: Spacing.xl,
  },
  experienceLink: {
    paddingBottom: 4,
  },

  // Stay Section
  staySection: {
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  stayLabel: {
    color: '#F8F6F2',
    opacity: 0.8,
    marginBottom: Spacing.sm,
  },
  stayTitle: {
    color: '#F8F6F2',
    textAlign: 'center',
    marginBottom: Spacing.md,
    fontFamily: fonts.serif,
  },
  stayDescription: {
    color: '#F8F6F2',
    opacity: 0.9,
    textAlign: 'center',
    maxWidth: 320,
    marginBottom: Spacing.lg,
  },
  stayButton: {
    backgroundColor: '#F8F6F2',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.sm,
  },
  stayButtonText: {
    color: '#1B3B2F',
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 1,
  },

  footerSpacer: {
    height: 40,
  },
});
