"use client";

import { useSitePreferences } from "@/components/site/site-preferences";
import { cn } from "@/lib/utils";

const fontScaleOptions = [
  { value: "sm", label: "A-" },
  { value: "md", label: "A" },
  { value: "lg", label: "A+" }
] as const;

const languageOptions = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिंदी" }
] as const;

export function SitePreferenceControls() {
  const { language, fontScale, theme, setLanguage, setFontScale, setTheme } = useSitePreferences();
  const isDark = theme === "dark";

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <button
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        type="button"
      >
        <span aria-hidden="true" className="text-sm leading-none">
          {isDark ? "☀" : "☾"}
        </span>
        <span>{isDark ? "Light" : "Dark"}</span>
      </button>
      <div className="flex items-center gap-1 rounded-full border border-white/25 bg-white/10 p-1">
        {languageOptions.map((option) => (
          <button
            key={option.value}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold transition",
              language === option.value ? "bg-white text-primary" : "text-white hover:bg-white/10"
            )}
            onClick={() => setLanguage(option.value)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-1 rounded-full border border-white/25 bg-white/10 p-1">
        {fontScaleOptions.map((option) => (
          <button
            key={option.value}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold transition",
              fontScale === option.value ? "bg-white text-primary" : "text-white hover:bg-white/10"
            )}
            onClick={() => setFontScale(option.value)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
