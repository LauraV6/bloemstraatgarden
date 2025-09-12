"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBagSeedling, 
  faShovel, 
  faHandHoldingSeedling 
} from '@awesome.me/kit-7d648e8e96/icons/duotone/solid';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { StatesSection, StatesContainer, StatesItem, TextContainer } from "./States.styled";

// Types
interface StatesProps {
  className?: string;
  once?: boolean;
}

interface StateItem {
  icon: IconDefinition;
  title: string;
  description: string;
  delay: number;
}

interface StateItemComponentProps extends StateItem {
  isInView: boolean;
  index: number;
}

// Constants
const ANIMATION_CONFIG = {
  duration: '0.7s',
  easing: 'cubic-bezier(0.17, 0.55, 0.55, 1)',
  translateDistance: '200px',
  baseDelay: 0,
  delayIncrement: 0.2
} as const;

const STATES_DATA: StateItem[] = [
  {
    icon: faBagSeedling,
    title: "Zaden selectie",
    description: "Keuze uit inventaris",
    delay: 0
  },
  {
    icon: faShovel,
    title: "Plant techniek", 
    description: "Richten op plant wensen",
    delay: 0.2
  },
  {
    icon: faHandHoldingSeedling,
    title: "Beste oogst",
    description: "Groei en onderhoud", 
    delay: 0.4
  }
] as const;

// Utility functions
const createAnimationStyle = (isInView: boolean, delay: number) => ({
  transform: isInView ? "none" : `translateY(${ANIMATION_CONFIG.translateDistance})`,
  opacity: isInView ? 1 : 0,
  transition: `all ${ANIMATION_CONFIG.duration} ${ANIMATION_CONFIG.easing} ${delay}s`
});

// Components
const StateItemComponent: React.FC<StateItemComponentProps> = ({ 
  icon, 
  title, 
  description, 
  delay, 
  isInView, 
  index 
}) => (
  <StatesItem 
    isSecond={index === 1}
    style={createAnimationStyle(isInView, delay)}
    role="listitem"
    aria-label={`Stap ${index + 1}: ${title}`}
  >
    <FontAwesomeIcon 
      icon={icon} 
      aria-hidden="true"
    />
    <TextContainer>
      <h4>{title}</h4>
      <p>{description}</p>
    </TextContainer>
  </StatesItem>
);

export default function States({ 
  className, 
  once = false 
}: StatesProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once });

  return (
    <StatesSection 
      className={className} 
      ref={ref}
      role="list"
      aria-label="Moestuin proces stappen"
    >
      <StatesContainer>
        {STATES_DATA.map((item, index) => (
          <StateItemComponent
            key={`state-${index}`}
            {...item}
            isInView={isInView}
            index={index}
          />
        ))}
      </StatesContainer>
    </StatesSection>
  );
}