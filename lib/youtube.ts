export function extractYoutubeId(url: string) {
  const trimmed = url.trim();

  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "").slice(0, 11);
    }

    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v")?.slice(0, 11) ?? "";
    }
  } catch {
    return "";
  }

  return "";
}

