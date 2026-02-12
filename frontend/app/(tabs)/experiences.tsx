import { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Colors, Spacing, BorderRadius, Fonts } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = Math.min(SCREEN_WIDTH * 0.75, 400); // Cap max width for web
const CARD_SPACING = Spacing.md;

// Sample experiences data
const experiences = [
  {
    id: '1',
    title: 'Beretta Shooting Grounds',
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600',
  },
  {
    id: '2',
    title: 'Horseback Riding',
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600',
  },
  {
    id: '3',
    title: 'Golf Course',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600',
  },
  {
    id: '4',
    title: 'Spa & Wellness',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600',
  },
  {
    id: '5',
    title: 'Fine Dining',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600',
  },
];

type Experience = typeof experiences[0];

export default function ExperiencesScreen() {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const accentColor = useThemeColor({}, 'accent');

  const scrollToIndex = (index: number) => {
    if (index >= 0 && index < experiences.length) {
      flatListRef.current?.scrollToIndex({
        index,
        animated: true,
      });
      setCurrentIndex(index);
    }
  };

  const handlePrevious = () => {
    scrollToIndex(currentIndex - 1);
  };

  const handleNext = () => {
    scrollToIndex(currentIndex + 1);
  };

  const renderExperienceCard = ({ item }: { item: Experience }) => (
    <Pressable style={styles.card}>
      <Image
        source={{ uri: item.image }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <ThemedText type="subtitle" style={styles.cardTitle}>
        {item.title}
      </ThemedText>
    </Pressable>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor }]}
      contentContainerStyle={styles.content}
    >
      {/* Bird Logo */}
      <View style={styles.logoContainer}>
        <IconSymbol
          name="bird.fill"
          size={40}
          color={tintColor}
        />
      </View>

      {/* Header Section */}
      <ThemedView style={styles.header}>
        <ThemedText type="label" style={styles.labelText}>
          Experiences
        </ThemedText>
        <ThemedText type="title" style={styles.titleText}>
          Experience Joy & Discovery
        </ThemedText>
      </ThemedView>

      {/* Action Links */}
      <View style={styles.linksContainer}>
        <Pressable style={styles.linkButton}>
          <ThemedText type="link" style={{ color: textColor }}>
            VIEW ALL ACTIVITIES
          </ThemedText>
        </Pressable>
        <Pressable style={styles.linkButton}>
          <ThemedText type="link" style={{ color: textColor }}>
            VIEW RELATED ARTICLES
          </ThemedText>
        </Pressable>
      </View>

      {/* Carousel Section */}
      <View style={styles.carouselContainer}>
        {/* Navigation Arrows */}
        <Pressable
          style={[
            styles.navButton,
            styles.navButtonLeft,
            { backgroundColor: accentColor },
            currentIndex === 0 && styles.navButtonDisabled,
          ]}
          onPress={handlePrevious}
          disabled={currentIndex === 0}
        >
          <IconSymbol name="chevron.left" size={20} color="#fff" />
        </Pressable>

        <Pressable
          style={[
            styles.navButton,
            styles.navButtonRight,
            { backgroundColor: accentColor },
            currentIndex === experiences.length - 1 && styles.navButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={currentIndex === experiences.length - 1}
        >
          <IconSymbol name="chevron.right" size={20} color="#fff" />
        </Pressable>

        {/* Experience Cards */}
        <FlatList
          ref={flatListRef}
          data={experiences}
          renderItem={renderExperienceCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + CARD_SPACING}
          decelerationRate="fast"
          contentContainerStyle={styles.carouselContent}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(
              event.nativeEvent.contentOffset.x / (CARD_WIDTH + CARD_SPACING)
            );
            setCurrentIndex(newIndex);
          }}
        />
      </View>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {experiences.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              {
                backgroundColor:
                  index === currentIndex ? tintColor : '#D0CCC4',
              },
            ]}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const fonts = Fonts || { serif: 'serif', sans: 'sans-serif' };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  logoContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  labelText: {
    marginBottom: Spacing.sm,
    opacity: 0.7,
  },
  titleText: {
    fontFamily: fonts.serif,
  },
  linksContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  linkButton: {
    paddingBottom: 4,
  },
  carouselContainer: {
    position: 'relative',
    marginBottom: Spacing.lg,
  },
  carouselContent: {
    paddingHorizontal: Spacing.lg,
  },
  card: {
    width: CARD_WIDTH,
    marginRight: CARD_SPACING,
  },
  cardImage: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.md,
  },
  cardTitle: {
    fontFamily: fonts.serif,
    fontSize: 20,
  },
  navButton: {
    position: 'absolute',
    top: '35%',
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  navButtonLeft: {
    left: Spacing.sm,
  },
  navButtonRight: {
    right: Spacing.sm,
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
