"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Clock,
  Disc3,
  Home,
  Image,
  Info,
  Menu,
  Mic2,
  Music2,
  Newspaper,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_SECTIONS } from "@/data";
import { scrollToSection, useScrollSpy } from "@/hooks/use-scroll-spy";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ElementType> = {
  hero: Home,
  about: Info,
  artists: Mic2,
  releases: Disc3,
  news: Newspaper,
  gallery: Image,
  demos: Music2,
  timeline: Clock,
  stats: BarChart3,
  discography: Disc3,
  members: Users,
};

interface SidebarNavProps {
  children: React.ReactNode;
}

export function SidebarNav({ children }: SidebarNavProps) {
  const sectionIds = NAV_SECTIONS.map((s) => s.id);
  const activeId = useScrollSpy(sectionIds);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 1024);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const navContent = (
    <motion.nav
      aria-label="Section navigation"
      className="flex flex-col gap-1"
      initial={false}
      animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -8 }}
      transition={{ duration: 0.2 }}
    >
      {NAV_SECTIONS.map((section) => {
        const Icon = ICONS[section.id] ?? Home;
        const isActive = activeId === section.id;
        return (
          <button
            key={section.id}
            onClick={() => {
              scrollToSection(section.id);
              setMobileOpen(false);
            }}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200",
              isActive
                ? "bg-accent/10 text-accent"
                : "text-secondary hover:bg-surface-elevated hover:text-foreground"
            )}
            aria-current={isActive ? "true" : undefined}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="hidden whitespace-nowrap lg:inline">
              {section.label}
            </span>
          </button>
        );
      })}
    </motion.nav>
  );

  return (
    <>
      <div
        className="fixed left-0 top-0 z-40 hidden h-screen lg:flex"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="h-full w-3 shrink-0" />
        <motion.aside
          initial={false}
          animate={{ width: isExpanded ? 224 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="relative flex h-full flex-col overflow-hidden border-r border-subtle bg-background/95 backdrop-blur-md"
        >
          <div className="flex h-16 items-center px-4 lg:px-6">
            <span className="font-display text-lg font-bold tracking-tight text-accent">
              808
            </span>
            <motion.span
              initial={false}
              animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -8 }}
              transition={{ duration: 0.2 }}
              className="ml-1 hidden font-display text-lg font-bold tracking-tight lg:inline"
            >
              STAR
            </motion.span>
          </div>
          <motion.div
            initial={false}
            animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -8 }}
            transition={{ duration: 0.2 }}
            className="flex-1 overflow-y-auto px-3 py-4"
          >
            {navContent}
          </motion.div>
          <motion.div
            initial={false}
            animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-subtle px-4 py-3"
          >
            <kbd className="hidden rounded border border-subtle bg-surface-elevated px-2 py-0.5 text-xs text-secondary lg:inline">
              ⌘K
            </kbd>
          </motion.div>
        </motion.aside>
      </div>

      <div
        className="w-full transition-[padding-left] duration-300 ease-out"
        style={{ paddingLeft: isDesktop && isExpanded ? 224 : 0 }}
      >
        {children}
      </div>

      {/* Mobile bottom bar */}
      <div className="fixed bottom-16 left-0 right-0 z-40 border-t border-subtle bg-background/95 lg:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {NAV_SECTIONS.slice(0, 5).map((section) => {
            const Icon = ICONS[section.id] ?? Home;
            const isActive = activeId === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "flex flex-col items-center gap-0.5 p-2 text-xs transition-colors",
                  isActive ? "text-accent" : "text-secondary"
                )}
                aria-label={section.label}
              >
                <Icon className="h-5 w-5" />
              </button>
            );
          })}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex flex-col items-center gap-0.5 p-2 text-xs text-secondary"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full w-72 bg-background p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-xl font-bold">808STAR</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            {navContent}
          </motion.aside>
        </motion.div>
      )}
    </>
  );
}
