"use client";

import { motion } from "framer-motion";
import { ContentBadge } from "@/components/shared/content-badge";
import { SectionShell } from "@/components/shared/section-shell";
import { Skeleton } from "@/components/ui/skeleton";
import { useTimeline } from "@/hooks/use-label-data";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { getFadeUp } from "@/lib/motion";
import type { TimelineEvent } from "@/types";

export function TimelineSection() {
  const { data: events, isLoading } = useTimeline();
  const reducedMotion = useReducedMotion();

  const years = events
    ? [...new Set(events.map((e) => e.year))].sort()
    : [];

  return (
    <SectionShell
      id="timeline"
      title="Label Timeline"
      subtitle="The 808STAR journey — past, present, and upcoming."
      className="bg-surface"
    >
      {isLoading ? (
        <Skeleton className="h-96 w-full rounded-xl" />
      ) : (
        <div className="space-y-12">
          {years.map((year) => (
            <div key={year}>
              <h3 className="mb-6 font-display text-2xl font-bold text-accent">
                {year}
              </h3>
              <div className="relative space-y-0 pl-8">
                <div className="absolute left-3 top-0 h-full w-px bg-border" />
                {events
                  ?.filter((e) => e.year === year)
                  .map((event, i) => (
                    <TimelineItem
                      key={event.id}
                      event={event}
                      index={i}
                      reducedMotion={reducedMotion}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionShell>
  );
}

function TimelineItem({
  event,
  index,
  reducedMotion,
}: {
  event: TimelineEvent;
  index: number;
  reducedMotion: boolean;
}) {
  const isUpcoming = event.status === "upcoming";

  return (
    <motion.div
      variants={getFadeUp(reducedMotion, index * 0.05)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative pb-8"
    >
      <div
        className={`absolute -left-5 top-1.5 h-3 w-3 rounded-full border-2 ${
          isUpcoming
            ? "border-dashed border-secondary bg-transparent"
            : "border-accent bg-accent"
        }`}
      />
      <div
        className={`rounded-xl border p-5 ${
          isUpcoming
            ? "border-dashed border-subtle bg-surface/50"
            : "border-subtle bg-surface-elevated shadow-premium"
        }`}
      >
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <h4 className="font-display font-semibold">{event.title}</h4>
          <ContentBadge status={event.contentStatus} />
          {isUpcoming && (
            <span className="rounded-full bg-surface px-2 py-0.5 text-xs text-secondary">
              Upcoming
            </span>
          )}
        </div>
        <p className="text-sm text-secondary">{event.description}</p>
      </div>
    </motion.div>
  );
}
