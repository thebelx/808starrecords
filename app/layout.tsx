import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "808STAR Records | Independent DMV Record Label",
  description:
    "A cinematic, premium profile for 808STAR Records — featuring verified public information, editorial storytelling, and an immersive artist-label experience.",
  metadataBase: new URL("https://808starrecords.com"),
  alternates: {
    canonical: "https://808starrecords.com",
  },
  openGraph: {
    title: "808STAR Records",
    description:
      "Independent record label profile blending luxury, underground DMV culture, and cinematic storytelling.",
    url: "https://808starrecords.com",
    type: "website",
    images: [
      {
        url: "/placeholders/hero-texture.svg",
        width: 1200,
        height: 630,
        alt: "808STAR Records",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "808STAR Records",
    description:
      "Independent record label profile blending luxury, underground DMV culture, and cinematic storytelling.",
    images: ["/placeholders/hero-texture.svg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="min-h-screen bg-background text-foreground selection:bg-accent/40 selection:text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
