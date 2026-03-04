"use client";

import { ReactNode } from "react";
import { ShoppingCartProvider } from "@/context/ShoppingCartContext";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeInDown = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled.div`
  width: 100%;
`;

const HeroSection = styled.div`
  animation: ${fadeInDown} 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
`;

const ContentSection = styled.section`
  animation: ${fadeIn} 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
`;

const PlantsSection = styled.section`
  animation: ${fadeIn} 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
`;

interface VerkrijgbaarPageClientProps {
  children: ReactNode;
}

export default function VerkrijgbaarPageClient({ children }: VerkrijgbaarPageClientProps) {
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <ShoppingCartProvider>
      <PageWrapper>
        <HeroSection>{childrenArray[0]}</HeroSection>
        <ContentSection>{childrenArray[1]}</ContentSection>
        <PlantsSection>{childrenArray[2]}</PlantsSection>
      </PageWrapper>
    </ShoppingCartProvider>
  );
}
