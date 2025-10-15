"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BlogPostClientProps {
  children: ReactNode;
}

export default function BlogPostClient({ children }: BlogPostClientProps) {
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
      style={{ width: "100%" }}
    >
      {/* Post Header Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {childrenArray[0]}
      </motion.div>

      {/* Post Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6,
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {childrenArray[1]}
      </motion.div>
    </motion.div>
  );
}