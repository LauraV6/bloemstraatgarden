'use client';

import { TitleLineHeading } from "./TitleLine.styled";

interface TitleLineProps {
  title: string;
}

export const TitleLine: React.FC<TitleLineProps> = ({ 
  title,
}) => {
  return (
    <TitleLineHeading>
      <span>{title}</span>
    </TitleLineHeading>
  );
};