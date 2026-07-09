"use client";

import Link from "next/link";
import { useSitePreferences } from "@/components/site/site-preferences";

export function SiteLogo() {
  const { language } = useSitePreferences();

  return (
    <Link className="inline-flex items-center gap-3" href="/">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-card">
        <div className="text-center leading-none">
          <p className="font-heading text-lg font-bold">SV</p>
          <p className="text-[9px] uppercase tracking-[0.2em]">Logo</p>
        </div>
      </div>
      <div className="hidden sm:block">
        <p className="font-heading text-lg font-bold text-primary">
          {language === "hi" ? "संदीपनि विद्यालय" : "Sandipani Vidyalaya"}
        </p>
        <p className="text-xs uppercase tracking-[0.18em] text-secondary">
          {language === "hi" ? "अंजनिया, मंडला" : "Anjaniya, Mandla"}
        </p>
      </div>
    </Link>
  );
}
