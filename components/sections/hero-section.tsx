"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Play } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ContentBadge } from "@/components/shared/content-badge";
import { useLabelStats } from "@/hooks/use-label-data";
import { useReleases } from "@/hooks/use-releases";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useAudio } from "@/lib/audio-context";
import { getFadeUp, getStagger } from "@/lib/motion";
import { formatNumber } from "@/lib/utils";

export function HeroSection() {
  const { data: stats, isLoading } = useLabelStats();
  const { data: releases } = useReleases();
  const { playTrack } = useAudio();
  const reducedMotion = useReducedMotion();
  const [following, setFollowing] = useState(false);

  const handlePlay = () => {
    const first = releases?.[0];
    if (first) {
      playTrack({
        id: first.id,
        title: first.title,
        artist: first.artist,
        artworkUrl: first.artworkUrl,
        duration: first.duration,
        audioUrl: null,
      });
    }
  };

  return (
    <section
      id="hero"
      className="scroll-snap-section relative flex min-h-[85vh] items-end overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div
          className="hero-bg-animate absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 30% 20%, rgba(217,4,41,0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(217,4,41,0.08) 0%, transparent 40%)",
          }}
        />
        <div className="absolute inset-0 bg-[url('/placeholders/hero-texture.svg')] bg-cover bg-center opacity-20" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

      <motion.div
        variants={getStagger(reducedMotion)}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full px-6 pb-20 pt-32 md:px-10 lg:px-16 lg:pb-28"
      >
        <motion.div variants={getFadeUp(reducedMotion)} className="mb-4 flex items-center gap-2">
          <BadgeCheck className="h-5 w-5 text-accent" aria-hidden="true" />
          <span className="text-sm text-secondary">Verified Label</span>
        </motion.div>

        <motion.h1
          variants={getFadeUp(reducedMotion, 0.05)}
          className="font-display text-5xl font-bold tracking-tighter md:text-7xl lg:text-8xl"
        >
          808<span className="text-accent">STAR</span>
        </motion.h1>

        <motion.p
          variants={getFadeUp(reducedMotion, 0.1)}
          className="mt-2 text-lg text-secondary md:text-xl"
        >
          Independent Record Label
        </motion.p>
        <motion.p
          variants={getFadeUp(reducedMotion, 0.12)}
          className="text-sm text-secondary"
        >
          DMV • Est. 2025
        </motion.p>

        <motion.div
          variants={getFadeUp(reducedMotion, 0.15)}
          className="mt-8 flex flex-wrap gap-6 md:gap-10"
        >
          {isLoading ? (
            <>
              <Skeleton className="h-12 w-24" />
              <Skeleton className="h-12 w-24" />
              <Skeleton className="h-12 w-24" />
              <Skeleton className="h-12 w-24" />
            </>
          ) : (
            <>
              <StatItem
                label="Monthly Listeners"
                value={
                  stats?.monthlyListeners
                    ? formatNumber(stats.monthlyListeners)
                    : "—"
                }
                placeholder={stats?.monthlyListeners === null}
              />
              <StatItem
                label="Total Releases"
                value={stats?.totalReleases.toString() ?? "—"}
              />
              <StatItem
                label="Artists"
                value={stats?.artists.toString() ?? "—"}
              />
              <StatItem
                label="Followers"
                value={
                  stats?.followers ? formatNumber(stats.followers) : "—"
                }
                placeholder={stats?.followers === null}
              />
            </>
          )}
        </motion.div>

        <motion.div
          variants={getFadeUp(reducedMotion, 0.2)}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Button size="lg" onClick={handlePlay} className="gap-2">
            <Play className="h-5 w-5 fill-current" />
            Play
          </Button>
          <Button
            size="lg"
            variant={following ? "secondary" : "outline"}
            onClick={() => setFollowing(!following)}
          >
            {following ? "Following" : "Follow"}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

function StatItem({
  label,
  value,
  placeholder,
}: {
  label: string;
  value: string;
  placeholder?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="font-display text-2xl font-bold md:text-3xl">{value}</span>
        {placeholder && <ContentBadge status="placeholder" />}
      </div>
      <span className="text-xs text-secondary">{label}</span>
    </div>
  );
}
