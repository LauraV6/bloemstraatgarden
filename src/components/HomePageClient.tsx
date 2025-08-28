"use client";

import { motion } from "framer-motion";
import { Hero } from "@/components/layout/Hero";
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

interface HomePageClientProps {
  children: ReactNode;
  siteTitle: string;
}

export default function HomePageClient({ children, siteTitle }: HomePageClientProps) {
  const PAGE_CONTENT = {
    heroSubtitle: "Ook zelf een moestuin beginnen? Lees in dit blog over onze ervaring, tips and tricks."
  };

  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={pageVariants}
      style={{ width: "100%" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <Hero title={siteTitle} paragraph={PAGE_CONTENT.heroSubtitle}/>
      </motion.div>

      {/* Blog Posts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ 
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {childrenArray[0]}
      </motion.div>

      {/* Stock Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ 
          duration: 0.6,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {childrenArray[1]}
      </motion.div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ 
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {childrenArray[2]}
      </motion.div>

      {/* States Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ 
          duration: 0.6,
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {childrenArray[3]}
      </motion.div>
    </motion.div>
  );
}