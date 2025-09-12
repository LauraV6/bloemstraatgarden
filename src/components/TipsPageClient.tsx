"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

// Animation variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

interface TipsPageClientProps {
  children: ReactNode;
}

export default function TipsPageClient({ children }: TipsPageClientProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={pageVariants}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
}