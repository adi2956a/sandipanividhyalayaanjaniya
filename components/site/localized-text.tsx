"use client";

import { ReactNode } from "react";
import { useSitePreferences } from "@/components/site/site-preferences";

export function LocalizedText({
  en,
  hi,
  fallback,
  as: Component = "span",
  className
}: {
  en: ReactNode;
  hi?: ReactNode;
  fallback?: "en" | "hi";
  as?: "span" | "div" | "p";
  className?: string;
}) {
  const { language } = useSitePreferences();
  const preferredText = language === "hi" ? hi : en;

  return <Component className={className}>{preferredText ?? (fallback === "hi" ? hi : en)}</Component>;
}
