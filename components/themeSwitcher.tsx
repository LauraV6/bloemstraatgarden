"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faLoader } from '@awesome.me/kit-7d648e8e96/icons/duotone/solid';
import "@fortawesome/fontawesome-svg-core/styles.css";
import styles from "./themeSwitcher.module.scss";

// Types
interface ThemeSwitcherProps {
  className?: string;
  showLabel?: boolean;
  size?: 'small' | 'medium' | 'large';
}

// Constants
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

// Custom hook for theme logic
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

// Loading fallback component
const ThemeSwitcherSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <button 
    className={`button button--cta ${styles.themeSwitch} ${className || ''}`}
    disabled
    aria-label="Thema schakelaar wordt geladen"
  >
    <span className={styles.skeleton}>
      <FontAwesomeIcon 
        icon={faLoader}
        aria-hidden="true"
        className={styles.themeIcon}
      />      
      <span className={styles.skeletonText}>Load</span>
    </span>
  </button>
);

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ 
  className,
  showLabel = true,
  size = 'medium'
}) => {
  const { isMounted, toggleTheme, themeConfig } = useThemeLogic();

  const buttonClass = [
    'button',
    'button--cta',
    styles.themeSwitch,
    styles[`themeSwitch--${size}`],
    className
  ].filter(Boolean).join(' ');

  // Show loading skeleton during hydration
  if (!isMounted) {
    return <ThemeSwitcherSkeleton className={className} />;
  }

  return (
    <button
      className={buttonClass}
      onClick={toggleTheme}
      aria-label={themeConfig.ariaLabel}
      title={themeConfig.ariaLabel}
    >
      <FontAwesomeIcon 
        icon={themeConfig.icon} 
        aria-hidden="true"
        className={styles.themeIcon}
      />
      {showLabel && (
        <span className={styles.themeLabel}>
          {themeConfig.label}
        </span>
      )}
    </button>
  );
};

export default ThemeSwitcher;