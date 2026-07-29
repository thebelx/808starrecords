import type {
  Artist,
  DemoTrack,
  GalleryItem,
  LabelStats,
  Member,
  NavSection,
  NewsItem,
  Release,
  Statistic,
  TimelineEvent,
} from "@/types";

export const NAV_SECTIONS: NavSection[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "artists", label: "Artists" },
  { id: "releases", label: "Releases" },
  { id: "news", label: "News" },
  { id: "gallery", label: "Gallery" },
  { id: "demos", label: "Demos" },
  { id: "timeline", label: "Timeline" },
  { id: "stats", label: "Statistics" },
  { id: "discography", label: "Discography" },
  { id: "members", label: "Members" },
];

export const LABEL_STATS: LabelStats = {
  monthlyListeners: null,
  totalReleases: 6,
  artists: 2,
  followers: null,
};

export const ARTISTS: Artist[] = [
  {
    id: "5starflexah",
    name: "5STARFLEXAH",
    role: "Artist · Producer",
    bio: "Publicly associated with 808STAR Records. Featured on releases including Haven (Atypical) and production credits on label releases.",
    latestRelease: "Atypical (feat. on Haven EP)",
    genre: "Hip-Hop",
    location: "DMV",
    imageUrl: "/placeholders/artist-1.svg",
    links: [
      { platform: "Spotify", url: "#" },
      { platform: "Apple Music", url: "#" },
    ],
    contentStatus: "verified",
  },
  {
    id: "m3tis",
    name: "M3TIS",
    role: "Artist",
    bio: "Publicly associated with 808STAR Records. Released Haven EP (Nov 2025) under the 808STAR Records imprint.",
    latestRelease: "Haven EP",
    genre: "Hip-Hop",
    location: "DMV",
    imageUrl: "/placeholders/artist-2.svg",
    links: [
      { platform: "Spotify", url: "#" },
      { platform: "Apple Music", url: "#" },
    ],
    contentStatus: "verified",
  },
];

export const RELEASES: Release[] = [
  {
    id: "haven-ep",
    title: "Haven",
    artist: "M3TIS",
    releaseDate: "2025-11-09",
    genre: "Hip-Hop",
    type: "EP",
    trackCount: 2,
    duration: 207,
    artworkUrl: "/placeholders/album-haven.svg",
    contentStatus: "verified",
  },
  {
    id: "work",
    title: "WORK",
    artist: "808STAR Records",
    releaseDate: null,
    genre: "Hip-Hop",
    type: "Single",
    trackCount: 1,
    duration: null,
    artworkUrl: "/placeholders/album-work.svg",
    contentStatus: "placeholder",
  },
  {
    id: "im-back",
    title: "I'm Back",
    artist: "808STAR Records",
    releaseDate: null,
    genre: "Hip-Hop",
    type: "Single",
    trackCount: 1,
    duration: null,
    artworkUrl: "/placeholders/album-im-back.svg",
    contentStatus: "placeholder",
  },
  {
    id: "stuntin",
    title: "STUNTIN",
    artist: "808STAR Records",
    releaseDate: null,
    genre: "Hip-Hop",
    type: "Single",
    trackCount: 1,
    duration: null,
    artworkUrl: "/placeholders/album-stuntin.svg",
    contentStatus: "placeholder",
  },
  {
    id: "making-money-moves",
    title: "Making Money Moves",
    artist: "808STAR Records",
    releaseDate: null,
    genre: "Hip-Hop",
    type: "Single",
    trackCount: 1,
    duration: null,
    artworkUrl: "/placeholders/album-mmm.svg",
    contentStatus: "placeholder",
  },
  {
    id: "money-fix-it",
    title: "Money Fix It",
    artist: "lil Trippy E feat. ST★RRY",
    releaseDate: "2026-07-08",
    genre: "Hip-Hop",
    type: "Single",
    trackCount: 1,
    duration: 137,
    artworkUrl: "/placeholders/album-mfi.svg",
    contentStatus: "verified",
  },
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "news-1",
    category: "announcement",
    title: "Awaiting official announcements",
    date: null,
    excerpt:
      "Official news and press releases will appear here as they become available from 808STAR Records.",
    contentStatus: "placeholder",
  },
  {
    id: "news-2",
    category: "release",
    title: "Awaiting official announcements",
    date: null,
    excerpt:
      "New release announcements will be published here. Check back for updates.",
    contentStatus: "placeholder",
  },
  {
    id: "news-3",
    category: "collaboration",
    title: "Awaiting official announcements",
    date: null,
    excerpt:
      "Collaboration news and features will be listed here when officially announced.",
    contentStatus: "placeholder",
  },
  {
    id: "news-4",
    category: "media",
    title: "Awaiting official announcements",
    date: null,
    excerpt:
      "Media coverage and press features will appear here as they are verified.",
    contentStatus: "placeholder",
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    type: "artwork",
    title: "Haven EP Artwork",
    caption: "Placeholder — official artwork pending",
    imageUrl: "/placeholders/gallery-artwork.svg",
    contentStatus: "placeholder",
  },
  {
    id: "g2",
    type: "performance",
    title: "Live Performance",
    caption: "Placeholder — awaiting official media",
    imageUrl: "/placeholders/gallery-performance.svg",
    contentStatus: "placeholder",
  },
  {
    id: "g3",
    type: "studio",
    title: "Studio Session",
    caption: "Placeholder — awaiting official media",
    imageUrl: "/placeholders/gallery-studio.svg",
    contentStatus: "placeholder",
  },
  {
    id: "g4",
    type: "photo",
    title: "Label Photo",
    caption: "Placeholder — awaiting official media",
    imageUrl: "/placeholders/gallery-photo.svg",
    contentStatus: "placeholder",
  },
  {
    id: "g5",
    type: "video",
    title: "Music Video Still",
    caption: "Placeholder — awaiting official media",
    imageUrl: "/placeholders/gallery-video.svg",
    contentStatus: "placeholder",
  },
  {
    id: "g6",
    type: "artwork",
    title: "Release Artwork",
    caption: "Placeholder — awaiting official media",
    imageUrl: "/placeholders/gallery-artwork-2.svg",
    contentStatus: "placeholder",
  },
];

export const DEMO_TRACKS: DemoTrack[] = [
  {
    id: "demo-1",
    title: "Untitled Demo 01",
    artist: "808STAR Records",
    duration: 180,
    artworkUrl: "/placeholders/demo-artwork.svg",
    audioUrl: null,
    contentStatus: "placeholder",
  },
  {
    id: "demo-2",
    title: "Untitled Demo 02",
    artist: "808STAR Records",
    duration: 210,
    artworkUrl: "/placeholders/demo-artwork-2.svg",
    audioUrl: null,
    contentStatus: "placeholder",
  },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "t1",
    year: 2025,
    title: "Formation",
    description: "808STAR Records established in the DMV area.",
    status: "completed",
    contentStatus: "verified",
  },
  {
    id: "t2",
    year: 2025,
    title: "First Releases",
    description: "Initial catalog releases under the 808STAR Records imprint.",
    status: "completed",
    contentStatus: "placeholder",
  },
  {
    id: "t3",
    year: 2025,
    title: "Haven EP",
    description: "M3TIS releases Haven EP — 2 tracks including Atypical feat. 5★FLEXAH.",
    status: "completed",
    contentStatus: "verified",
  },
  {
    id: "t4",
    year: 2025,
    title: "WORK",
    description: "Single release — details pending official confirmation.",
    status: "completed",
    contentStatus: "placeholder",
  },
  {
    id: "t5",
    year: 2025,
    title: "I'm Back",
    description: "Single release — details pending official confirmation.",
    status: "completed",
    contentStatus: "placeholder",
  },
  {
    id: "t6",
    year: 2026,
    title: "STUNTIN",
    description: "Upcoming single release.",
    status: "upcoming",
    contentStatus: "placeholder",
  },
  {
    id: "t7",
    year: 2026,
    title: "Making Money Moves",
    description: "Upcoming single release.",
    status: "upcoming",
    contentStatus: "placeholder",
  },
];

export const STATISTICS: Statistic[] = [
  { id: "s1", label: "Artists", value: 2, contentStatus: "verified" },
  { id: "s2", label: "Releases", value: 6, contentStatus: "verified" },
  { id: "s3", label: "Projects", value: null, contentStatus: "placeholder" },
  {
    id: "s4",
    label: "Collaborations",
    value: null,
    contentStatus: "placeholder",
  },
  { id: "s5", label: "Years Active", value: 1, contentStatus: "verified" },
];

export const MEMBERS: Member[] = [
  {
    id: "m1",
    name: "5STARFLEXAH",
    role: "Known Public Member",
    contentStatus: "verified",
  },
  {
    id: "m2",
    name: "M3TIS",
    role: "Known Public Member",
    contentStatus: "verified",
  },
  {
    id: "m3",
    name: "Undisclosed",
    role: "Undisclosed",
    contentStatus: "placeholder",
  },
  {
    id: "m4",
    name: "Undisclosed",
    role: "Undisclosed",
    contentStatus: "placeholder",
  },
];

export {
  ARTISTS as artists,
  RELEASES as releases,
  NEWS_ITEMS as newsItems,
  GALLERY_ITEMS as galleryItems,
  DEMO_TRACKS as demoTracks,
  TIMELINE_EVENTS as timelineEvents,
  STATISTICS as statistics,
  MEMBERS as members,
};
