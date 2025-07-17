// lib/gtag.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string): void => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
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

export const trackPlantEvent = (
  action: 'plant_viewed' | 'plant_search' | 'plant_filter',
  plantName?: string
): void => {
  event({
    action: action,
    category: 'Plants',
    label: plantName,
    value: 1
  });
};

export const trackContactEvent = (
  action: 'form_submit' | 'email_click' | 'social_click',
  label?: string
): void => {
  event({
    action: action,
    category: 'Contact',
    label: label,
    value: 1
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