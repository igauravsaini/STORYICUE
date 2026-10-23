import React, { createContext, useContext, useState, useCallback } from 'react';
import { Viewer, sampleViewers, getGroupPosition, ViewerPosition } from '../data/episodes';

export interface ViewerContextType {
  viewers: Viewer[];
  selectedEpisodeNumber: number;
  setSelectedEpisodeNumber: (ep: number) => void;
  updateViewerEpisode: (viewerId: string, deltaEpisode: number, maxEpisodes?: number) => void;
  updateViewerMinutes: (viewerId: string, deltaMinutes: number, maxDurationSec?: number) => void;
  setViewerProgress: (viewerId: string, episodeNumber: number, positionSec: number) => void;
  groupPosition: ViewerPosition;
}

const ViewerContext = createContext<ViewerContextType | undefined>(undefined);

export const ViewerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewers, setViewers] = useState<Viewer[]>(sampleViewers);
  const [selectedEpisodeNumber, setSelectedEpisodeNumber] = useState<number>(1);

  const updateViewerEpisode = useCallback(
    (viewerId: string, deltaEpisode: number, maxEpisodes: number = 3) => {
      setViewers((prev) =>
        prev.map((v) => {
          if (v.id !== viewerId) return v;
          const newEp = Math.max(1, Math.min(maxEpisodes, v.episodeNumber + deltaEpisode));
          return {
            ...v,
            episodeNumber: newEp,
            // Keep position or clamp if needed
            positionSec: Math.max(0, v.positionSec),
          };
        })
      );
    },
    []
  );

  const updateViewerMinutes = useCallback(
    (viewerId: string, deltaMinutes: number, maxDurationSec: number = 3600) => {
      setViewers((prev) =>
        prev.map((v) => {
          if (v.id !== viewerId) return v;
          const deltaSec = deltaMinutes * 60;
          const newPos = Math.max(0, Math.min(maxDurationSec, v.positionSec + deltaSec));
          return {
            ...v,
            positionSec: newPos,
          };
        })
      );
    },
    []
  );

  const setViewerProgress = useCallback(
    (viewerId: string, episodeNumber: number, positionSec: number) => {
      setViewers((prev) =>
        prev.map((v) => {
          if (v.id !== viewerId) return v;
          return {
            ...v,
            episodeNumber,
            positionSec: Math.max(0, positionSec),
          };
        })
      );
    },
    []
  );

  const groupPosition = getGroupPosition(viewers);

  return (
    <ViewerContext.Provider
      value={{
        viewers,
        selectedEpisodeNumber,
        setSelectedEpisodeNumber,
        updateViewerEpisode,
        updateViewerMinutes,
        setViewerProgress,
        groupPosition,
      }}
    >
      {children}
    </ViewerContext.Provider>
  );
};

export const useViewers = (): ViewerContextType => {
  const context = useContext(ViewerContext);
  if (!context) {
    throw new Error('useViewers must be used within a ViewerProvider');
  }
  return context;
};
