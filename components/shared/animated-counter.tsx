"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number | null;
  label: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  label,
  suffix = "",
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value === null || !isInView) return;
    if (reducedMotion) {
      setDisplay(value);
      return;
    }
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * value);
      setDisplay(start);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value, isInView, reducedMotion]);

  return (
    <div ref={ref} className={cn("text-center", className)}>
      <div className="font-display text-4xl font-bold md:text-5xl">
        {value === null ? "—" : `${display}${suffix}`}
      </div>
      <div className="mt-2 text-sm text-secondary">{label}</div>
    </div>
  );
}
