import { RELEASES } from "@/data";
import { delay } from "@/lib/utils";
import type { Release } from "@/types";

export async function fetchReleases(): Promise<Release[]> {
  await delay(300);
  return RELEASES;
}

export async function fetchRelease(id: string): Promise<Release | undefined> {
  await delay(200);
  return RELEASES.find((r) => r.id === id);
}
