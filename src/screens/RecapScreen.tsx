import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../ui/theme';
import { FocusableButton } from '../ui/FocusableButton';
import { FocusableCard } from '../ui/FocusableCard';
import { Chip } from '../ui/Chip';
import { SHOWS } from '../data/shows';
import {
  getGroupPosition,
  buildSpoilerSafeContext,
  Viewer,
} from '../data/episodes';
import { useNavigation } from '../navigation/NavigationContext';
import { useViewers } from '../context/ViewerContext';

export const RecapScreen: React.FC = () => {
  const { params, navigate, goBack } = useNavigation();
  const { viewers } = useViewers();
  const showId = params.showId || 'chrono-key';
  const show = SHOWS.find((s) => s.id === showId) || SHOWS[0];

  const [selectedViewerId, setSelectedViewerId] = useState<string>(
    params.mode === 'group' || !params.viewerId ? 'group' : params.viewerId
  );
  const [selectedQuestion, setSelectedQuestion] = useState<{
    question: string;
    answer: string;
  } | null>(null);

  const isGroup = selectedViewerId === 'group';
  const activeViewer: Viewer | undefined = viewers.find(
    (v) => v.id === selectedViewerId
  );

  // If params specified a custom position (e.g. from Player), honor it when in viewer mode
  const activePosition = isGroup
    ? getGroupPosition(viewers)
    : {
        episodeNumber: params.episodeNumber || activeViewer?.episodeNumber || 1,
        positionSec: params.positionSec !== undefined ? params.positionSec : (activeViewer?.positionSec || 0),
      };

  const context = buildSpoilerSafeContext(show.episodes, activePosition);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Header */}
      <View style={styles.topRow}>
        <FocusableButton
          label="◀ Back"
          onPress={() => goBack()}
          style={styles.backBtn}
        />
        <View style={styles.showBadge}>
          <Text style={styles.showBadgeText}>{show.title}</Text>
        </View>
        <FocusableButton
          label="❓ Ask StoryCue"
          variant="accent"
          onPress={() => navigate('Ask', { showId: show.id })}
          style={styles.askBtn}
        />
      </View>

      {/* Couch Viewers Row */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>WHO'S ON THE COUCH?</Text>
        <Text style={styles.sectionSubtitle}>
          {isGroup
            ? 'Group mode locks to EARLIEST viewer so nobody is spoiled.'
            : `Showing what ${activeViewer?.name} has watched.`}
        </Text>
      </View>

      <View style={styles.viewersRow}>
        <FocusableButton
          label="🛋️ Couch Group (Earliest)"
          variant={isGroup ? 'accent' : 'primary'}
          onPress={() => {
            setSelectedViewerId('group');
            setSelectedQuestion(null);
          }}
          hasTVPreferredFocus={true}
          style={styles.viewerBtn}
        />

        {viewers.map((viewer) => {
          const isSelected = selectedViewerId === viewer.id;
          const mins = Math.floor(viewer.positionSec / 60);
          return (
            <FocusableButton
              key={viewer.id}
              label={`${viewer.name} (Ep ${viewer.episodeNumber}:${mins}m)`}
              variant={isSelected ? 'accent' : 'primary'}
              onPress={() => {
                setSelectedViewerId(viewer.id);
                setSelectedQuestion(null);
              }}
              style={[
                styles.viewerBtn,
                isSelected && { borderColor: viewer.avatarColor },
              ]}
            />
          );
        })}
      </View>

      {/* Status Banner Card */}
      <FocusableCard style={styles.statusCard}>
        <View style={styles.statusRow}>
          <View style={styles.statusPill}>
            <Text style={styles.statusPillText}>
              {isGroup ? 'GROUP SAFETY LOCK' : 'VIEWER PROGRESS'}
            </Text>
          </View>
          <Text style={styles.statusCutoff}>{context.cutoffText}</Text>
        </View>
        <Text style={styles.statusDescription}>
          {isGroup
            ? `Earliest watcher on the couch is Kid at Episode 1, 10:00. All future scenes from Episode 2 and 3 are hidden.`
            : `Showing only events up to what ${activeViewer?.name} has watched.`}
        </Text>
      </FocusableCard>

      {/* Events Timeline */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          SAFE RECAP TIMELINE ({context.allowedEvents.length} SCENES)
        </Text>
      </View>

      <View style={styles.eventsGrid}>
        {context.allowedEvents.map((event) => (
          <FocusableCard key={event.id} style={styles.eventCard}>
            <Text style={styles.eventTime}>
              Episode {event.id.charAt(1)} • {Math.floor(event.timestampSec / 60)}:
              {(event.timestampSec % 60).toString().padStart(2, '0')}
            </Text>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventSummary}>{event.summary}</Text>
            <View style={styles.charactersRow}>
              {event.charactersInvolved.map((char) => (
                <View key={char} style={styles.charBadge}>
                  <Text style={styles.charText}>{char}</Text>
                </View>
              ))}
            </View>
          </FocusableCard>
        ))}
      </View>

      {/* Question suggestions */}
      {context.suggestedQuestions.length > 0 && (
        <View style={styles.questionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>QUICK QUESTIONS</Text>
            <Text style={styles.sectionSubtitle}>
              Select to see spoiler-safe answers
            </Text>
          </View>

          <View style={styles.chipsRow}>
            {context.suggestedQuestions.map((q, idx) => (
              <Chip
                key={idx}
                label={q.question}
                onPress={() => setSelectedQuestion(q)}
                style={styles.chip}
              />
            ))}
          </View>

          {selectedQuestion && (
            <FocusableCard style={styles.answerCard}>
              <Text style={styles.answerQuestion}>{selectedQuestion.question}</Text>
              <Text style={styles.answerText}>{selectedQuestion.answer}</Text>
            </FocusableCard>
          )}
        </View>
      )}
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
  showBadge: {
    backgroundColor: '#1E293B',
    paddingHorizontal: spacing.lg,
    paddingVertical: 8,
    borderRadius: 8,
  },
  showBadgeText: {
    color: colors.text,
    fontSize: typography.subtitle.fontSize,
    fontWeight: '700',
  },
  askBtn: {
    minWidth: 200,
  },
  sectionHeader: {
    marginVertical: spacing.md,
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
  viewersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  viewerBtn: {
    minWidth: 220,
  },
  statusCard: {
    backgroundColor: '#162032',
    borderColor: '#24324D',
    marginBottom: spacing.xl,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xs,
  },
  statusPill: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusPillText: {
    color: '#0B0F1A',
    fontWeight: '800',
    fontSize: 16,
  },
  statusCutoff: {
    color: colors.text,
    fontSize: typography.title.fontSize,
    fontWeight: '700',
  },
  statusDescription: {
    color: colors.muted,
    fontSize: typography.body.fontSize,
    marginTop: spacing.xs,
  },
  eventsGrid: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  eventCard: {
    backgroundColor: colors.card,
  },
  eventTime: {
    color: colors.accent,
    fontSize: typography.caption.fontSize,
    fontWeight: '700',
    marginBottom: 4,
  },
  eventTitle: {
    color: colors.text,
    fontSize: typography.title.fontSize,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  eventSummary: {
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    marginBottom: spacing.sm,
  },
  charactersRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    flexWrap: 'wrap',
  },
  charBadge: {
    backgroundColor: '#20293D',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  charText: {
    color: colors.muted,
    fontSize: 18,
  },
  questionsSection: {
    marginTop: spacing.md,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  chip: {
    marginBottom: spacing.xs,
  },
  answerCard: {
    backgroundColor: '#182438',
    borderColor: colors.accent,
    borderWidth: 2,
  },
  answerQuestion: {
    color: colors.accent,
    fontSize: typography.subtitle.fontSize,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  answerText: {
    color: colors.text,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
  },
});
