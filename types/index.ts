export type ContentStatus = "verified" | "placeholder";

export interface Artist {
  id: string;
  name: string;
  role: string;
  bio: string;
  latestRelease: string;
  genre: string;
  location: string;
  imageUrl: string;
  links: { platform: string; url: string }[];
  contentStatus: ContentStatus;
}

export interface Release {
  id: string;
  title: string;
  artist: string;
  releaseDate: string | null;
  genre: string;
  type: "Single" | "EP" | "Album";
  trackCount: number;
  duration: number | null;
  artworkUrl: string;
  contentStatus: ContentStatus;
}

export interface NewsItem {
  id: string;
  category: "release" | "collaboration" | "announcement" | "media";
  title: string;
  date: string | null;
  excerpt: string;
  contentStatus: ContentStatus;
}

export interface GalleryItem {
  id: string;
  type: "photo" | "artwork" | "performance" | "studio" | "video";
  title: string;
  caption: string;
  imageUrl: string;
  contentStatus: ContentStatus;
}

export interface DemoTrack {
  id: string;
  title: string;
  artist: string;
  duration: number;
  artworkUrl: string;
  audioUrl: string | null;
  contentStatus: ContentStatus;
}

export interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  status: "completed" | "upcoming";
  contentStatus: ContentStatus;
}

export interface Statistic {
  id: string;
  label: string;
  value: number | null;
  contentStatus: ContentStatus;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  contentStatus: ContentStatus;
}

export interface LabelStats {
  monthlyListeners: number | null;
  totalReleases: number;
  artists: number;
  followers: number | null;
}

export interface NavSection {
  id: string;
  label: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  artworkUrl: string;
  duration: number | null;
  audioUrl: string | null;
}
