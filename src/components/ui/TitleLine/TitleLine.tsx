'use client';

import { TitleLineHeading } from "./TitleLine.styled";

// Types
interface TitleLineProps {
  title: string;
  className?: string;
}

export const TitleLine: React.FC<TitleLineProps> = ({ 
  title,
  className
}) => {
  return (
    <TitleLineHeading className={className}>
      <span>{title}</span>
    </TitleLineHeading>
  );
};