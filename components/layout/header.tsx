"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Logo from "../logo/logo";
import LogoSmall from "../logo/logoSmall";
import styles from "./header.module.scss";
import ThemeSwitcher from "../themeSwitcher";

// Types
interface SocialLink {
  href: string;
  icon: IconDefinition;
  label: string;
  className: string;
  rotation: number;
}

// Constants
const SCROLL_THRESHOLD = 30;
const ANIMATION_DURATION = 0.1;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Memoized social links configuration
  const socialLinks: SocialLink[] = useMemo(() => [
    {
      href: "https://api.whatsapp.com/send?text=https://bloemstraatgarden.nl/",
      icon: faWhatsapp,
      label: "Delen via WhatsApp",
      className: "whapp",
      rotation: 10
    },
    {
      href: "https://www.linkedin.com/in/laura-vlasma-0692b0159/",
      icon: faLinkedinIn,
      label: "Bezoek LinkedIn profiel",
      className: "linkedin",
      rotation: -10
    },
    {
      href: "https://www.instagram.com/lauravlasma/",
      icon: faInstagram,
      label: "Bezoek Instagram profiel",
      className: "insta",
      rotation: 10
    }
  ], []);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrolled = window.pageYOffset > SCROLL_THRESHOLD;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
    }
  }, [isScrolled]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  }, [handleScroll]);

  return (
    <header 
      className={`${styles.header} ${isScrolled ? styles.headerSmall : ''}`}
      role="banner"
    >
      <nav className={styles.nav} role="navigation" aria-label="Hoofdnavigatie">
        <div className={styles.header__socials} role="group" aria-label="Social media links">
          {socialLinks.map(({ href, icon, label, className, rotation }) => (
            <motion.a
              key={className}
              href={href}
              className={`${styles.shareIcon} button button--cta ${className}`}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={label}
              whileHover={{ 
                scale: [null, 1.2, 1.1], 
                rotate: rotation 
              }}
              whileTap={{ rotate: 0 }}
              transition={{ duration: ANIMATION_DURATION }}
            >
              <FontAwesomeIcon icon={icon} aria-hidden="true" />
              <span>{label.includes('WhatsApp') ? 'Delen' : 'Bezoeken'}</span>
            </motion.a>
          ))}
        </div>

        <Link 
          href="/" 
          className={`${styles.logo} ${isScrolled ? styles.logoSmall : ''}`}
          aria-label="Bloemstraat Garden - Ga naar homepage"
        >
          {isScrolled ? <LogoSmall /> : <Logo />}
        </Link>

        <ThemeSwitcher />
      </nav>
    </header>
  );
}