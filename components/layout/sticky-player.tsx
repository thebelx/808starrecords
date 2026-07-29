"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useEffect } from "react";
import { LazyImage } from "@/components/shared/lazy-image";
import { useAudio } from "@/lib/audio-context";
import { formatDuration } from "@/lib/utils";

export function StickyPlayer() {
  const {
    currentTrack,
    isPlaying,
    progress,
    volume,
    togglePlay,
    setProgress,
    setVolume,
  } = useAudio();

  useEffect(() => {
    if (!isPlaying || !currentTrack?.duration) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + 1;
        if (currentTrack.duration && next >= currentTrack.duration) {
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack, setProgress]);

  const duration = currentTrack?.duration ?? 0;
  const progressPercent = duration ? (progress / duration) * 100 : 0;

  return (
    <AnimatePresence>
      {currentTrack && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-subtle bg-surface/95 shadow-premium lg:left-56 xl:left-60"
          role="region"
          aria-label="Music player"
        >
          <div className="mx-auto flex max-w-screen-2xl items-center gap-4 px-4 py-3 md:px-6">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
              <LazyImage
                src={currentTrack.artworkUrl}
                alt={currentTrack.title}
                fill
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{currentTrack.title}</p>
              <p className="truncate text-xs text-secondary">
                {currentTrack.artist}
              </p>
            </div>

            <div className="hidden flex-1 flex-col items-center gap-1 md:flex">
              <div className="flex items-center gap-4">
                <button aria-label="Previous" className="text-secondary hover:text-foreground">
                  <SkipBack className="h-4 w-4" />
                </button>
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white hover:bg-accent-hover"
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4 ml-0.5" />
                  )}
                </button>
                <button aria-label="Next" className="text-secondary hover:text-foreground">
                  <SkipForward className="h-4 w-4" />
                </button>
              </div>
              <div className="flex w-full max-w-md items-center gap-2">
                <span className="text-xs text-secondary">
                  {formatDuration(progress)}
                </span>
                <div className="relative h-1 flex-1 rounded-full bg-surface-elevated">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-accent transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-xs text-secondary">
                  {formatDuration(duration)}
                </span>
              </div>
            </div>

            <div className="hidden items-center gap-2 lg:flex">
              <Volume2 className="h-4 w-4 text-secondary" />
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                aria-label="Volume"
                className="w-20 accent-accent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
