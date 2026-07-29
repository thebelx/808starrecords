"use client";

import { AnimatedCounter } from "@/components/shared/animated-counter";
import { ContentBadge } from "@/components/shared/content-badge";
import { SectionShell } from "@/components/shared/section-shell";
import { Skeleton } from "@/components/ui/skeleton";
import { useStatistics } from "@/hooks/use-label-data";

export function StatsSection() {
  const { data: stats, isLoading } = useStatistics();

  return (
    <SectionShell
      id="stats"
      title="Statistics"
      subtitle="Label metrics — verified counts and placeholders where data is unavailable."
    >
      {isLoading ? (
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {stats?.map((stat) => (
            <div key={stat.id} className="relative">
              <AnimatedCounter value={stat.value} label={stat.label} />
              {stat.contentStatus === "placeholder" && (
                <div className="mt-2 flex justify-center">
                  <ContentBadge status="placeholder" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </SectionShell>
  );
}
