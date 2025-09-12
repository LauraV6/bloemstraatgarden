'use client';

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { StatesContainer, StateGrid, State, StateNumber } from "./States.styled";

export default function StatesSkeleton() {
  return (
    <StatesContainer>
      <StateGrid>
        {[1, 2, 3, 4].map((index) => (
          <State key={`state-skeleton-${index}`}>
            <StateNumber>
              <Skeleton width={80} height={48} />
            </StateNumber>
            <span><Skeleton width={100} /></span>
          </State>
        ))}
      </StateGrid>
    </StatesContainer>
  );
}