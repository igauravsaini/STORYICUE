import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../ui/theme';
import { FocusableButton } from '../ui/FocusableButton';
import { FocusableCard } from '../ui/FocusableCard';
import { SHOWS } from '../data/shows';
import { useNavigation } from '../navigation/NavigationContext';

export const PlayerScreen: React.FC = () => {
  const { params, navigate, goBack } = useNavigation();
  const showId = params.showId || 'chrono-key';
  const episodeNumber = params.episodeNumber || 1;
  const show = SHOWS.find((s) => s.id === showId) || SHOWS[0];
  const episode =
    show.episodes.find((e) => e.episodeNumber === episodeNumber) ||
    show.episodes[0];

  const [positionSec, setPositionSec] = useState<number>(params.positionSec || 480);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const durationSec = episode.durationSec || 2400;
  const progressPercent = Math.min(100, Math.round((positionSec / durationSec) * 100));

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder.toString().padStart(2, '0')}`;
  };

  const handleStep = (delta: number) => {
    setPositionSec((prev) => Math.max(0, Math.min(durationSec, prev + delta)));
  };

  return (
    <View style={styles.container}>
      {/* Top Bar with Show Title and Back */}
      <View style={styles.topBar}>
        <FocusableButton
          label="◀ Exit Player"
          onPress={() => goBack()}
          style={styles.exitBtn}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.showTitle}>{show.title}</Text>
          <Text style={styles.episodeTitle}>
            Ep {episode.episodeNumber}: {episode.title}
          </Text>
        </View>
        <View style={styles.statusPill}>
          <Text style={styles.statusText}>{isPlaying ? '● PLAYING' : '❚❚ PAUSED'}</Text>
        </View>
      </View>

      {/* Main Video Viewport Simulation */}
      <View style={styles.viewport}>
        <View style={styles.sceneMock}>
          <Text style={styles.sceneTitle}>[ 10-FOOT TV VIDEO PLAYBACK ]</Text>
          <Text style={styles.sceneDescription}>
            Current scene: {formatTime(positionSec)} of {formatTime(durationSec)}
          </Text>
          <Text style={styles.couchTip}>
            🛋️ Watching with others? Open StoryCue to get a spoiler-safe recap for everyone on the couch.
          </Text>
        </View>
      </View>

      {/* Player Controls & Scrubber */}
      <View style={styles.controlsArea}>
        {/* Progress Bar */}
        <View style={styles.progressRow}>
          <Text style={styles.timeLabel}>{formatTime(positionSec)}</Text>
          <View style={styles.progressBarTrack}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${progressPercent}%` },
              ]}
            />
          </View>
          <Text style={styles.timeLabel}>{formatTime(durationSec)}</Text>
        </View>

        {/* Buttons Row */}
        <View style={styles.buttonsRow}>
          <FocusableButton
            label="⏪ -30s"
            onPress={() => handleStep(-30)}
            style={styles.controlBtn}
          />
          <FocusableButton
            label={isPlaying ? '❚❚ Pause' : '▶ Play'}
            onPress={() => setIsPlaying((p) => !p)}
            style={styles.controlBtn}
            hasTVPreferredFocus={true}
          />
          <FocusableButton
            label="⏩ +30s"
            onPress={() => handleStep(30)}
            style={styles.controlBtn}
          />

          {/* Quick Recap Action */}
          <FocusableButton
            label="🛋️ Couch Recap"
            variant="accent"
            onPress={() =>
              navigate('Recap', {
                showId: show.id,
                episodeNumber: episode.episodeNumber,
                positionSec,
              })
            }
            style={styles.recapBtn}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05070D',
    paddingHorizontal: spacing.safeMarginHorizontal,
    paddingVertical: spacing.safeMarginVertical,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exitBtn: {
    minWidth: 160,
  },
  titleContainer: {
    alignItems: 'center',
  },
  showTitle: {
    color: colors.text,
    fontSize: typography.title.fontSize,
    fontWeight: '700',
  },
  episodeTitle: {
    color: colors.accent,
    fontSize: typography.caption.fontSize,
    fontWeight: '500',
  },
  statusPill: {
    backgroundColor: '#1E293B',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    color: colors.accent,
    fontSize: typography.caption.fontSize,
    fontWeight: '700',
  },
  viewport: {
    flex: 1,
    marginVertical: spacing.lg,
    backgroundColor: '#0F1626',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  sceneMock: {
    alignItems: 'center',
    maxWidth: 700,
  },
  sceneTitle: {
    color: colors.muted,
    fontSize: typography.caption.fontSize,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: spacing.xs,
  },
  sceneDescription: {
    color: colors.text,
    fontSize: typography.title.fontSize,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  couchTip: {
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
    textAlign: 'center',
    lineHeight: typography.body.lineHeight,
  },
  controlsArea: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.lg,
    gap: spacing.md,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  timeLabel: {
    color: colors.muted,
    fontSize: typography.caption.fontSize,
    fontWeight: '600',
    minWidth: 60,
  },
  progressBarTrack: {
    flex: 1,
    height: 10,
    backgroundColor: '#273449',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.accent,
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  controlBtn: {
    minWidth: 140,
  },
  recapBtn: {
    marginLeft: 'auto',
    minWidth: 240,
  },
});
