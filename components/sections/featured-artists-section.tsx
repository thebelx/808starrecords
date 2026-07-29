"use client";

import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, MapPin, Music } from "lucide-react";
import { useCallback } from "react";
import { ContentBadge } from "@/components/shared/content-badge";
import { LazyImage } from "@/components/shared/lazy-image";
import { SectionShell } from "@/components/shared/section-shell";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useArtists } from "@/hooks/use-artists";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { getCardHover } from "@/lib/motion";
import type { Artist } from "@/types";

export function FeaturedArtistsSection() {
  const { data: artists, isLoading } = useArtists();
  const reducedMotion = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <SectionShell
      id="artists"
      title="Featured Artists"
      subtitle="Artists publicly associated with 808STAR Records."
    >
      <div className="relative">
        <div className="mb-4 flex justify-end gap-2">
          <Button variant="outline" size="icon" onClick={scrollPrev} aria-label="Previous">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={scrollNext} aria-label="Next">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {isLoading ? (
          <div className="flex gap-4">
            <Skeleton className="h-80 w-72 shrink-0 rounded-xl" />
            <Skeleton className="h-80 w-72 shrink-0 rounded-xl" />
          </div>
        ) : (
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-4">
              {artists?.map((artist) => (
                <ArtistCard
                  key={artist.id}
                  artist={artist}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionShell>
  );
}

function ArtistCard({
  artist,
  reducedMotion,
}: {
  artist: Artist;
  reducedMotion: boolean;
}) {
  return (
    <motion.article
      {...getCardHover(reducedMotion)}
      className="group w-72 shrink-0 overflow-hidden rounded-xl border border-subtle bg-surface-elevated shadow-premium md:w-80"
    >
      <div className="relative aspect-square overflow-hidden">
        <LazyImage
          src={artist.imageUrl}
          alt={artist.name}
          fill
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3">
          <ContentBadge status={artist.contentStatus} />
        </div>
      </div>

      <div className="p-5 transition-all duration-200 group-hover:pb-7">
        <h3 className="font-display text-xl font-bold">{artist.name}</h3>
        <p className="mt-1 text-sm text-accent">{artist.role}</p>
        <p className="mt-3 line-clamp-2 text-sm text-secondary group-hover:line-clamp-none">
          {artist.bio}
        </p>

        <div className="mt-4 space-y-2 text-xs text-secondary">
          <div className="flex items-center gap-2">
            <Music className="h-3 w-3" />
            <span>{artist.latestRelease}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3" />
            <span>{artist.location}</span>
          </div>
          <p>Genre: {artist.genre}</p>
        </div>

        <div className="mt-4 flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {artist.links.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              className="rounded-full border border-subtle px-3 py-1 text-xs text-secondary hover:text-foreground"
              aria-label={`${artist.name} on ${link.platform}`}
            >
              {link.platform}
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
