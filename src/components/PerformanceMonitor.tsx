'use client';

import { useEffect } from 'react';
import { reportWebVitals } from '@/lib/performance/webVitals';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Initialize web vitals reporting
    reportWebVitals();

    // Monitor navigation timing
    if (typeof window !== 'undefined' && window.performance) {
      const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navTiming) {
        // Log important navigation metrics in development
        if (process.env.NODE_ENV === 'development') {
          console.log('[Navigation Performance]', {
            domContentLoaded: navTiming.domContentLoadedEventEnd - navTiming.domContentLoadedEventStart,
            domComplete: navTiming.domComplete - navTiming.domInteractive,
            loadComplete: navTiming.loadEventEnd - navTiming.loadEventStart,
            totalTime: navTiming.loadEventEnd - navTiming.fetchStart,
          });
        }
      }
    }

    // Monitor long tasks (tasks that block the main thread for 50ms+)
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (process.env.NODE_ENV === 'development') {
              console.warn('[Long Task Detected]', {
                duration: entry.duration,
                startTime: entry.startTime,
                name: entry.name
              });
            }
          }
        });
        
        observer.observe({ entryTypes: ['longtask'] });
        
        return () => observer.disconnect();
      } catch {
        // Long task observer not supported
      }
    }
  }, []);

  return null;
}