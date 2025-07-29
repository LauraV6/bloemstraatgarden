'use client';

import { useEffect } from 'react';
import { GA_TRACKING_ID } from './gtag';

export default function GADebug() {
  useEffect(() => {
    // Only run in development or when explicitly enabled
    if (process.env.NODE_ENV !== 'development') return;

    console.log('=== Google Analytics Debug Info ===');
    console.log('GA_TRACKING_ID:', GA_TRACKING_ID || 'NOT SET');
    console.log('Window.gtag exists:', typeof window !== 'undefined' && typeof window.gtag === 'function');
    console.log('Window.dataLayer exists:', typeof window !== 'undefined' && Array.isArray(window.dataLayer));
    
    if (typeof window !== 'undefined' && window.dataLayer) {
      console.log('DataLayer contents:', window.dataLayer);
    }

    // Check if GA scripts are loaded
    const gaScripts = Array.from(document.querySelectorAll('script')).filter(
      script => script.src.includes('googletagmanager.com')
    );
    console.log('GA Scripts loaded:', gaScripts.length);
    gaScripts.forEach((script, index) => {
      console.log(`Script ${index + 1}:`, script.src);
    });

    // Check for Content Security Policy
    const metaCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (metaCSP) {
      console.log('CSP meta tag found:', metaCSP.getAttribute('content'));
    }

    // Monitor gtag calls
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      const originalGtag = window.gtag;
      window.gtag = function(...args: any[]) {
        console.log('gtag called with:', args);
        return originalGtag.apply(window, args);
      };
    }
  }, []);

  return null;
}