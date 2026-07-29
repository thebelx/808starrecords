"use client";

import { useEffect } from "react";

type ShortcutHandler = () => void;

export function useKeyboardShortcuts(shortcuts: Record<string, ShortcutHandler>) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const mod = e.metaKey || e.ctrlKey;

      if (mod && key === "k") {
        e.preventDefault();
        shortcuts["cmd+k"]?.();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [shortcuts]);
}
