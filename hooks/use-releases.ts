"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchReleases } from "@/lib/api/releases";

export function useReleases() {
  return useQuery({
    queryKey: ["releases"],
    queryFn: fetchReleases,
  });
}
