"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchLabelStats,
  fetchTimeline,
  fetchStatistics,
  fetchMembers,
} from "@/lib/api/label";

export function useLabelStats() {
  return useQuery({
    queryKey: ["labelStats"],
    queryFn: fetchLabelStats,
  });
}

export function useTimeline() {
  return useQuery({
    queryKey: ["timeline"],
    queryFn: fetchTimeline,
  });
}

export function useStatistics() {
  return useQuery({
    queryKey: ["statistics"],
    queryFn: fetchStatistics,
  });
}

export function useMembers() {
  return useQuery({
    queryKey: ["members"],
    queryFn: fetchMembers,
  });
}
