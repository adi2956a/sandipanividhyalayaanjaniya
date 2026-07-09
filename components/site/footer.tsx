"use client";

import Link from "next/link";
import { LocalizedText } from "@/components/site/localized-text";
import { useSitePreferences } from "@/components/site/site-preferences";
import { SiteSettings } from "@/lib/types";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  const { language } = useSitePreferences();

  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <p className="font-heading text-xl font-semibold">
            {language === "hi" ? settings.schoolNameHi || settings.schoolName : settings.schoolName}
          </p>
          <p className="mt-3 text-sm text-white/80">{settings.address}</p>
          <p className="mt-2 text-sm text-white/80">
            <LocalizedText en="Email" hi="à¤ˆà¤®à¥‡à¤²" />: {settings.email}
          </p>
          <p className="text-sm text-white/80">
            <LocalizedText en="Phone" hi="à¤«à¥‹à¤¨" />: {settings.phone}
          </p>
        </div>
        <div>
          <p className="font-heading text-lg font-semibold">
            <LocalizedText en="Quick Links" hi="à¤¤à¥à¤µà¤°à¤¿à¤¤ à¤²à¤¿à¤‚à¤•" />
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-white/80">
            <Link href="/notices">
              <LocalizedText en="Notices & Circulars" hi="à¤¸à¥‚à¤šà¤¨à¤¾à¤à¤‚ à¤”à¤° à¤ªà¤°à¤¿à¤ªà¤¤à¥à¤°" />
            </Link>
            <Link href="/downloads">
              <LocalizedText en="Downloads" hi="à¤¡à¤¾à¤‰à¤¨à¤²à¥‹à¤¡" />
            </Link>
            <Link href="/student-resources">
              <LocalizedText en="Student Resources" hi="Student Resources" />
            </Link>
            <Link href="/complaints">
              <LocalizedText en="Anonymous Complaint Box" hi="Anonymous Complaint Box" />
            </Link>
            <Link href="/disclosure">
              <LocalizedText en="Mandatory Disclosure" hi="à¤…à¤¨à¤¿à¤µà¤¾à¤°à¥à¤¯ à¤ªà¥à¤°à¤•à¤Ÿà¥€à¤•à¤°à¤£" />
            </Link>
            <Link href="/contact">
              <LocalizedText en="Contact Us" hi="à¤¸à¤‚à¤ªà¤°à¥à¤• à¤•à¤°à¥‡à¤‚" />
            </Link>
          </div>
        </div>
        <div>
          <p className="font-heading text-lg font-semibold">
            <LocalizedText en="Important Note" hi="à¤®à¤¹à¤¤à¥à¤µà¤ªà¥‚à¤°à¥à¤£ à¤¸à¥‚à¤šà¤¨à¤¾" />
          </p>
          <p className="mt-3 text-sm leading-6 text-white/80">
            <LocalizedText
              en="This website is intended to provide public information about school activities, admissions, notices, and services. Content should be verified with the school office for official submission needs."
              hi="à¤¯à¤¹ à¤µà¥‡à¤¬à¤¸à¤¾à¤‡à¤Ÿ à¤µà¤¿à¤¦à¥à¤¯à¤¾à¤²à¤¯ à¤•à¥€ à¤—à¤¤à¤¿à¤µà¤¿à¤§à¤¿à¤¯à¥‹à¤‚, à¤ªà¥à¤°à¤µà¥‡à¤¶, à¤¸à¥‚à¤šà¤¨à¤¾à¤“à¤‚ à¤”à¤° à¤¸à¥‡à¤µà¤¾à¤“à¤‚ à¤¸à¥‡ à¤¸à¤‚à¤¬à¤‚à¤§à¤¿à¤¤ à¤¸à¤¾à¤°à¥à¤µà¤œà¤¨à¤¿à¤• à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤¦à¥‡à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤¹à¥ˆà¥¤ à¤†à¤§à¤¿à¤•à¤¾à¤°à¤¿à¤• à¤‰à¤ªà¤¯à¥‹à¤— à¤•à¥‡ à¤²à¤¿à¤ à¤¸à¤¾à¤®à¤—à¥à¤°à¥€ à¤•à¥€ à¤ªà¥à¤·à¥à¤Ÿà¤¿ à¤µà¤¿à¤¦à¥à¤¯à¤¾à¤²à¤¯ à¤•à¤¾à¤°à¥à¤¯à¤¾à¤²à¤¯ à¤¸à¥‡ à¤•à¤°à¥‡à¤‚à¥¤"
            />
          </p>
        </div>
      </div>
    </footer>
  );
}
