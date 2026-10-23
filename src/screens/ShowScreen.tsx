import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import { colors, spacing, typography } from '../ui/theme';
import { FocusableButton } from '../ui/FocusableButton';
import { SHOWS, Show } from '../data/shows';
import { useNavigation } from '../navigation/NavigationContext';
import { useViewers } from '../context/ViewerContext';
import { useTVRemote, TVKeyEvent } from '../ui/useTVRemote';
import { Viewer } from '../data/episodes';

const formatTimeMMSS = (sec: number): string => {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export const ShowScreen: React.FC = () => {
  const { params, navigate, goBack } = useNavigation();
  const {
    viewers,
    selectedEpisodeNumber,
    setSelectedEpisodeNumber,
    updateViewerEpisode,
    updateViewerMinutes,
    groupPosition,
  } = useViewers();

  const showId = params.showId || 'chrono-key';
  const show: Show = SHOWS.find((s) => s.id === showId) || SHOWS[0];

  // Active viewer in D-pad editing mode
  const [editingViewerId, setEditingViewerId] = useState<string | null>(null);

  // Focus tracking for episode rows and viewer rows
  const [focusedEpisode, setFocusedEpisode] = useState<number | null>(null);
  const [focusedViewer, setFocusedViewer] = useState<string | null>(null);

  const maxEpisodes = show.episodes.length;
  const currentEditingViewer = viewers.find((v) => v.id === editingViewerId);
  const editingEpisode =
    show.episodes.find((e) => e.episodeNumber === currentEditingViewer?.episodeNumber) ||
    show.episodes[0];
  const maxDurationSec = editingEpisode ? editingEpisode.durationSec : 3600;

  // Remote D-pad key event handler when editing a viewer
  const handleTVKeyEvent = useCallback(
    (event: TVKeyEvent) => {
      if (!editingViewerId) return;

      switch (event.key) {
        case 'left':
          // D-pad Left: decrement episode
          updateViewerEpisode(editingViewerId, -1, maxEpisodes);
          break;
        case 'right':
          // D-pad Right: increment episode
          updateViewerEpisode(editingViewerId, 1, maxEpisodes);
          break;
        case 'up':
          // D-pad Up: +1 minute step
          updateViewerMinutes(editingViewerId, 1, maxDurationSec);
          break;
        case 'down':
          // D-pad Down: -1 minute step
          updateViewerMinutes(editingViewerId, -1, maxDurationSec);
          break;
        case 'select':
        case 'back':
          // Pressing select or back commits and exits edit mode
          setEditingViewerId(null);
          break;
      }
    },
    [editingViewerId, maxEpisodes, maxDurationSec, updateViewerEpisode, updateViewerMinutes]
  );

  // Hook up hardware remote listener
  useTVRemote(handleTVKeyEvent, editingViewerId !== null);

  const handleViewerPress = (viewer: Viewer) => {
    if (editingViewerId === viewer.id) {
      setEditingViewerId(null);
    } else {
      setEditingViewerId(viewer.id);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Header Row */}
      <View style={styles.topHeader}>
        <FocusableButton
          label="◀ Back to Shows"
          onPress={() => goBack()}
          style={styles.backBtn}
        />
        <View style={styles.headerInfo}>
          <View style={styles.badgePill}>
            <Text style={styles.badgePillText}>{show.genre}</Text>
          </View>
          <Text style={styles.headerTitle}>{show.title}</Text>
        </View>
        <View style={styles.modeIndicator}>
          <Text style={styles.modeIndicatorText}>
            {editingViewerId ? '🎮 D-PAD ADJUST MODE' : '📺 10-FOOT TV VIEW'}
          </Text>
        </View>
      </View>

      {/* Main 3-Column Content Body */}
      <View style={styles.mainLayout}>
        {/* LEFT COLUMN: Show Title & Description */}
        <View style={styles.leftColumn}>
          <View style={styles.posterCard}>
            <View
              style={[
                styles.posterBanner,
                { backgroundColor: show.posterBg || '#1B3B6F' },
              ]}
            >
              <View
                style={[
                  styles.genreTag,
                  { borderColor: show.accentColor || colors.accent },
                ]}
              >
                <Text
                  style={[
                    styles.genreTagText,
                    { color: show.accentColor || colors.accent },
                  ]}
                >
                  {show.genre}
                </Text>
              </View>
              <Text style={styles.posterInitials}>{show.title.charAt(0)}</Text>
            </View>

            <View style={styles.showMeta}>
              <Text style={styles.showTitle}>{show.title}</Text>
              <Text
                style={[
                  styles.showTagline,
                  { color: show.accentColor || colors.accent },
                ]}
              >
                {show.tagline}
              </Text>
              <Text style={styles.showSynopsis}>{show.synopsis}</Text>

              <View style={styles.specsRow}>
                <View style={styles.specBadge}>
                  <Text style={styles.specText}>4K HDR</Text>
                </View>
                <View style={styles.specBadge}>
                  <Text style={styles.specText}>5.1 AUDIO</Text>
                </View>
                <View style={styles.specBadge}>
                  <Text style={styles.specText}>{show.episodes.length} EPS</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* MIDDLE COLUMN: Episode List */}
        <View style={styles.middleColumn}>
          <View style={styles.columnHeader}>
            <Text style={styles.columnTitle}>EPISODES</Text>
            <Text style={styles.columnSubtitle}>
              {show.episodes.length} available · Select to set watch target
            </Text>
          </View>

          <ScrollView
            style={styles.episodesScroll}
            showsVerticalScrollIndicator={false}
          >
            {show.episodes.map((ep, idx) => {
              const isSelected = selectedEpisodeNumber === ep.episodeNumber;
              const isFocused = focusedEpisode === ep.episodeNumber;
              const mins = Math.round(ep.durationSec / 60);

              return (
                <Pressable
                  key={ep.episodeNumber}
                  hasTVPreferredFocus={idx === 0 && !editingViewerId}
                  onFocus={() => setFocusedEpisode(ep.episodeNumber)}
                  onBlur={() => setFocusedEpisode(null)}
                  onPress={() => setSelectedEpisodeNumber(ep.episodeNumber)}
                  style={[
                    styles.episodeRow,
                    isFocused && styles.episodeRowFocused,
                    isSelected && styles.episodeRowSelected,
                  ]}
                >
                  <View style={styles.episodeNumberBadge}>
                    <Text
                      style={[
                        styles.episodeNumberText,
                        (isFocused || isSelected) && styles.episodeNumberTextActive,
                      ]}
                    >
                      EP {ep.episodeNumber}
                    </Text>
                  </View>

                  <View style={styles.episodeInfo}>
                    <View style={styles.episodeTopLine}>
                      <Text
                        style={[
                          styles.episodeTitle,
                          (isFocused || isSelected) && styles.episodeTitleActive,
                        ]}
                        numberOfLines={1}
                      >
                        {ep.title}
                      </Text>
                      {isSelected && (
                        <View style={styles.selectedPill}>
                          <Text style={styles.selectedPillText}>TARGET</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.episodeSynopsis} numberOfLines={2}>
                      {ep.synopsis}
                    </Text>
                  </View>

                  <View style={styles.episodeDuration}>
                    <Text style={styles.episodeDurationText}>{mins} min</Text>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* RIGHT COLUMN: "Who's watching" Panel */}
        <View style={styles.rightColumn}>
          <View style={styles.columnHeader}>
            <Text style={styles.columnTitle}>WHO'S WATCHING</Text>
            <Text style={styles.columnSubtitle}>
              {editingViewerId
                ? 'Use D-pad: ◀ ▶ Ep | ▲ ▼ +/-1 min'
                : 'Select viewer to adjust their progress'}
            </Text>
          </View>

          {editingViewerId && (
            <View style={styles.adjustInstructionsBar}>
              <Text style={styles.adjustInstructionsText}>
                🎮 D-PAD ACTIVE: ◀ ▶ Episode · ▲ ▼ Minutes (1-min step) · SELECT
                to save
              </Text>
            </View>
          )}

          <ScrollView
            style={styles.viewersScroll}
            showsVerticalScrollIndicator={false}
          >
            {viewers.map((viewer) => {
              const isEditing = editingViewerId === viewer.id;
              const isFocused = focusedViewer === viewer.id;
              const isEarliest =
                viewer.episodeNumber === groupPosition.episodeNumber &&
                viewer.positionSec === groupPosition.positionSec;

              const currentViewerEp =
                show.episodes.find((e) => e.episodeNumber === viewer.episodeNumber) ||
                show.episodes[0];
              const maxDur = currentViewerEp ? currentViewerEp.durationSec : 3600;

              return (
                <Pressable
                  key={viewer.id}
                  onFocus={() => setFocusedViewer(viewer.id)}
                  onBlur={() => setFocusedViewer(null)}
                  onPress={() => handleViewerPress(viewer)}
                  style={[
                    styles.viewerCard,
                    isFocused && styles.viewerCardFocused,
                    isEditing && styles.viewerCardEditing,
                  ]}
                >
                  <View style={styles.viewerCardTop}>
                    {/* Avatar */}
                    <View
                      style={[
                        styles.avatarCircle,
                        { backgroundColor: viewer.avatarColor },
                      ]}
                    >
                      <Text style={styles.avatarInitial}>
                        {viewer.name.charAt(0)}
                      </Text>
                    </View>

                    {/* Viewer Details */}
                    <View style={styles.viewerDetails}>
                      <View style={styles.viewerNameRow}>
                        <Text style={styles.viewerName}>{viewer.name}</Text>
                        {isEarliest && (
                          <View style={styles.anchorBadge}>
                            <Text style={styles.anchorBadgeText}>ANCHOR</Text>
                          </View>
                        )}
                      </View>

                      {/* E{n} · {mm:ss} format */}
                      <View style={styles.progressBadge}>
                        <Text style={styles.progressText}>
                          {`E${viewer.episodeNumber} · ${formatTimeMMSS(
                            viewer.positionSec
                          )}`}
                        </Text>
                      </View>
                    </View>

                    {/* Edit status indicator */}
                    <View style={styles.editBadgeContainer}>
                      <Text
                        style={[
                          styles.editBadgeText,
                          isEditing && styles.editBadgeTextActive,
                        ]}
                      >
                        {isEditing ? '● EDITING' : 'SELECT'}
                      </Text>
                    </View>
                  </View>

                  {/* Expanded D-pad controls while editing */}
                  {isEditing && (
                    <View style={styles.editorControlsBox}>
                      <Text style={styles.editorHelpHeader}>
                        D-PAD REMOTE CONTROLS:
                      </Text>

                      <View style={styles.editorRow}>
                        <Text style={styles.editorLabel}>Episode:</Text>
                        <Pressable
                          onPress={() =>
                            updateViewerEpisode(viewer.id, -1, maxEpisodes)
                          }
                          style={styles.microBtn}
                        >
                          <Text style={styles.microBtnText}>◀</Text>
                        </Pressable>
                        <Text style={styles.editorValue}>
                          Ep {viewer.episodeNumber} / {maxEpisodes}
                        </Text>
                        <Pressable
                          onPress={() =>
                            updateViewerEpisode(viewer.id, 1, maxEpisodes)
                          }
                          style={styles.microBtn}
                        >
                          <Text style={styles.microBtnText}>▶</Text>
                        </Pressable>
                      </View>

                      <View style={styles.editorRow}>
                        <Text style={styles.editorLabel}>Time (+/- 1m):</Text>
                        <Pressable
                          onPress={() =>
                            updateViewerMinutes(viewer.id, -1, maxDur)
                          }
                          style={styles.microBtn}
                        >
                          <Text style={styles.microBtnText}>▼ -1m</Text>
                        </Pressable>
                        <Text style={styles.editorValue}>
                          {formatTimeMMSS(viewer.positionSec)}
                        </Text>
                        <Pressable
                          onPress={() =>
                            updateViewerMinutes(viewer.id, 1, maxDur)
                          }
                          style={styles.microBtn}
                        >
                          <Text style={styles.microBtnText}>▲ +1m</Text>
                        </Pressable>
                      </View>

                      <Pressable
                        onPress={() => setEditingViewerId(null)}
                        style={styles.doneBtn}
                      >
                        <Text style={styles.doneBtnText}>
                          ✓ Done (Press SELECT)
                        </Text>
                      </Pressable>
                    </View>
                  )}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </View>

      {/* BOTTOM ACTION DOCK: Two Big Buttons */}
      <View style={styles.bottomDock}>
        <View style={styles.dockButtonWrapper}>
          <FocusableButton
            label="🛋️ Recap for the couch"
            onPress={() => navigate('Recap', { showId: show.id, mode: 'group' })}
            style={styles.couchRecapBtn}
            textStyle={styles.bigButtonText}
          />
          <Text style={styles.dockButtonHint}>
            Spoiler-safe group recap up to Ep {groupPosition.episodeNumber} ·{' '}
            {formatTimeMMSS(groupPosition.positionSec)}
          </Text>
        </View>

        <View style={styles.dockButtonWrapper}>
          <FocusableButton
            label={`▶ Watch Episode ${selectedEpisodeNumber}`}
            variant="accent"
            onPress={() =>
              navigate('Player', {
                showId: show.id,
                episodeNumber: selectedEpisodeNumber,
                positionSec: 0,
              })
            }
            style={styles.watchBtn}
            textStyle={styles.bigButtonText}
          />
          <Text style={styles.dockButtonHint}>
            Launch video player at Ep {selectedEpisodeNumber}:{' '}
            {show.episodes.find((e) => e.episodeNumber === selectedEpisodeNumber)?.title ||
              'Current'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.safeMarginHorizontal,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#1A2333',
  },
  backBtn: {
    paddingVertical: 10,
    paddingHorizontal: spacing.lg,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  badgePill: {
    backgroundColor: '#1E293B',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgePillText: {
    color: colors.accent,
    fontSize: typography.caption.fontSize,
    fontWeight: '700',
  },
  headerTitle: {
    color: colors.text,
    fontSize: typography.subtitle.fontSize,
    fontWeight: '700',
  },
  modeIndicator: {
    backgroundColor: '#131C2E',
    borderColor: '#24324D',
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 8,
  },
  modeIndicatorText: {
    color: colors.muted,
    fontSize: typography.caption.fontSize,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  mainLayout: {
    flex: 1,
    flexDirection: 'row',
    gap: spacing.lg,
  },
  /* LEFT COLUMN */
  leftColumn: {
    flex: 1.1,
    minWidth: 320,
    maxWidth: 420,
  },
  posterCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1E2638',
  },
  posterBanner: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  genreTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderWidth: 1,
  },
  genreTagText: {
    fontSize: 14,
    fontWeight: '700',
  },
  posterInitials: {
    fontSize: 64,
    fontWeight: '900',
    color: 'rgba(255, 255, 255, 0.25)',
  },
  showMeta: {
    padding: spacing.lg,
  },
  showTitle: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
    marginBottom: 4,
  },
  showTagline: {
    fontSize: typography.caption.fontSize,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  showSynopsis: {
    color: colors.textSecondary,
    fontSize: 18,
    lineHeight: 26,
    marginBottom: spacing.lg,
  },
  specsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  specBadge: {
    backgroundColor: '#1B2436',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  specText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  /* MIDDLE COLUMN */
  middleColumn: {
    flex: 1.6,
  },
  columnHeader: {
    marginBottom: spacing.sm,
  },
  columnTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1,
  },
  columnSubtitle: {
    color: colors.muted,
    fontSize: 15,
    marginTop: 2,
  },
  episodesScroll: {
    flex: 1,
  },
  episodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  episodeRowFocused: {
    borderColor: colors.accent,
    backgroundColor: colors.cardHover,
    transform: [{ scale: 1.02 }],
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  episodeRowSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#131F37',
  },
  episodeNumberBadge: {
    backgroundColor: '#1E2638',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: spacing.md,
  },
  episodeNumberText: {
    color: colors.muted,
    fontSize: 16,
    fontWeight: '700',
  },
  episodeNumberTextActive: {
    color: colors.accent,
  },
  episodeInfo: {
    flex: 1,
    marginRight: spacing.sm,
  },
  episodeTopLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: 4,
  },
  episodeTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  episodeTitleActive: {
    color: colors.text,
  },
  selectedPill: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  selectedPillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  episodeSynopsis: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  episodeDuration: {
    backgroundColor: '#0F1626',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  episodeDurationText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '600',
  },
  /* RIGHT COLUMN */
  rightColumn: {
    flex: 1.3,
    minWidth: 360,
  },
  adjustInstructionsBar: {
    backgroundColor: '#372800',
    borderColor: colors.accent,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: spacing.sm,
  },
  adjustInstructionsText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '700',
  },
  viewersScroll: {
    flex: 1,
  },
  viewerCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  viewerCardFocused: {
    borderColor: colors.accent,
    backgroundColor: colors.cardHover,
    transform: [{ scale: 1.02 }],
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  viewerCardEditing: {
    borderColor: colors.accent,
    backgroundColor: '#1D2115',
    borderWidth: 3,
  },
  viewerCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  avatarInitial: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  viewerDetails: {
    flex: 1,
  },
  viewerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  viewerName: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  anchorBadge: {
    backgroundColor: '#4C1D95',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  anchorBadgeText: {
    color: '#C4B5FD',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  progressBadge: {
    backgroundColor: '#0F1626',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  progressText: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  editBadgeContainer: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editBadgeText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  editBadgeTextActive: {
    color: colors.accent,
  },
  editorControlsBox: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#2B354D',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 8,
    padding: spacing.sm,
  },
  editorHelpHeader: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  editorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  editorLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  editorValue: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    minWidth: 90,
    textAlign: 'center',
  },
  microBtn: {
    backgroundColor: '#26334D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    minWidth: 44,
    alignItems: 'center',
  },
  microBtnText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  doneBtn: {
    backgroundColor: colors.accent,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 6,
  },
  doneBtnText: {
    color: '#0B0F1A',
    fontSize: 14,
    fontWeight: '800',
  },
  /* BOTTOM DOCK */
  bottomDock: {
    flexDirection: 'row',
    gap: spacing.xl,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#1A2333',
  },
  dockButtonWrapper: {
    flex: 1,
  },
  couchRecapBtn: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 14,
  },
  watchBtn: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 14,
  },
  bigButtonText: {
    fontSize: 24,
    fontWeight: '800',
  },
  dockButtonHint: {
    color: colors.muted,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
  },
});
