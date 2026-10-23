import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../ui/theme';
import { FocusableButton } from '../ui/FocusableButton';
import { FocusableCard } from '../ui/FocusableCard';
import { Chip } from '../ui/Chip';
import { SHOWS } from '../data/shows';
import {
  sampleViewers,
  getGroupPosition,
  buildSpoilerSafeContext,
} from '../data/episodes';
import { useNavigation } from '../navigation/NavigationContext';

export const AskScreen: React.FC = () => {
  const { params, goBack } = useNavigation();
  const showId = params.showId || 'chrono-key';
  const show = SHOWS.find((s) => s.id === showId) || SHOWS[0];

  // Group position ensures no spoilers for anyone on the couch
  const groupPos = getGroupPosition(sampleViewers);
  const context = buildSpoilerSafeContext(show.episodes, groupPos);

  const [activeQuestion, setActiveQuestion] = useState<{
    question: string;
    answer: string;
  }>(
    context.suggestedQuestions[0] || {
      question: 'Who is the main character?',
      answer: 'Maya is the lead archaeologist exploring the secret vault.',
    }
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Header */}
      <View style={styles.topRow}>
        <FocusableButton
          label="◀ Back"
          onPress={() => goBack()}
          style={styles.backBtn}
        />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>SPOILER GUARD ACTIVE</Text>
        </View>
      </View>

      {/* Screen Title */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>Ask StoryCue</Text>
        <Text style={styles.subtitle}>
          Instant answers locked to {context.cutoffText} (Couch Earliest).
        </Text>
      </View>

      {/* Answer Spotlight Card */}
      <FocusableCard style={styles.spotlightCard}>
        <Text style={styles.questionLabel}>QUESTION:</Text>
        <Text style={styles.questionText}>{activeQuestion.question}</Text>

        <View style={styles.divider} />

        <Text style={styles.answerLabel}>STORYCUE 1-2 SENTENCE RECAP:</Text>
        <Text style={styles.answerText}>{activeQuestion.answer}</Text>

        <View style={styles.safeNotice}>
          <Text style={styles.safeNoticeText}>
            🔒 Verified safe for Kid, Mom, and Dad on the couch.
          </Text>
        </View>
      </FocusableCard>

      {/* Suggested Questions Grid */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>SELECT A QUESTION</Text>
        <Text style={styles.sectionSubtitle}>
          Use D-pad remote to explore common plot queries
        </Text>
      </View>

      <View style={styles.chipsContainer}>
        {context.suggestedQuestions.map((q, idx) => (
          <Chip
            key={idx}
            label={q.question}
            hasTVPreferredFocus={idx === 0}
            onPress={() => setActiveQuestion(q)}
            style={styles.chip}
          />
        ))}
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
    minWidth: 140,
  },
  badge: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    color: '#0B0F1A',
    fontSize: typography.caption.fontSize,
    fontWeight: '800',
  },
  titleSection: {
    marginBottom: spacing.xl,
  },
  title: {
    color: colors.text,
    fontSize: typography.hero.fontSize,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.muted,
    fontSize: typography.body.fontSize,
    marginTop: 4,
  },
  spotlightCard: {
    backgroundColor: '#151D2F',
    borderColor: colors.accent,
    borderWidth: 2,
    marginBottom: spacing.xxl,
    padding: spacing.xl,
  },
  questionLabel: {
    color: colors.accent,
    fontSize: typography.caption.fontSize,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  questionText: {
    color: colors.text,
    fontSize: typography.title.fontSize,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: '#273449',
    marginVertical: spacing.md,
  },
  answerLabel: {
    color: colors.muted,
    fontSize: typography.caption.fontSize,
    fontWeight: '700',
    letterSpacing: 1,
  },
  answerText: {
    color: '#FFFFFF',
    fontSize: typography.title.fontSize,
    lineHeight: 40,
    fontWeight: '500',
    marginTop: 6,
    marginBottom: spacing.lg,
  },
  safeNotice: {
    backgroundColor: '#0D1424',
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  safeNoticeText: {
    color: colors.accent,
    fontSize: typography.caption.fontSize,
    fontWeight: '600',
  },
  sectionHeader: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: typography.subtitle.fontSize,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  sectionSubtitle: {
    color: colors.muted,
    fontSize: typography.caption.fontSize,
    marginTop: 4,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  chip: {
    marginBottom: spacing.sm,
  },
});
