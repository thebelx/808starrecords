import {
  LABEL_STATS,
  STATISTICS,
  TIMELINE_EVENTS,
  MEMBERS,
} from "@/data";
import { delay } from "@/lib/utils";
import type { LabelStats, Member, Statistic, TimelineEvent } from "@/types";

export async function fetchLabelStats(): Promise<LabelStats> {
  await delay(250);
  return LABEL_STATS;
}

export async function fetchTimeline(): Promise<TimelineEvent[]> {
  await delay(300);
  return TIMELINE_EVENTS;
}

export async function fetchStatistics(): Promise<Statistic[]> {
  await delay(300);
  return STATISTICS;
}

export async function fetchMembers(): Promise<Member[]> {
  await delay(250);
  return MEMBERS;
}
