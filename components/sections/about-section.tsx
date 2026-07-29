"use client";

import { motion } from "framer-motion";
import { SectionShell } from "@/components/shared/section-shell";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { getFadeUp } from "@/lib/motion";

export function AboutSection() {
  const reducedMotion = useReducedMotion();

  return (
    <SectionShell id="about" title="About" className="bg-surface">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          variants={getFadeUp(reducedMotion)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="font-display text-2xl font-medium leading-relaxed md:text-3xl lg:text-4xl">
            808STAR Records is an independent label rooted in the DMV — where
            underground energy meets premium craft.
          </p>
        </motion.div>

        <motion.div
          variants={getFadeUp(reducedMotion, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6 text-secondary"
        >
          <p className="text-base leading-relaxed md:text-lg">
            808STAR Records is an independent DMV-based label publicly
            associated with{" "}
            <span className="font-medium text-foreground">5STARFLEXAH</span> and{" "}
            <span className="font-medium text-foreground">M3TIS</span>. The
            label has released music under the 808STAR Records imprint,
            including the Haven EP by M3TIS.
          </p>
          <p className="text-base leading-relaxed">
            Our catalog spans hip-hop and street-driven sounds from the
            Washington metropolitan area — built for listeners who appreciate
            authenticity, precision, and forward motion.
          </p>

          <div className="rounded-xl border border-subtle bg-surface-elevated p-6">
            <p className="text-sm leading-relaxed text-secondary">
              <strong className="text-foreground">Disclaimer:</strong> Publicly
              available information about 808STAR Records is limited. This page
              presents known information in an editorial format. No ownership
              or executive claims are made beyond verified public sources.
            </p>
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}
