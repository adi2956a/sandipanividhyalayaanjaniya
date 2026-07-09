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
            <LocalizedText en="Email" hi="ईमेल" />: {settings.email}
          </p>
          <p className="text-sm text-white/80">
            <LocalizedText en="Phone" hi="फोन" />: {settings.phone}
          </p>
        </div>
        <div>
          <p className="font-heading text-lg font-semibold">
            <LocalizedText en="Quick Links" hi="त्वरित लिंक" />
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-white/80">
            <Link href="/notices">
              <LocalizedText en="Notices & Circulars" hi="सूचनाएं और परिपत्र" />
            </Link>
            <Link href="/downloads">
              <LocalizedText en="Downloads" hi="डाउनलोड" />
            </Link>
            <Link href="/student-resources">
              <LocalizedText en="Student Resources" hi="छात्र संसाधन" />
            </Link>
            <Link href="/complaints">
              <LocalizedText en="Anonymous Complaint Box" hi="गुमनाम शिकायत बॉक्स" />
            </Link>
            <Link href="/disclosure">
              <LocalizedText en="Mandatory Disclosure" hi="अनिवार्य प्रकटीकरण" />
            </Link>
            <Link href="/contact">
              <LocalizedText en="Contact Us" hi="संपर्क करें" />
            </Link>
          </div>
        </div>
        <div>
          <p className="font-heading text-lg font-semibold">
            <LocalizedText en="Important Note" hi="महत्वपूर्ण सूचना" />
          </p>
          <p className="mt-3 text-sm leading-6 text-white/80">
            <LocalizedText
              en="This website is intended to provide public information about school activities, admissions, notices, and services. Content should be verified with the school office for official submission needs."
              hi="यह वेबसाइट विद्यालय की गतिविधियों, प्रवेश, सूचनाओं और सेवाओं से संबंधित सार्वजनिक जानकारी देने के लिए है। आधिकारिक उपयोग के लिए सामग्री की पुष्टि विद्यालय कार्यालय से करें।"
            />
          </p>
        </div>
      </div>
    </footer>
  );
}
