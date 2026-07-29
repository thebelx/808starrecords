"use client";

import { motion } from "framer-motion";
import { ContentBadge } from "@/components/shared/content-badge";
import { SectionShell } from "@/components/shared/section-shell";
import { Skeleton } from "@/components/ui/skeleton";
import { useNews } from "@/hooks/use-news";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { getFadeUp } from "@/lib/motion";
import type { NewsItem } from "@/types";

const CATEGORY_LABELS: Record<NewsItem["category"], string> = {
  release: "New Releases",
  collaboration: "Collaborations",
  announcement: "Announcements",
  media: "Media Coverage",
};

const CATEGORY_COLORS: Record<NewsItem["category"], string> = {
  release: "bg-accent/20 text-accent",
  collaboration: "bg-purple-500/20 text-purple-400",
  announcement: "bg-blue-500/20 text-blue-400",
  media: "bg-amber-500/20 text-amber-400",
};

export function NewsSection() {
  const { data: news, isLoading } = useNews();
  const reducedMotion = useReducedMotion();

  return (
    <SectionShell
      id="news"
      title="News"
      subtitle="Official announcements and media — updated as information becomes available."
    >
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="relative space-y-0">
          <div className="absolute left-4 top-0 h-full w-px bg-border md:left-6" />
          {news?.map((item, i) => (
            <motion.article
              key={item.id}
              variants={getFadeUp(reducedMotion, i * 0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative pl-12 md:pl-16"
            >
              <div className="absolute left-2.5 top-6 h-3 w-3 rounded-full border-2 border-accent bg-background md:left-4.5" />
              <div className="mb-8 rounded-xl border border-subtle bg-surface-elevated p-6 shadow-premium transition-shadow duration-200 hover:shadow-premium-hover">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[item.category]}`}
                  >
                    {CATEGORY_LABELS[item.category]}
                  </span>
                  <ContentBadge status={item.contentStatus} />
                  {item.date && (
                    <time className="text-xs text-secondary">{item.date}</time>
                  )}
                </div>
                <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-secondary">{item.excerpt}</p>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </SectionShell>
  );
}
