'use client';

import Image from "next/image";
import Link from "next/link";
import LogoSmall from '@/components/ui/Logo/logoSmall';
import HeaderLeaveBig from '../../../public/headerLeaveBig.png';
import { FooterContainer, FooterContent, Container, LogoLink, IntroSection, FooterLeave, Copyright } from './Footer.styled';

interface FooterProps {
  className?: string;
}

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer({ className }: FooterProps) {
  const siteTitle = "Bloemstraat Garden";
  const siteCreator = "Laura";

  return (
    <FooterContainer 
      className={className}
      role="contentinfo"
      aria-label="Website footer"
    >
      <FooterContent>
        <Container>
          <LogoLink 
            as={Link}
            href="/" 
            aria-label={`${siteTitle} - Ga naar homepage`}
          >
            <LogoSmall />
          </LogoLink>
          
          <IntroSection>
            <p>
              <strong>{siteTitle}</strong> is gelegen in Steenwijkerland en richt zich op het 
              leren door te zien, ervaren en kennis te delen van moestuinieren.
            </p>
          </IntroSection>
        </Container>
        
        <FooterLeave>
          <Image
            src={HeaderLeaveBig}
            alt="Decoratief blad"
            priority={false}
            sizes="(max-width: 768px) 200px, 300px"
            style={{
                width: '100%',
                height: 'auto',
                maxWidth: 'var(--footer-leave-max-width)',
                objectFit: 'contain',
            }}
          />
        </FooterLeave>
      </FooterContent>
      
      <Copyright>
        Created by {siteCreator} © {CURRENT_YEAR}
      </Copyright>
    </FooterContainer>
  );
}