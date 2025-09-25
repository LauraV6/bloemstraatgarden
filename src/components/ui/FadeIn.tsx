"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface SlideProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  once?: boolean;
}

const SLIDE_CONFIG = {
  defaultDuration: 0.5,
  defaultDelay: 0,
  defaultDirection: 'fade' as const,
  defaultOnce: true,
  ease: "easeOut"
} as const;

const createVariants = (direction: SlideProps['direction']) => {
  const distance = 50;
  
  const directionVariants = {
    up: { opacity: 0, y: distance },
    down: { opacity: 0, y: -distance },
    left: { opacity: 0, x: distance },
    right: { opacity: 0, x: -distance },
    fade: { opacity: 0 }
  };

  return {
    hidden: directionVariants[direction || 'fade'],
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0 
    }
  };
};

export default function Slide({ 
  children,
  delay = SLIDE_CONFIG.defaultDelay,
  className,
  duration = SLIDE_CONFIG.defaultDuration,
  direction = SLIDE_CONFIG.defaultDirection,
  once = SLIDE_CONFIG.defaultOnce
}: SlideProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  const variants = createVariants(direction);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      transition={{
        duration,
        ease: SLIDE_CONFIG.ease,
        delay,
      }}
      initial="hidden"
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}