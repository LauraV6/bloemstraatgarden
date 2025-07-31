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

interface VerkrijgbaarPageClientProps {
  children: ReactNode;
}

export default function VerkrijgbaarPageClient({ children }: VerkrijgbaarPageClientProps) {
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={pageVariants}
      style={{ width: "100%" }}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {childrenArray[0]}
      </motion.div>

      {/* Breadcrumbs and Story Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ 
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {childrenArray[1]}
      </motion.section>

      {/* Available Plants Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ 
          duration: 0.6,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {childrenArray[2]}
      </motion.section>
    </motion.div>
  );
}