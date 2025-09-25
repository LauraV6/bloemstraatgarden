"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faLoader } from '@awesome.me/kit-7d648e8e96/icons/duotone/solid';
import { ThemeSwitch, Skeleton, ThemeIcon, ThemeLabel, SkeletonText } from "./ThemeSwitcher.styled";

const THEME_CONFIG = {
  themes: {
    dark: {
      icon: faSun,
      label: 'Light',
      nextTheme: 'light' as const,
      ariaLabel: 'Schakel naar licht thema'
    },
    light: {
      icon: faMoon,
      label: 'Dark',
      nextTheme: 'dark' as const,
      ariaLabel: 'Schakel naar donker thema'
    }
  },
  fallback: {
    icon: faMoon,
    label: 'Dark',
    nextTheme: 'dark' as const,
    ariaLabel: 'Schakel thema'
  }
} as const;

const useThemeLogic = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  
  const currentTheme = theme === "system" ? systemTheme : theme;
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    const themeConfig = THEME_CONFIG.themes[currentTheme as keyof typeof THEME_CONFIG.themes] 
                      || THEME_CONFIG.fallback;
    setTheme(themeConfig.nextTheme);
  };

  const getThemeConfig = () => {
    return THEME_CONFIG.themes[currentTheme as keyof typeof THEME_CONFIG.themes] 
           || THEME_CONFIG.fallback;
  };

  return {
    isMounted,
    currentTheme,
    toggleTheme,
    themeConfig: getThemeConfig()
  };
};

const ThemeSwitcherSkeleton = () => (
  <ThemeSwitch
    className="button button--cta"
    disabled
    aria-label="Thema schakelaar wordt geladen"
  >
    <Skeleton>
      <ThemeIcon $isLoading>
        <FontAwesomeIcon 
          icon={faLoader}
          aria-hidden="true"
        />
      </ThemeIcon>      
      <SkeletonText>Load</SkeletonText>
    </Skeleton>
  </ThemeSwitch>
);

const ThemeSwitcher = () => {
  const { isMounted, toggleTheme, themeConfig } = useThemeLogic();

  if (!isMounted) {
    return <ThemeSwitcherSkeleton />;
  }

  return (
    <ThemeSwitch
      className={`button button--cta`}
      onClick={toggleTheme}
      aria-label={themeConfig.ariaLabel}
      title={themeConfig.ariaLabel}
    >
      <ThemeIcon>
        <FontAwesomeIcon 
          icon={themeConfig.icon} 
          aria-hidden="true"
        />
      </ThemeIcon>
        <ThemeLabel>
          {themeConfig.label}
        </ThemeLabel>
    </ThemeSwitch>
  );
};

export default ThemeSwitcher;