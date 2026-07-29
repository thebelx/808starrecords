import { DEMO_TRACKS } from "@/data";
import { delay } from "@/lib/utils";
import type { DemoTrack } from "@/types";

export async function fetchDemos(): Promise<DemoTrack[]> {
  await delay(300);
  return DEMO_TRACKS;
}
