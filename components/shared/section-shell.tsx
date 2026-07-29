"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionShellProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function SectionShell({
  id,
  title,
  subtitle,
  children,
  className,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-snap-section px-6 py-16 md:px-10 md:py-20 lg:px-16 lg:py-24",
        className
      )}
    >
      {(title || subtitle) && (
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.25 }}
          className="mb-10 md:mb-12"
        >
          {title && (
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-2 max-w-2xl text-secondary">{subtitle}</p>
          )}
        </motion.header>
      )}
      {children}
    </section>
  );
}
