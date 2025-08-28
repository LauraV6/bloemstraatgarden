"use client";

import Image from "next/image";
import styles from "./hero.module.scss";
import FadeIn from "@/components/common/FadeIn";
import { motion } from "framer-motion";

// Types
interface HeroProps {
  theme?: 'dark' | 'light';
  title: string;
  paragraph: string;
  className?: string;
}

interface LeafImageProps {
  src: string;
  className: string;
  alt: string;
}

// Animation variants
const heroTextVariants = {
  initial: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Constants
const LEAF_IMAGES = [
  {
    src: "/headerLeaveBig.png",
    className: `${styles.leave} ${styles.leaveOne}`,
    alt: "Decoratief blad - groot"
  },
  {
    src: "/headerLeaveSmall.png",
    className: `${styles.leave} ${styles.leaveTwo}`,
    alt: "Decoratief blad - klein"
  },
  {
    src: "/headerLeaveBig.png",
    className: `${styles.leave} ${styles.leaveThree}`,
    alt: "Decoratief blad - groot"
  },
  {
    src: "/headerLeaveSmall.png",
    className: `${styles.leave} ${styles.leaveFour}`,
    alt: "Decoratief blad - klein"
  }
] as const;

// Leaf Image Component
const LeafImage: React.FC<LeafImageProps> = ({ src, className, alt }) => (
  <FadeIn>
    <Image
      src={src}
      className={className}
      alt={alt}
      width={300}
      height={300}
      sizes="(max-width: 768px) 200px, 300px"
      style={{ 
        width: '100%', 
        height: 'auto',
        objectFit: 'contain'
      }}
      priority={false}
    />
  </FadeIn>
);

export const Hero: React.FC<HeroProps> = ({ 
  theme, 
  title, 
  paragraph, 
  className 
}) => {
  // Determine hero class based on theme
  const heroClass = [
    styles.hero,
    theme === 'dark' ? styles.heroDark : '',
    className || ''
  ].filter(Boolean).join(' ');

  return (
    <section
      className={heroClass}
      style={{ backgroundImage: `url(/headerBgTransparent.png)` }}
      role="banner"
      aria-labelledby="hero-title"
    >
      <div className={styles.hero__container}>
        <motion.header 
          className={styles.hero__text}
          initial="initial"
          animate="animate"
          variants={heroTextVariants}
        >
          <div>
            <motion.h1 
              id="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {paragraph}
            </motion.p>
          </div>
        </motion.header>
        
        <div 
          className={styles.hero__images}
          role="img" 
          aria-label="Decoratieve bladeren"
        >
          {LEAF_IMAGES.map((leaf, index) => (
            <LeafImage
              key={`leaf-${index}`}
              src={leaf.src}
              className={leaf.className}
              alt={leaf.alt}
            />
          ))}
        </div>
      </div>
    </section>
  );
};