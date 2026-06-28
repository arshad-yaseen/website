"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const ROLES = [
  "Design Engineer",
  "Systems Engineer",
  "Building JavaScript tooling",
  "Obsessed with details",
];

const ROTATE_INTERVAL = 2400;

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

export function HeroRole() {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length);
    }, ROTATE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  const role = ROLES[index];

  return (
    <p className="mx-(--layout-padding) text-center text-base/7 text-pretty text-neutral-600 dark:text-neutral-400">
      <span className="relative inline-flex align-bottom">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={role}
            initial={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, filter: "blur(8px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, filter: "blur(8px)" }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="inline-block whitespace-nowrap will-change-[transform,opacity,filter]"
          >
            {role}
          </motion.span>
        </AnimatePresence>
      </span>
    </p>
  );
}
