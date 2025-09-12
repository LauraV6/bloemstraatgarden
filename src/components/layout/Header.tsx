"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Logo from "@/components/ui/Logo/logo";
import LogoSmall from "@/components/ui/Logo/logoSmall";
import { HeaderContainer, Nav, LogoLink, SocialLinks, ShareIcon } from './Header.styled';
import ThemeSwitcher from "@/components/ui/ThemeSwitcher/ThemeSwitcher";

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
  const [mounted, setMounted] = useState(false);

  // Memoized social links configuration
  const socialLinks: SocialLink[] = useMemo(() => [
    {
      href: "https://api.whatsapp.com/send?text=https://bloemstraatgarden.nl/",
      icon: faWhatsapp,
      label: "Delen via WhatsApp",
      className: "whapp",
      rotation: 15
    },
    {
      href: "https://www.linkedin.com/in/laura-vlasma-0692b0159/",
      icon: faLinkedinIn,
      label: "Bezoek LinkedIn profiel",
      className: "linkedin",
      rotation: -15
    },
    {
      href: "https://www.instagram.com/lauravlasma/",
      icon: faInstagram,
      label: "Bezoek Instagram profiel",
      className: "insta",
      rotation: 15
    }
  ], []);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrolled = window.pageYOffset > SCROLL_THRESHOLD;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
    }
  }, [isScrolled]);

  // Set mounted state on client side
  useEffect(() => {
    setMounted(true);
    // Check initial scroll position after mounting
    setIsScrolled(window.pageYOffset > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    if (!mounted) return;

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
  }, [handleScroll, mounted]);

  return (
    <HeaderContainer 
      isScrolled={isScrolled}
      role="banner"
    >
      <Nav isScrolled={isScrolled} role="navigation" aria-label="Hoofdnavigatie">
        <SocialLinks isScrolled={isScrolled} role="group" aria-label="Social media links">
          {socialLinks.map(({ href, icon, label, className, rotation }) => (
            <ShareIcon
              key={className}
              href={href}
              className={className}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={label}
              isScrolled={isScrolled}
            >
              <FontAwesomeIcon icon={icon} aria-hidden="true" />
              <span>{label.includes('WhatsApp') ? 'Delen' : 'Bezoeken'}</span>
            </ShareIcon>
          ))}
        </SocialLinks>

        <LogoLink 
          as={Link}
          href="/" 
          isScrolled={isScrolled}
          aria-label="Bloemstraat Garden - Ga naar homepage"
        >
          {isScrolled ? <LogoSmall /> : <Logo />}
        </LogoLink>

        <ThemeSwitcher />
      </Nav>
    </HeaderContainer>
  );
}