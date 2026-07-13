"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

export type SiteLanguage = "en" | "hi";
export type FontScale = "sm" | "md" | "lg";
export type SiteTheme = "light" | "dark";

interface SitePreferencesContextValue {
  language: SiteLanguage;
  fontScale: FontScale;
  theme: SiteTheme;
  setLanguage: (language: SiteLanguage) => void;
  setFontScale: (fontScale: FontScale) => void;
  setTheme: (theme: SiteTheme) => void;
}

const SitePreferencesContext = createContext<SitePreferencesContextValue | null>(null);

const LANGUAGE_KEY = "site-language";
const FONT_SCALE_KEY = "site-font-scale";
const THEME_KEY = "site-theme";

export function SitePreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<SiteLanguage>("en");
  const [fontScale, setFontScale] = useState<FontScale>("md");
  const [theme, setTheme] = useState<SiteTheme>("light");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_KEY) as SiteLanguage | null;
    const savedFontScale = window.localStorage.getItem(FONT_SCALE_KEY) as FontScale | null;
    const savedTheme = window.localStorage.getItem(THEME_KEY) as SiteTheme | null;

    if (savedLanguage === "en" || savedLanguage === "hi") {
      setLanguage(savedLanguage);
    }

    if (savedFontScale === "sm" || savedFontScale === "md" || savedFontScale === "lg") {
      setFontScale(savedFontScale);
    }

    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.language = language;
    document.documentElement.lang = language === "hi" ? "hi" : "en";
    window.localStorage.setItem(LANGUAGE_KEY, language);
  }, [language]);

  useEffect(() => {
    document.documentElement.dataset.fontScale = fontScale;
    window.localStorage.setItem(FONT_SCALE_KEY, fontScale);
  }, [fontScale]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      language,
      fontScale,
      theme,
      setLanguage,
      setFontScale,
      setTheme
    }),
    [fontScale, language, theme]
  );

  return <SitePreferencesContext.Provider value={value}>{children}</SitePreferencesContext.Provider>;
}

export function useSitePreferences() {
  const context = useContext(SitePreferencesContext);

  if (!context) {
    throw new Error("useSitePreferences must be used within SitePreferencesProvider.");
  }

  return context;
}
