import type { Metadata } from "next";
import localFont from "next/font/local";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.scss";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import ThemeProvider from "../utils/themeProvider";

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

// Metadata configuration
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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bloemstraat Garden',
    description: "Leer moestuinieren door ervaring, tips en kennis te delen.",
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
      className={fontPacaembu.variable}
    >
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Viewport meta tag for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#2d8018ff" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={fontPacaembu.className}>
        <ThemeProvider>
          <div id="__next">
            <Header />
            <main role="main">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}