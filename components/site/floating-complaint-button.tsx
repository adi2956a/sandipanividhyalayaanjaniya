"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LocalizedText } from "@/components/site/localized-text";

export function FloatingComplaintButton() {
  const pathname = usePathname();

  if (pathname.startsWith("/complaints")) {
    return null;
  }

  return (
    <Link
      aria-label="Open complaint box"
      className="fixed bottom-5 right-5 z-30 inline-flex items-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:brightness-110 md:bottom-6 md:right-6"
      href="/complaints"
    >
      <LocalizedText en="Complaint Box" hi="शिकायत बॉक्स" />
    </Link>
  );
}
