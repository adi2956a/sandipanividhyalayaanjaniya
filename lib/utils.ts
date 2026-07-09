import { clsx } from "clsx";

export function cn(...classes: Array<string | false | null | undefined>) {
  return clsx(classes);
}

export function formatDate(value?: string, locale = "en-IN") {
  if (!value) {
    return locale === "hi-IN" ? "घोषित किया जाना शेष है" : "To be announced";
  }

  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}
