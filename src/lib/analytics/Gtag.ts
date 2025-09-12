// lib/gtag.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Type definitions for Google Analytics
type GtagCommand = 'config' | 'event' | 'js' | 'set' | 'consent';

interface GtagEventParams {
  page_location?: string;
  page_path?: string;
  page_title?: string;
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | undefined;
}

interface ConsentParams {
  analytics_storage?: 'granted' | 'denied';
  ad_storage?: 'granted' | 'denied';
}

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag: (
      command: GtagCommand,
      targetId: string | Date | 'update',
      params?: GtagEventParams | ConsentParams
    ) => void;
    dataLayer: Array<unknown>;
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string): void => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: window.location.origin + url,
      page_path: url,
      page_title: document.title,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ 
  action, 
  category, 
  label, 
  value 
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Custom events for your garden website
export const trackQuizEvent = (
  action: 'quiz_start' | 'question_answered' | 'quiz_completed' | 'quiz_reset',
  questionIndex?: number,
  answer?: string
): void => {
  event({
    action: action,
    category: 'Quiz',
    label: questionIndex !== undefined ? `Question ${questionIndex + 1}` : undefined,
    value: answer ? 1 : 0
  });
};


// Grant consent for analytics
export const grantAnalyticsConsent = (): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted'
    });
  }
};

// Deny consent for analytics
export const denyAnalyticsConsent = (): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied'
    });
  }
};