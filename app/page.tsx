import { AboutSection } from "@/components/sections/about-section";
import { DemosSection } from "@/components/sections/demos-section";
import { DiscographySection } from "@/components/sections/discography-section";
import { FeaturedArtistsSection } from "@/components/sections/featured-artists-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { HeroSection } from "@/components/sections/hero-section";
import { MembersSection } from "@/components/sections/members-section";
import { NewsSection } from "@/components/sections/news-section";
import { ReleasesSection } from "@/components/sections/releases-section";
import { StatsSection } from "@/components/sections/stats-section";
import { TimelineSection } from "@/components/sections/timeline-section";
import { CommandPalette } from "@/components/layout/command-palette";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { StickyPlayer } from "@/components/layout/sticky-player";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SidebarNav />
      <div className="pl-0 lg:pl-16 xl:pl-20">
        <HeroSection />
        <AboutSection />
        <FeaturedArtistsSection />
        <ReleasesSection />
        <NewsSection />
        <GallerySection />
        <DemosSection />
        <TimelineSection />
        <StatsSection />
        <DiscographySection />
        <MembersSection />
        <Footer />
      </div>
      <StickyPlayer />
      <CommandPalette />
    </main>
  );
}
