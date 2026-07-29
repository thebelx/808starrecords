"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { NAV_SECTIONS, ARTISTS, RELEASES } from "@/data";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { scrollToSection } from "@/hooks/use-scroll-spy";
import { useCallback, useState } from "react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((o) => !o), []);

  useKeyboardShortcuts({ "cmd+k": toggle });

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search sections, artists, releases..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Sections">
          {NAV_SECTIONS.map((section) => (
            <CommandItem
              key={section.id}
              value={section.label}
              onSelect={() => {
                scrollToSection(section.id);
                setOpen(false);
              }}
            >
              {section.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Artists">
          {ARTISTS.map((artist) => (
            <CommandItem
              key={artist.id}
              value={artist.name}
              onSelect={() => {
                scrollToSection("artists");
                setOpen(false);
              }}
            >
              {artist.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Releases">
          {RELEASES.map((release) => (
            <CommandItem
              key={release.id}
              value={`${release.title} ${release.artist}`}
              onSelect={() => {
                scrollToSection("releases");
                setOpen(false);
              }}
            >
              {release.title} — {release.artist}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
