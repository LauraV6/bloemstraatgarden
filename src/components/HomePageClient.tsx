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
    <div style={{ width: "100%" }}>
      <div>
        <Hero title={siteTitle} paragraph={PAGE_CONTENT.heroSubtitle} isHomePage={true}/>
      </div>
      
      {/* Blog Posts Section */}
      <div>
        {childrenArray[0]}
      </div>

      {/* Stock Section */}
      <div>
        {childrenArray[1]}
      </div>

      {/* Tips Section */}
      <div>
        {childrenArray[2]}
      </div>

      {/* States Section */}
      <div>
        {childrenArray[3]}
      </div>
    </div>
  );
}