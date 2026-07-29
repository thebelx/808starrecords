import { GALLERY_ITEMS } from "@/data";
import { delay } from "@/lib/utils";
import type { GalleryItem } from "@/types";

export async function fetchGallery(): Promise<GalleryItem[]> {
  await delay(300);
  return GALLERY_ITEMS;
}
