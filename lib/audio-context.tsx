"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Track } from "@/types";

interface AudioContextValue {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  setProgress: (value: number | ((prev: number) => number)) => void;
  setVolume: (value: number) => void;
  pause: () => void;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgressState] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const setProgress = useCallback(
    (value: number | ((prev: number) => number)) => {
      setProgressState((prev) =>
        typeof value === "function" ? value(prev) : value
      );
    },
    []
  );

  const playTrack = useCallback((track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setProgress(0);
  }, [setProgress]);

  const togglePlay = useCallback(() => {
    setIsPlaying((p) => !p);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const value = useMemo(
    () => ({
      currentTrack,
      isPlaying,
      progress,
      volume,
      playTrack,
      togglePlay,
      setProgress,
      setVolume,
      pause,
    }),
    [
      currentTrack,
      isPlaying,
      progress,
      volume,
      playTrack,
      togglePlay,
      setProgress,
      pause,
    ]
  );

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>;
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}
