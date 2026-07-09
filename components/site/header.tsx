"use client";

import Link from "next/link";
import { LocalizedText } from "@/components/site/localized-text";
import { SitePreferenceControls } from "@/components/site/site-preference-controls";
import { useSitePreferences } from "@/components/site/site-preferences";
import { SiteSettings } from "@/lib/types";

const navItems = [
  { href: "/", en: "Home", hi: "मुखपृष्ठ" },
  { href: "/about", en: "About", hi: "हमारे बारे में" },
  { href: "/academics", en: "Academics", hi: "शैक्षणिक" },
  { href: "/admissions", en: "Admissions", hi: "प्रवेश" },
  { href: "/facilities", en: "Facilities", hi: "सुविधाएं" },
  { href: "/activities", en: "Activities", hi: "गतिविधियां" },
  { href: "/notices", en: "Notices", hi: "सूचनाएं" },
  { href: "/gallery", en: "Gallery", hi: "गैलरी" },
  { href: "/downloads", en: "Downloads", hi: "डाउनलोड" },
  { href: "/disclosure", en: "Disclosure", hi: "प्रकटीकरण" },
  { href: "/contact", en: "Contact", hi: "संपर्क" }
];

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  const { language } = useSitePreferences();

  return (
    <>
      <div className="bg-primary text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-2 text-sm md:px-6 lg:flex-row lg:items-center lg:justify-between">
          <p>
            <LocalizedText
              en="School Education Department, Government of Madhya Pradesh"
              hi="स्कूल शिक्षा विभाग, मध्य प्रदेश शासन"
            />
          </p>
          <SitePreferenceControls />
        </div>
      </div>
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 md:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-heading text-2xl font-bold text-primary">
              {language === "hi" ? settings.schoolNameHi || settings.schoolName : settings.schoolName}
            </p>
            <p className="font-hindi text-sm text-muted">
              {language === "hi" ? settings.schoolName : settings.schoolNameHi}
            </p>
            <p className="mt-1 text-sm text-muted">{settings.address}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <a className="rounded-full border border-secondary px-4 py-2 font-medium text-primary" href={`tel:${settings.phone}`}>
              {settings.phone}
            </a>
            <a className="rounded-full bg-accent px-4 py-2 font-medium text-white" href="/admissions">
              <LocalizedText en="Apply / Enquire" hi="आवेदन / जानकारी" />
            </a>
          </div>
        </div>
        <div className="border-t border-border bg-surface/60">
          <div className="mx-auto flex max-w-7xl justify-end px-4 py-2 text-sm text-muted md:px-6">
            <p>{settings.officeTimings}</p>
          </div>
        </div>
        <nav className="sticky top-0 z-20 border-t border-border bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-4 py-3 text-sm font-medium md:px-6">
            {navItems.map((item) => (
              <Link key={item.href} className="whitespace-nowrap text-ink transition hover:text-primary" href={item.href}>
                <LocalizedText en={item.en} hi={item.hi} />
              </Link>
            ))}
          </div>
        </nav>
      </header>
    </>
  );
}
