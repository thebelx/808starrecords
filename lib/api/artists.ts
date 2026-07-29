import { ARTISTS } from "@/data";
import { delay } from "@/lib/utils";
import type { Artist } from "@/types";

export async function fetchArtists(): Promise<Artist[]> {
  await delay(300);
  return ARTISTS;
}

export async function fetchArtist(id: string): Promise<Artist | undefined> {
  await delay(200);
  return ARTISTS.find((a) => a.id === id);
}
