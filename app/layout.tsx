import type { Metadata } from "next";
import localFont from "next/font/local";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "./globals.scss";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import ThemeProvider from "../utils/themeProvider";

const fontPacaembu = localFont({
  src: [
    {
      path: './fonts/Pacaembu-Bold.woff2',
      weight: '700',
    },
    {
      path: './fonts/Pacaembu-Medium.woff2',
      weight: '600',
    },
    {
      path: './fonts/Pacaembu-Regular.woff2',
      weight: '500',
    },
  ],
  variable: "--font-pacaembu"
});

export const metadata: Metadata = {
  title: 'Bloemstraat Garden',
  description: "Moestuinieren",
  keywords: ["Moestuin", "Bloemstraat", "Moestuinieren"],
  creator: 'Laura',
  authors: [
    {
      name: "Laura"
    },
    {
      name: "Pieter"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className={fontPacaembu.variable}>
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}