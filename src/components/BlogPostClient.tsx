"use client";

import { ReactNode } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const FadeWrapper = styled.div`
  width: 100%;
  animation: ${fadeIn} 0.4s cubic-bezier(0, 0, 0.2, 1) forwards;
`;

interface BlogPostClientProps {
  children: ReactNode;
}

export default function BlogPostClient({ children }: BlogPostClientProps) {
  return <FadeWrapper>{children}</FadeWrapper>;
}
