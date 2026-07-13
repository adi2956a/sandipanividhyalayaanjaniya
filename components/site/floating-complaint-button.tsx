"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LocalizedText } from "@/components/site/localized-text";
import { cn } from "@/lib/utils";

export function FloatingComplaintButton() {
  const pathname = usePathname();

  return (
    <Link
      aria-label="Open complaint box"
      className={cn(
        "fixed bottom-5 right-5 z-30 inline-flex items-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:brightness-110 md:bottom-6 md:right-6",
        pathname === "/complaints" ? "ring-2 ring-white/50" : ""
      )}
      href="/complaints"
    >
      <LocalizedText en="Complaint Box" hi="à¤¶à¤¿à¤•à¤¾à¤¯à¤¤ à¤¬à¥‰à¤•à¥à¤¸" />
    </Link>
  );
}
