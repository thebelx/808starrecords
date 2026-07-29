"use client";

import { motion } from "framer-motion";
import { ContentBadge } from "@/components/shared/content-badge";
import { SectionShell } from "@/components/shared/section-shell";
import { Skeleton } from "@/components/ui/skeleton";
import { useMembers } from "@/hooks/use-label-data";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { getFadeUp } from "@/lib/motion";
import type { Member } from "@/types";

export function MembersSection() {
  const { data: members, isLoading } = useMembers();
  const reducedMotion = useReducedMotion();

  const known = members?.filter((m) => m.contentStatus === "verified") ?? [];
  const undisclosed = members?.filter((m) => m.contentStatus === "placeholder") ?? [];

  return (
    <SectionShell
      id="members"
      title="Members"
      subtitle="Known public members — no invented executive roles."
    >
      {isLoading ? (
        <Skeleton className="h-64 w-full rounded-xl" />
      ) : (
        <div className="flex flex-col items-center">
          <motion.div
            variants={getFadeUp(reducedMotion)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <div className="mx-auto rounded-xl border border-subtle bg-surface-elevated px-8 py-4 shadow-premium">
              <span className="font-display text-lg font-bold">808STAR Records</span>
            </div>
          </motion.div>

          <div className="relative mb-8 h-8 w-px bg-border" />

          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {known.map((member, i) => (
              <MemberNode
                key={member.id}
                member={member}
                index={i}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>

          <div className="relative my-8 h-8 w-px bg-border" />

          <div className="flex flex-wrap justify-center gap-6">
            {undisclosed.map((member, i) => (
              <MemberNode
                key={member.id}
                member={member}
                index={i + known.length}
                reducedMotion={reducedMotion}
                muted
              />
            ))}
          </div>
        </div>
      )}
    </SectionShell>
  );
}

function MemberNode({
  member,
  index,
  reducedMotion,
  muted,
}: {
  member: Member;
  index: number;
  reducedMotion: boolean;
  muted?: boolean;
}) {
  return (
    <motion.div
      variants={getFadeUp(reducedMotion, index * 0.05)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`rounded-xl border p-5 text-center ${
        muted
          ? "border-dashed border-subtle bg-surface/50"
          : "border-subtle bg-surface-elevated shadow-premium"
      }`}
    >
      <div className="mb-2 flex items-center justify-center gap-2">
        <span
          className={`font-display font-semibold ${
            muted ? "text-secondary" : "text-foreground"
          }`}
        >
          {member.name}
        </span>
        <ContentBadge status={member.contentStatus} />
      </div>
      <p className="text-sm text-secondary">{member.role}</p>
    </motion.div>
  );
}
