import { NEWS_ITEMS } from "@/data";
import { delay } from "@/lib/utils";
import type { NewsItem } from "@/types";

export async function fetchNews(): Promise<NewsItem[]> {
  await delay(350);
  return NEWS_ITEMS;
}
