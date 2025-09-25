"use client";

import { Hero } from "@/components/layout/Hero";
import { ReactNode } from "react";

interface HomePageClientProps {
  children: ReactNode;
  siteTitle: string;
}

export default function HomePageClient({ children, siteTitle }: HomePageClientProps) {
  const PAGE_CONTENT = {
    heroSubtitle: "Ook zelf een moestuin beginnen? Lees in dit blog over onze ervaring, tips and tricks."
  };

  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <>
        <Hero title={siteTitle} paragraph={PAGE_CONTENT.heroSubtitle} isHomePage={true}/>     
        {childrenArray[0]}
        {childrenArray[1]}
        {childrenArray[2]}
        {childrenArray[3]}
    </>
  );
}