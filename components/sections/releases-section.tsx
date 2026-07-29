"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { ContentBadge } from "@/components/shared/content-badge";
import { LazyImage } from "@/components/shared/lazy-image";
import { SectionShell } from "@/components/shared/section-shell";
import { Skeleton } from "@/components/ui/skeleton";
import { useReleases } from "@/hooks/use-releases";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useAudio } from "@/lib/audio-context";
import { getCardHover } from "@/lib/motion";
import { formatDuration } from "@/lib/utils";
import type { Release } from "@/types";

export function ReleasesSection() {
  const { data: releases, isLoading } = useReleases();

  return (
    <SectionShell
      id="releases"
      title="Latest Releases"
      subtitle="From the 808STAR catalog."
      className="bg-surface"
    >
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {releases?.map((release) => (
            <ReleaseCard key={release.id} release={release} />
          ))}
        </div>
      )}
    </SectionShell>
  );
}

function ReleaseCard({ release }: { release: Release }) {
  const reducedMotion = useReducedMotion();
  const { playTrack } = useAudio();

  const handlePlay = () => {
    playTrack({
      id: release.id,
      title: release.title,
      artist: release.artist,
      artworkUrl: release.artworkUrl,
      duration: release.duration,
      audioUrl: null,
    });
  };

  return (
    <motion.div
      {...getCardHover(reducedMotion)}
      className="group cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl border border-subtle bg-surface-elevated shadow-premium">
        <LazyImage src={release.artworkUrl} alt={release.title} fill />
        <div className="absolute right-2 top-2">
          <ContentBadge status={release.contentStatus} />
        </div>
        <button
          onClick={handlePlay}
          aria-label={`Play ${release.title}`}
          className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/40 group-hover:opacity-100"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent shadow-premium">
            <Play className="h-5 w-5 fill-white text-white" />
          </span>
        </button>
      </div>
      <div className="mt-3">
        <h3 className="truncate font-medium">{release.title}</h3>
        <p className="truncate text-sm text-secondary">{release.artist}</p>
        <div className="mt-1 flex items-center gap-2 text-xs text-secondary">
          {release.releaseDate && (
            <span>{new Date(release.releaseDate).getFullYear()}</span>
          )}
          <span>·</span>
          <span>
            {release.trackCount} track{release.trackCount !== 1 ? "s" : ""}
          </span>
          {release.duration && (
            <>
              <span>·</span>
              <span>{formatDuration(release.duration)}</span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
