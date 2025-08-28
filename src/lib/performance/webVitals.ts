import { onCLS, onFCP, onLCP, onTTFB, onINP, Metric } from 'web-vitals';

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

interface VitalsData {
  id: string;
  name: string;
  value: number;
  rating?: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
  entries?: PerformanceEntry[];
}

interface NavigatorConnection {
  effectiveType?: string;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NavigatorConnection;
  mozConnection?: NavigatorConnection;
  webkitConnection?: NavigatorConnection;
}

function getConnectionSpeed() {
  const nav = navigator as NavigatorWithConnection;
  const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
  
  if (connection?.effectiveType) {
    return connection.effectiveType;
  }
  
  return 'unknown';
}

export function sendToAnalytics(metric: Metric) {
  const analyticsData: VitalsData = {
    id: metric.id,
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', analyticsData);
    
    // Provide performance recommendations
    if (metric.rating === 'poor') {
      console.warn(`⚠️ Poor ${metric.name} performance detected:`, {
        value: metric.value,
        threshold: getThreshold(metric.name),
        recommendation: getRecommendation(metric.name)
      });
    }
  }

  // Send to your analytics endpoint (optional)
  // You can integrate with Google Analytics, Vercel Analytics, or custom endpoint
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: 1,
      metric_rating: metric.rating,
      connection_speed: getConnectionSpeed(),
    });
  }
}

function getThreshold(metricName: string): string {
  const thresholds: Record<string, string> = {
    'CLS': '< 0.1',
    'FCP': '< 1.8s',
    'INP': '< 200ms',
    'LCP': '< 2.5s',
    'TTFB': '< 800ms',
  };
  return thresholds[metricName] || 'N/A';
}

function getRecommendation(metricName: string): string {
  const recommendations: Record<string, string> = {
    'CLS': 'Review layout shifts. Add size attributes to images/videos, avoid inserting content above existing content.',
    'FCP': 'Optimize server response time, reduce render-blocking resources, use font-display: swap.',
    'INP': 'Optimize event handlers, reduce main thread work, use CSS transforms instead of layout properties.',
    'LCP': 'Optimize images (format, size, lazy loading), preload critical resources, improve server response time.',
    'TTFB': 'Use CDN, optimize server processing, implement caching strategies, reduce redirects.',
  };
  return recommendations[metricName] || 'Check the web vitals documentation for optimization tips.';
}

export function reportWebVitals() {
  if (typeof window === 'undefined') return;

  onCLS(sendToAnalytics);
  onFCP(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}

// Custom performance marks for specific user interactions
export function measurePerformance(markName: string, startMark?: string) {
  if (typeof window === 'undefined' || !window.performance) return;

  try {
    if (startMark) {
      performance.measure(markName, startMark);
      const measure = performance.getEntriesByName(markName, 'measure')[0];
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Performance] ${markName}: ${measure.duration.toFixed(2)}ms`);
      }

      // Send to analytics
      if (window.gtag) {
        window.gtag('event', 'timing_complete', {
          event_category: 'Performance',
          name: markName,
          value: Math.round(measure.duration),
        });
      }
    } else {
      performance.mark(markName);
    }
  } catch (error) {
    console.error('Performance measurement error:', error);
  }
}

// Report component render performance
export function reportRenderPerformance(componentName: string, renderTime: number) {
  if (process.env.NODE_ENV === 'development') {
    const threshold = 16; // 60fps = 16ms per frame
    if (renderTime > threshold) {
      console.warn(`⚠️ Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
    }
  }

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'component_render', {
      event_category: 'Performance',
      event_label: componentName,
      value: Math.round(renderTime),
      non_interaction: 1,
    });
  }
}