"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

interface Props {
  children? : ReactNode
}

export default function ThemeProvider({ children, ...props }: Props) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}