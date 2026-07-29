"use client";

import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { ContentBadge } from "@/components/shared/content-badge";
import { LazyImage } from "@/components/shared/lazy-image";
import { SectionShell } from "@/components/shared/section-shell";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useDemos } from "@/hooks/use-demos";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { formatDuration } from "@/lib/utils";
import type { DemoTrack } from "@/types";

function generatePeaks(length = 100): Array<number[] | Float32Array> {
  const peaks: Array<number[] | Float32Array> = [];
  for (let i = 0; i < length; i++) {
    peaks.push([0.2 + Math.random() * 0.6 * Math.sin(i * 0.15)]);
  }
  return peaks;
}

function DemoPlayer({ track }: { track: DemoTrack }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WaveSurfer | null>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "rgba(255,255,255,0.15)",
      progressColor: "#D90429",
      cursorColor: "#F21B3F",
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
      height: 64,
      normalize: true,
      interact: true,
    });

    const peaks = generatePeaks();
    ws.load("", peaks, track.duration);
    ws.on("play", () => setPlaying(true));
    ws.on("pause", () => setPlaying(false));
    ws.on("timeupdate", (t) => setCurrentTime(t));
    ws.on("finish", () => setPlaying(false));

    wsRef.current = ws;
    return () => {
      ws.destroy();
    };
  }, [track]);

  const togglePlay = () => {
    if (!track.audioUrl) {
      wsRef.current?.playPause();
      return;
    }
    wsRef.current?.playPause();
  };

  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25 }}
      className="rounded-xl border border-subtle bg-surface-elevated p-6 shadow-premium"
    >
      <div className="mb-4 flex items-start gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
          <LazyImage src={track.artworkUrl} alt={track.title} fill />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-semibold">{track.title}</h3>
            <ContentBadge status={track.contentStatus} />
          </div>
          <p className="text-sm text-secondary">{track.artist}</p>
          <p className="mt-1 text-xs text-secondary">
            Demo audio unavailable — player preview
          </p>
        </div>
        <Button
          size="icon"
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4 ml-0.5" />
          )}
        </Button>
      </div>

      <div ref={containerRef} className="w-full" />

      <div className="mt-2 flex justify-between text-xs text-secondary">
        <span>{formatDuration(currentTime)}</span>
        <span>{formatDuration(track.duration)}</span>
      </div>
    </motion.div>
  );
}

export function DemosSection() {
  const { data: demos, isLoading } = useDemos();

  return (
    <SectionShell
      id="demos"
      title="Demos"
      subtitle="Exclusive previews — production-ready player, placeholder audio."
    >
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      ) : (
        <div className="space-y-4">
          {demos?.map((demo) => (
            <DemoPlayer key={demo.id} track={demo} />
          ))}
        </div>
      )}
    </SectionShell>
  );
}
