"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { ContentBadge } from "@/components/shared/content-badge";
import { LazyImage } from "@/components/shared/lazy-image";
import { SectionShell } from "@/components/shared/section-shell";
import { Skeleton } from "@/components/ui/skeleton";
import { useGallery } from "@/hooks/use-gallery";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { getCardHover } from "@/lib/motion";
import type { GalleryItem } from "@/types";

export function GallerySection() {
  const { data: items, isLoading } = useGallery();
  const reducedMotion = useReducedMotion();

  return (
    <SectionShell
      id="gallery"
      title="Media Gallery"
      subtitle="Photos, artwork, performances, and studio sessions."
      className="bg-surface"
    >
      {isLoading ? (
        <div className="masonry-columns">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className="masonry-item h-48 w-full rounded-xl"
            />
          ))}
        </div>
      ) : (
        <div className="masonry-columns">
          {items?.map((item) => (
            <GalleryTile
              key={item.id}
              item={item}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      )}
    </SectionShell>
  );
}

function GalleryTile({
  item,
  reducedMotion,
}: {
  item: GalleryItem;
  reducedMotion: boolean;
}) {
  const heights: Record<GalleryItem["type"], string> = {
    photo: "h-56",
    artwork: "h-64",
    performance: "h-72",
    studio: "h-52",
    video: "h-60",
  };

  return (
    <motion.div
      {...getCardHover(reducedMotion)}
      className={`masonry-item group relative overflow-hidden rounded-xl border border-subtle ${heights[item.type]}`}
    >
      <LazyImage src={item.imageUrl} alt={item.title} fill />
      {item.type === "video" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60">
            <Play className="h-5 w-5 fill-white text-white" />
          </span>
        </div>
      )}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <ContentBadge status={item.contentStatus} className="mb-2 w-fit" />
        <h3 className="font-medium">{item.title}</h3>
        <p className="text-xs text-secondary">{item.caption}</p>
        <span className="mt-1 text-xs capitalize text-accent">{item.type}</span>
      </div>
    </motion.div>
  );
}
