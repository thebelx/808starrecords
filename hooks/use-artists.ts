"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchArtists } from "@/lib/api/artists";

export function useArtists() {
  return useQuery({
    queryKey: ["artists"],
    queryFn: fetchArtists,
  });
}
