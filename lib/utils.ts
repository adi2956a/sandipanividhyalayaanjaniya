import { clsx } from "clsx";

export function cn(...classes: Array<string | false | null | undefined>) {
  return clsx(classes);
}

const MOJIBAKE_PATTERN = /(?:Ã.|Â.|à¤|à¥|ðŸ|â€|â€”)/;

export function repairMojibakeText(value: string) {
  let current = value;

  for (let pass = 0; pass < 3; pass += 1) {
    if (!MOJIBAKE_PATTERN.test(current)) break;

    const bytes = Uint8Array.from([...current].map((character) => character.charCodeAt(0) & 0xff));
    const decoded = new TextDecoder("utf-8", { fatal: false }).decode(bytes);

    if (!decoded || decoded === current || decoded.includes("\uFFFD")) {
      break;
    }

    current = decoded;
  }

  return current;
}

export function normalizeTextValue<T>(value: T): T {
  if (typeof value === "string") {
    return repairMojibakeText(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeTextValue(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalizeTextValue(item)])) as T;
  }

  return value;
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
