import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../ui/theme';
import { FocusableButton } from '../ui/FocusableButton';
import { FocusableCard } from '../ui/FocusableCard';
import { SHOWS } from '../data/shows';
import { useNavigation } from '../navigation/NavigationContext';

export const ShowScreen: React.FC = () => {
  const { params, navigate, goBack } = useNavigation();
  const showId = params.showId || 'chrono-key';
  const show = SHOWS.find((s) => s.id === showId) || SHOWS[0];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header with back button */}
      <View style={styles.topRow}>
        <FocusableButton
          label="◀ Back to Shows"
          onPress={() => goBack()}
          style={styles.backBtn}
        />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{show.genre}</Text>
        </View>
      </View>

      {/* Show Title & Synopsis */}
      <View style={styles.heroSection}>
        <Text style={styles.title}>{show.title}</Text>
        <Text style={styles.tagline}>{show.tagline}</Text>
        <Text style={styles.synopsis}>{show.synopsis}</Text>
      </View>

      {/* TV Actions Row */}
      <View style={styles.actionsRow}>
        <FocusableButton
          label="▶ Start Player"
          variant="accent"
          hasTVPreferredFocus={true}
          onPress={() => navigate('Player', { showId: show.id, episodeNumber: 1 })}
          style={styles.actionBtn}
        />
        <FocusableButton
          label="🛋️ Couch Recap"
          onPress={() => navigate('Recap', { showId: show.id })}
          style={styles.actionBtn}
        />
        <FocusableButton
          label="❓ Ask Questions"
          onPress={() => navigate('Ask', { showId: show.id })}
          style={styles.actionBtn}
        />
      </View>

      {/* Episodes List */}
      <View style={styles.episodesSection}>
        <Text style={styles.sectionHeading}>EPISODES</Text>
        <View style={styles.episodesList}>
          {show.episodes.map((ep) => (
            <FocusableCard
              key={ep.episodeNumber}
              style={styles.episodeCard}
              onPress={() =>
                navigate('Player', {
                  showId: show.id,
                  episodeNumber: ep.episodeNumber,
                })
              }
            >
              <View style={styles.episodeRow}>
                <View style={styles.episodeNumberBadge}>
                  <Text style={styles.episodeNumberText}>
                    EP {ep.episodeNumber}
                  </Text>
                </View>
                <View style={styles.episodeDetails}>
                  <Text style={styles.episodeTitle}>{ep.title}</Text>
                  <Text style={styles.episodeSynopsis}>{ep.synopsis}</Text>
                </View>
                <Text style={styles.episodeDuration}>
                  {Math.round(ep.durationSec / 60)} min
                </Text>
              </View>
            </FocusableCard>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.safeMarginHorizontal,
    paddingVertical: spacing.safeMarginVertical,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  backBtn: {
    alignSelf: 'flex-start',
  },
  badge: {
    backgroundColor: '#1E293B',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    color: colors.accent,
    fontSize: typography.caption.fontSize,
    fontWeight: '700',
  },
  heroSection: {
    marginBottom: spacing.xl,
  },
  title: {
    color: colors.text,
    fontSize: typography.hero.fontSize,
    lineHeight: typography.hero.lineHeight,
    fontWeight: '800',
  },
  tagline: {
    color: colors.accent,
    fontSize: typography.subtitle.fontSize,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: spacing.sm,
  },
  synopsis: {
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    maxWidth: 900,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.xxl,
  },
  actionBtn: {
    minWidth: 240,
  },
  episodesSection: {
    marginTop: spacing.md,
  },
  sectionHeading: {
    color: colors.textSecondary,
    fontSize: typography.subtitle.fontSize,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: spacing.md,
  },
  episodesList: {
    gap: spacing.md,
  },
  episodeCard: {
    backgroundColor: colors.card,
  },
  episodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  episodeNumberBadge: {
    backgroundColor: '#1E2638',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  episodeNumberText: {
    color: colors.accent,
    fontSize: typography.subtitle.fontSize,
    fontWeight: '700',
  },
  episodeDetails: {
    flex: 1,
  },
  episodeTitle: {
    color: colors.text,
    fontSize: typography.title.fontSize,
    fontWeight: '600',
    marginBottom: 4,
  },
  episodeSynopsis: {
    color: colors.muted,
    fontSize: typography.caption.fontSize,
  },
  episodeDuration: {
    color: colors.muted,
    fontSize: typography.caption.fontSize,
  },
});
