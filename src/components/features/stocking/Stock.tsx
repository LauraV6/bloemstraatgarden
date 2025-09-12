'use client';

import { Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRight } from '@awesome.me/kit-7d648e8e96/icons/duotone/solid';
import StackAction from "./StockAction";
import { Boxing, Story, StoryContainer, StoryText, StoryAdding } from "./Stock.styled";

// Types
interface StockProps {
  className?: string;
}

interface StockContentProps {
  title: string;
  description: string;
}

// Constants
const STOCK_CONTENT = {
  title: "Gratis voorraad",
  description: "Het kan voorkomen dat er meer gezaaid wordt dan dat er plek voor is. Deze planten komen op de voorraad lijst te staan. Meld je aan voor een plant uit de voorraad lijst door mij een bericht te sturen.",
  buttonText: "Bekijk onze voorraad",
  buttonIcon: faRight
} as const;

// Components
const StockFallback: React.FC = () => (
  <button 
    className="button button--cta" 
    disabled
    aria-label={`${STOCK_CONTENT.buttonText} - Laden...`}
  >
    <span>{STOCK_CONTENT.buttonText}</span> 
    <FontAwesomeIcon icon={STOCK_CONTENT.buttonIcon} aria-hidden="true" />
  </button>
);

const StockContent: React.FC<StockContentProps> = ({ title, description }) => (
  <StoryText>
    <h3>{title}</h3>
    <p>{description}</p>
  </StoryText>
);

const StockAction: React.FC = () => (
  <StoryAdding>
    <Suspense fallback={<StockFallback />}>
      <StackAction />
    </Suspense>
  </StoryAdding>
);

export default function Stock({ className }: StockProps) {
  return (
    <section 
      className={className}
      aria-labelledby="stock-heading"
    >
      <Boxing>
        <Story>
          <StoryContainer>
            <StockContent title={STOCK_CONTENT.title} description={STOCK_CONTENT.description} />
            <StockAction />
          </StoryContainer>
        </Story>
      </Boxing>
    </section>
  );
}