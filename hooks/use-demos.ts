"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDemos } from "@/lib/api/demos";

export function useDemos() {
  return useQuery({
    queryKey: ["demos"],
    queryFn: fetchDemos,
  });
}
