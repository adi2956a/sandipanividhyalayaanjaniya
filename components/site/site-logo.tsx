"use client";

import Link from "next/link";

export function SiteLogo() {
  return (
    <Link className="inline-flex items-center" href="/">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-card">
        <div className="text-center leading-none">
          <p className="font-heading text-lg font-bold">SV</p>
          <p className="text-[9px] uppercase tracking-[0.2em]">Logo</p>
        </div>
      </div>
    </Link>
  );
}
