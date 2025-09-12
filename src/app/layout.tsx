import type { Metadata } from "next";
import Script from 'next/script';
import localFont from "next/font/local";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/providers/ThemeProvider/ThemeProvider";
import ApolloProvider from "@/components/providers/ApolloProvider";
import { EmotionProvider } from "@/providers/EmotionProvider";
import EmotionRegistry from "@/lib/emotion/registry";
import Analytics from "@/components/Analytics";
import PerformanceMonitor from "@/components/PerformanceMonitor";

config.autoAddCss = false;

interface RootLayoutProps {
  children: React.ReactNode;
}

const fontPacaembu = localFont({
  src: [
    {
      path: './fonts/Pacaembu-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Pacaembu-Medium.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Pacaembu-Regular.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: "--font-pacaembu",
  display: 'swap',
  preload: true,
});

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: 'Bloemstraat Garden',
  description: "Leer moestuinieren door ervaring, tips en kennis te delen. Ontdek hoe je je eigen groenten kunt kweken in Steenwijkerland.",
  keywords: [
    "Moestuin", 
    "Bloemstraat", 
    "Moestuinieren", 
    "Groenten kweken", 
    "Tuinieren", 
    "Steenwijkerland",
    "Biologisch tuinieren",
    "Zelfvoorzienend"
  ],
  creator: 'Laura',
  authors: [
    { name: "Laura" },
    { name: "Pieter" }
  ],
  openGraph: {
    title: 'Bloemstraat Garden',
    description: "Leer moestuinieren door ervaring, tips en kennis te delen.",
    url: 'https://bloemstraatgarden.nl',
    siteName: 'Bloemstraat Garden',
    locale: 'nl_NL',
    type: 'website',
    images: [
      {
        url: 'https://bloemstraatgarden.nl/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bloemstraat Garden - Moestuinieren leren',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bloemstraat Garden',
    description: "Leer moestuinieren door ervaring, tips en kennis te delen.",
    images: ['https://bloemstraatgarden.nl/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console verification if needed
    // google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://bloemstraatgarden.nl',
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="nl" 
      suppressHydrationWarning
    >
      <head>
        {/* Theme initialization script - must run first to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                  document.documentElement.style.colorScheme = theme;
                } catch (e) {}
              })();
            `,
          }}
        />
        
        {/* Critical CSS for dark mode to prevent flash */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              [data-theme="dark"] body {
                background-color: #1a1d23 !important;
                color: #e1e1e1 !important;
              }
              [data-theme="dark"] header[role="banner"] {
                background-color: #23252a;
                border-bottom: 1px solid #23252a;
              }
              [data-theme="dark"] footer {
                background-color: transparent !important;
              }
              [data-theme="dark"] footer > div {
                background-color: hsl(152, 100%, 11%) !important;
              }
              [data-theme="dark"] footer p,
              [data-theme="dark"] footer a,
              [data-theme="dark"] footer span {
                color: #e1e1e1 !important;
              }
              [data-theme="dark"] h1,
              [data-theme="dark"] h2,
              [data-theme="dark"] h3,
              [data-theme="dark"] h4,
              [data-theme="dark"] h5,
              [data-theme="dark"] h6 {
                color: #e1e1e1 !important;
              }
              [data-theme="light"] body {
                background-color: #fffef9 !important;
                color: #111827 !important;
              }
              [data-theme="light"] footer {
                background-color: transparent !important;
              }
              [data-theme="light"] footer p,
              [data-theme="light"] footer a,
              [data-theme="light"] footer span {
                color: #111827 !important;
              }
              [data-theme="light"] h1,
              [data-theme="light"] h2,
              [data-theme="light"] h3,
              [data-theme="light"] h4,
              [data-theme="light"] h5,
              [data-theme="light"] h6 {
                color: #111827 !important;
              }
            `,
          }}
        />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <meta name="theme-color" content="#00381e" />
        
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Google Analytics - Only load if GA_TRACKING_ID exists */}
        {GA_TRACKING_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  
                  // Initialize with consent mode
                  gtag('consent', 'default', {
                    'analytics_storage': 'granted',
                    'ad_storage': 'denied',
                    'wait_for_update': 500,
                  });
                  
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_location: typeof window !== 'undefined' ? window.location.href : '',
                    page_title: typeof document !== 'undefined' ? document.title : '',
                    cookie_flags: 'SameSite=None;Secure',
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={fontPacaembu.variable}>
        <EmotionRegistry>
          <ThemeProvider>
            <EmotionProvider>
              <ApolloProvider>
                <div id="__next">
                  <Header />
                  {children}
                  <Footer />
                  <Analytics />
                  <PerformanceMonitor />
                </div>
              </ApolloProvider>
            </EmotionProvider>
          </ThemeProvider>
        </EmotionRegistry>
      </body>
    </html>
  );
}