import { Disc3, Instagram, Radio, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-subtle bg-background px-6 py-16 md:px-10 lg:px-16">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="font-display text-2xl font-semibold tracking-tight">808STAR Records</p>
          <p className="mt-3 text-sm leading-7 text-secondary">
            Information shown is compiled from publicly available sources and may be updated as additional official information becomes available.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a href="#" aria-label="Streaming" className="rounded-full border border-subtle p-3 text-secondary transition-colors hover:border-accent hover:text-accent">
            <Disc3 className="h-4 w-4" />
          </a>
          <a href="#" aria-label="Apple Music" className="rounded-full border border-subtle p-3 text-secondary transition-colors hover:border-accent hover:text-accent">
            <Radio className="h-4 w-4" />
          </a>
          <a href="#" aria-label="YouTube" className="rounded-full border border-subtle p-3 text-secondary transition-colors hover:border-accent hover:text-accent">
            <Youtube className="h-4 w-4" />
          </a>
          <a href="#" aria-label="Instagram" className="rounded-full border border-subtle p-3 text-secondary transition-colors hover:border-accent hover:text-accent">
            <Instagram className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-subtle pt-6 text-sm text-secondary md:flex-row md:items-center md:justify-between">
        <p>© 2026 808STAR Records</p>
        <div className="flex flex-wrap gap-4">
          <a href="#" className="hover:text-foreground">Legal</a>
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Transparency</a>
        </div>
      </div>
    </footer>
  );
}
