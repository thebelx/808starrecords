import type { Variants, Transition } from "framer-motion";

export const motionDuration = {
  fast: 0.15,
  normal: 0.2,
  slow: 0.3,
} as const;

export const motionEase = [0.25, 0.1, 0.25, 1] as const;

export const defaultTransition: Transition = {
  duration: motionDuration.normal,
  ease: motionEase,
};

export function getFadeUp(reducedMotion: boolean, delay = 0): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0 },
    };
  }
  return {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ...defaultTransition, delay },
    },
  };
}

export function getStagger(reducedMotion: boolean, stagger = 0.06): Variants {
  if (reducedMotion) {
    return {
      hidden: {},
      visible: {},
    };
  }
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger },
    },
  };
}

export function getScaleHover(reducedMotion: boolean) {
  if (reducedMotion) return {};
  return {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
    transition: defaultTransition,
  };
}

export function getCardHover(reducedMotion: boolean) {
  if (reducedMotion) return {};
  return {
    whileHover: {
      y: -4,
      boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
    },
    transition: defaultTransition,
  };
}
