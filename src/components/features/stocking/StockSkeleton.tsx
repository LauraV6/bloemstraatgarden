'use client';

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Boxing, Story, StoryContainer, StoryText, StoryAdding } from "./Stock.styled";

export default function StockSkeleton() {
  return (
    <section aria-label="Voorraad laden...">
      <Boxing>
        <Story>
          <StoryContainer>
            <StoryText>
              <h3><Skeleton width="40%" /></h3>
              <p>
                <Skeleton count={3} />
              </p>
            </StoryText>
            <StoryAdding>
              <Skeleton width={180} height={48} borderRadius={40} />
            </StoryAdding>
          </StoryContainer>
        </Story>
      </Boxing>
    </section>
  );
}