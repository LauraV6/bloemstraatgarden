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

interface SocialLink {
  href: string;
  icon: IconDefinition;
  label: string;
  className: string;
}

const SCROLL_THRESHOLD = 30;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Memoized social links configuration
  const socialLinks: SocialLink[] = useMemo(() => [
    {
      href: "https://api.whatsapp.com/send?text=https://bloemstraatgarden.nl/",
      icon: faWhatsapp,
      label: "Delen via WhatsApp",
      className: "whapp",
    },
    {
      href: "https://www.linkedin.com/in/laura-vlasma-0692b0159/",
      icon: faLinkedinIn,
      label: "Bezoek LinkedIn profiel",
      className: "linkedin",
    },
    {
      href: "https://www.instagram.com/lauravlasma/",
      icon: faInstagram,
      label: "Bezoek Instagram profiel",
      className: "insta",
    }
  ], []);

  useEffect(() => {
    setIsScrolled(window.scrollY > SCROLL_THRESHOLD);

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  return (
    <HeaderContainer 
      isScrolled={isScrolled}
      role="banner"
    >
      <Nav isScrolled={isScrolled} role="navigation" aria-label="Hoofdnavigatie">
        <SocialLinks isScrolled={isScrolled} role="group" aria-label="Social media links">
          {socialLinks.map(({ href, icon, label, className }) => (
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
            </ShareIcon>
          ))}
        </SocialLinks>

        <LogoLink 
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