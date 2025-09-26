"use client";

import React from 'react';
import Image from "next/image";
import { useTheme } from 'next-themes';
import { HeroContainer, HeroContainer2, HeroText, HeroImages, LeaveImage, HomePageTitle } from './Hero.styled';

interface HeroProps {
  theme?: 'dark' | 'light';
  title: string;
  paragraph: string;
  className?: string;
  forceWhiteText?: boolean;
  isHomePage?: boolean;
}

interface LeafImageProps {
  src: string;
  variant: 'one' | 'two' | 'three' | 'four';
  alt: string;
}

const LEAF_IMAGES = [
  {
    src: "/headerLeaveBig.png",
    variant: "one" as const,
    alt: "Decoratief groen blad illustratie"
  },
  {
    src: "/headerLeaveSmall.png",
    variant: "two" as const,
    alt: "Decoratief klein groen blad illustratie"
  },
  {
    src: "/headerLeaveBig.png",
    variant: "three" as const,
    alt: "Decoratief groen blad illustratie"
  },
  {
    src: "/headerLeaveSmall.png",
    variant: "four" as const,
    alt: "Decoratief klein groen blad illustratie"
  }
] as const;

const LeafImage: React.FC<LeafImageProps> = ({ src, variant, alt }) => (
  <LeaveImage variant={variant}>
    <Image
      src={src}
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
  </LeaveImage>
);

export const Hero: React.FC<HeroProps> = ({
  theme,
  title,
  paragraph,
  className,
  forceWhiteText = false,
  isHomePage = false
}) => {
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme } = useTheme();
  const isDarkMode = mounted ? resolvedTheme === 'dark' : false;

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <HeroContainer
      className={`${className || ''} ${isHomePage ? 'homepage-hero' : ''}`}
      style={{ backgroundImage: `url(/headerBgTransparent.png)` }}
      role="banner"
      aria-labelledby="hero-title"
      isDark={isDarkMode}
    >
      <HeroContainer2>
        <HeroText>
          <div>
            {isHomePage ? (
              <HomePageTitle id="hero-title">
                {title}
              </HomePageTitle>
            ) : (
              <h1 
                id="hero-title"
                style={forceWhiteText || theme === 'dark' ? { color: 'white' } : {}}
              >
                {title}
              </h1>
            )}
            <p
              style={forceWhiteText || theme === 'dark' ? { color: 'white' } : {}}
            >
              {paragraph}
            </p>
          </div>
        </HeroText>
        
        {/* Only render leaves after mounting to avoid hydration mismatch */}
        {mounted && (
          <HeroImages>
            {LEAF_IMAGES.map((leaf, index) => (
              <LeafImage 
                key={index}
                src={leaf.src}
                variant={leaf.variant}
                alt={leaf.alt}
              />
            ))}
          </HeroImages>
        )}
      </HeroContainer2>
    </HeroContainer>
  );
};