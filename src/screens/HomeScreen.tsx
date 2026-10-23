import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import { colors, spacing, typography } from '../ui/theme';
import { FocusableCard } from '../ui/FocusableCard';
import { SHOWS, Show } from '../data/shows';
import { useNavigation } from '../navigation/NavigationContext';

export const HomeScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const handleSelectShow = (show: Show) => {
    navigate('Show', { showId: show.id });
  };

  return (
    <View style={styles.container}>
      {/* Top-Left StoryCue Logo & Tagline */}
      <View style={styles.header}>
        <View style={styles.logoBadge}>
          <Text style={styles.badgeText}>SPOILER-FREE TV</Text>
        </View>
        <Text style={styles.logoTitle}>StoryCue</Text>
        <Text style={styles.tagline}>Recap for the whole couch</Text>
      </View>

      {/* Main Show Carousel Section */}
      <View style={styles.carouselSection}>
        <Text style={styles.sectionTitle}>SELECT A SHOW TO WATCH OR RECAP</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.rowContainer}
        >
          {SHOWS.map((show, index) => (
            <FocusableCard
              key={show.id}
              onPress={() => handleSelectShow(show)}
              hasTVPreferredFocus={index === 0}
              style={styles.showCard}
              accessibilityLabel={`Select ${show.title}`}
            >
              {/* Poster with fallback colored placeholder */}
              <View
                style={[
                  styles.posterPlaceholder,
                  { backgroundColor: show.posterBg },
                ]}
              >
                {show.posterUri ? (
                  <Image
                    source={{ uri: show.posterUri }}
                    style={styles.posterImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.placeholderContent}>
                    <View
                      style={[
                        styles.genrePill,
                        { borderColor: show.accentColor },
                      ]}
                    >
                      <Text
                        style={[styles.genreText, { color: show.accentColor }]}
                      >
                        {show.genre}
                      </Text>
                    </View>
                    <Text style={styles.placeholderInitials}>
                      {show.title.charAt(0)}
                    </Text>
                  </View>
                )}
              </View>

              {/* Show Details */}
              <View style={styles.showInfo}>
                <Text style={styles.showTitle} numberOfLines={1}>
                  {show.title}
                </Text>
                <Text style={styles.showTagline} numberOfLines={1}>
                  {show.tagline}
                </Text>
                <Text style={styles.episodesCount}>
                  {show.episodes.length} Episodes Available
                </Text>
              </View>
            </FocusableCard>
          ))}
        </ScrollView>
      </View>

      {/* TV D-Pad Remote Hint */}
      <View style={styles.remoteHintRow}>
        <Text style={styles.remoteHint}>
          💡 Use Remote D-pad (◀ ▶) to navigate shows • Press SELECT to open
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.safeMarginHorizontal,
    paddingVertical: spacing.safeMarginVertical,
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: spacing.lg,
  },
  logoBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: spacing.xs,
  },
  badgeText: {
    color: '#0B0F1A',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 1.5,
  },
  logoTitle: {
    color: colors.text,
    fontSize: typography.hero.fontSize,
    lineHeight: typography.hero.lineHeight,
    fontWeight: typography.hero.fontWeight,
  },
  tagline: {
    color: colors.muted,
    fontSize: typography.subtitle.fontSize,
    lineHeight: typography.subtitle.lineHeight,
    marginTop: 4,
  },
  carouselSection: {
    flex: 1,
    justifyContent: 'center',
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: typography.subtitle.fontSize,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: spacing.lg,
  },
  rowContainer: {
    paddingVertical: spacing.md,
    gap: spacing.xl,
    alignItems: 'center',
  },
  showCard: {
    width: 320,
    height: 440,
    padding: 0,
    overflow: 'hidden',
  },
  posterPlaceholder: {
    width: '100%',
    height: 290,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
  },
  posterImage: {
    width: '100%',
    height: '100%',
  },
  placeholderContent: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '80%',
    paddingVertical: spacing.sm,
  },
  genrePill: {
    borderWidth: 1.5,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 999,
  },
  genreText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  placeholderInitials: {
    color: 'rgba(255, 255, 255, 0.35)',
    fontSize: 96,
    fontWeight: '900',
  },
  showInfo: {
    padding: spacing.md,
    backgroundColor: colors.card,
    height: 150,
    justifyContent: 'center',
  },
  showTitle: {
    color: colors.text,
    fontSize: typography.title.fontSize,
    lineHeight: typography.title.lineHeight,
    fontWeight: '700',
    marginBottom: 4,
  },
  showTagline: {
    color: colors.muted,
    fontSize: typography.caption.fontSize,
    lineHeight: typography.caption.lineHeight,
    marginBottom: spacing.xs,
  },
  episodesCount: {
    color: colors.accent,
    fontSize: 18,
    fontWeight: '600',
  },
  remoteHintRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  remoteHint: {
    color: colors.muted,
    fontSize: typography.caption.fontSize,
    textAlign: 'center',
  },
});
