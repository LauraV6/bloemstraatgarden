import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string;
      primaryDark: string;
      secondary: string;
      background: any;
      surface: any;
      text: any;
      textSecondary: string;
      textMuted: string;
      border: any;
      error: string;
      errorBright: string;
      success: string;
      warning: string;
      info: string;
      white: string;
      black: string;
      green5: string;
      menu: string;
      transparent: string;
      transparent1: string;
      gray: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      action: {
        primary: string;
        primaryHover: string;
        primaryActive: string;
        primaryDisabled: string;
        secondary: string;
        secondaryHover: string;
        secondaryActive: string;
        secondaryDisabled: string;
        danger: string;
        dangerHover: string;
        dangerActive: string;
        dangerDisabled: string;
      };
      status: {
        success: string;
        successBackground: string;
        successBorder: string;
        warning: string;
        warningBackground: string;
        warningBorder: string;
        error: string;
        errorBackground: string;
        errorBorder: string;
        info: string;
        infoBackground: string;
        infoBorder: string;
      };
      interactive: {
        hover: string;
        active: string;
        selected: string;
        disabled: string;
        focusRing: string;
      };
      brand: {
        primary: string;
        primaryLight: string;
        primaryDark: string;
        secondary: string;
        accent: string;
      };
    };
    spacing: any;
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    typography: {
      fontFamily: string;
      fontFamilyHeading: string;
      fontSize: {
        xs: string;
        sm: string;
        base: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        '4xl': string;
      };
      fontWeight: {
        light: number;
        normal: number;
        medium: number;
        semibold: number;
        bold: number;
      };
      lineHeight: {
        tight: number;
        normal: number;
        relaxed: number;
      };
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    radii: {
      sm: string;
      md: string;
      lg: string;
      full: string;
      pill: string;
      [key: string]: string;
    };
    transitions: {
      fast: string;
      normal: string;
      slow: string;
      all: {
        fast: string;
        normal: string;
        slow: string;
      };
    };
    zIndices: {
      hide: number;
      base: number;
      dropdown: number;
      sticky: number;
      banner: number;
      overlay: number;
      modal: number;
      popover: number;
      toast: number;
      tooltip: number;
    };
    layers?: any;
  }
}