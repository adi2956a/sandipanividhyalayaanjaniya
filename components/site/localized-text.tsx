"use client";

import { ReactNode } from "react";
import { useSitePreferences } from "@/components/site/site-preferences";
import { repairMojibakeText } from "@/lib/utils";

function normalizeNode(node: ReactNode) {
  return typeof node === "string" ? repairMojibakeText(node) : node;
}

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
  const preferredText = language === "hi" ? normalizeNode(hi) : normalizeNode(en);
  const fallbackText = fallback === "hi" ? normalizeNode(hi) : normalizeNode(en);

  return <Component className={className}>{preferredText ?? fallbackText}</Component>;
}
