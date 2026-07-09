"use client";

import Link from "next/link";
import { LocalizedText } from "@/components/site/localized-text";
import { SiteLogo } from "@/components/site/site-logo";
import { SitePreferenceControls } from "@/components/site/site-preference-controls";
import { useSitePreferences } from "@/components/site/site-preferences";
import { SiteSettings } from "@/lib/types";

const navItems = [
  { href: "/", en: "Home", hi: "à¤®à¥à¤–à¤ªà¥ƒà¤·à¥à¤ " },
  { href: "/about", en: "About", hi: "à¤¹à¤®à¤¾à¤°à¥‡ à¤¬à¤¾à¤°à¥‡ à¤®à¥‡à¤‚" },
  { href: "/academics", en: "Academics", hi: "à¤¶à¥ˆà¤•à¥à¤·à¤£à¤¿à¤•" },
  { href: "/admissions", en: "Admissions", hi: "à¤ªà¥à¤°à¤µà¥‡à¤¶" },
  { href: "/faculties", en: "Faculties", hi: "à¤¸à¤‚à¤•à¤¾à¤¯" },
  { href: "/facilities", en: "Facilities", hi: "à¤¸à¥à¤µà¤¿à¤§à¤¾à¤à¤‚" },
  { href: "/activities", en: "Activities", hi: "à¤—à¤¤à¤¿à¤µà¤¿à¤§à¤¿à¤¯à¤¾à¤‚" },
  { href: "/notices", en: "Notices", hi: "à¤¸à¥‚à¤šà¤¨à¤¾à¤à¤‚" },
  { href: "/gallery", en: "Gallery", hi: "à¤—à¥ˆà¤²à¤°à¥€" },
  { href: "/downloads", en: "Downloads", hi: "à¤¡à¤¾à¤‰à¤¨à¤²à¥‹à¤¡" },
  { href: "/student-resources", en: "Student Resources", hi: "Student Resources" },
  { href: "/complaints", en: "Safe Complaint Box", hi: "Safe Complaint Box" },
  { href: "/disclosure", en: "Disclosure", hi: "à¤ªà¥à¤°à¤•à¤Ÿà¥€à¤•à¤°à¤£" },
  { href: "/contact", en: "Contact", hi: "à¤¸à¤‚à¤ªà¤°à¥à¤•" }
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
              hi="à¤¸à¥à¤•à¥‚à¤² à¤¶à¤¿à¤•à¥à¤·à¤¾ à¤µà¤¿à¤­à¤¾à¤—, à¤®à¤§à¥à¤¯ à¤ªà¥à¤°à¤¦à¥‡à¤¶ à¤¶à¤¾à¤¸à¤¨"
            />
          </p>
          <SitePreferenceControls />
        </div>
      </div>
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 md:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <SiteLogo />
            <div>
              <p className="font-heading text-2xl font-bold text-primary">
                {language === "hi" ? settings.schoolNameHi || settings.schoolName : settings.schoolName}
              </p>
              <p className="font-hindi text-sm text-muted">
                {language === "hi" ? settings.schoolName : settings.schoolNameHi}
              </p>
              <p className="mt-1 text-sm text-muted">{settings.address}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <a className="rounded-full border border-secondary px-4 py-2 font-medium text-primary" href={`tel:${settings.phone}`}>
              {settings.phone}
            </a>
            <a className="rounded-full bg-accent px-4 py-2 font-medium text-white" href="/admissions">
              <LocalizedText en="Apply / Enquire" hi="à¤†à¤µà¥‡à¤¦à¤¨ / à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€" />
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
