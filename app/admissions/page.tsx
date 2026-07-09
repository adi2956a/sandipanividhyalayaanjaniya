import { LocalizedText } from "@/components/site/localized-text";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdmissionsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <SiteHeader settings={settings} />
      <PageHero
        title={<LocalizedText en="Admissions" hi="प्रवेश" />}
        subtitle={<LocalizedText en="Admission steps, eligibility, required documents, schedule notes, and parent FAQs collected in one place." hi="प्रवेश प्रक्रिया, पात्रता, आवश्यक दस्तावेज़, समय-सारणी और अभिभावक प्रश्न एक ही स्थान पर।" />}
      />
      <Section
        title={<LocalizedText en="Admission Process" hi="प्रवेश प्रक्रिया" />}
        description={<LocalizedText en="This page is intentionally structured for low-admin upkeep while covering the usual items parents ask for." hi="यह पृष्ठ प्रशासनिक देखभाल को सरल रखते हुए अभिभावकों के सामान्य प्रश्नों को कवर करता है।" />}
      >
        <div className="grid gap-5 md:grid-cols-2">
          {[
            { en: "Eligibility Criteria", hi: "पात्रता मानदंड" },
            { en: "Documents Required", hi: "आवश्यक दस्तावेज़" },
            { en: "Application Schedule", hi: "आवेदन समय-सारणी" },
            { en: "Frequently Asked Questions", hi: "अक्सर पूछे जाने वाले प्रश्न" }
          ].map((item) => (
            <div key={item.en} className="rounded-3xl border border-border bg-white p-6 shadow-card">
              <h3 className="font-heading text-xl font-semibold text-primary">
                <LocalizedText en={item.en} hi={item.hi} />
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                <LocalizedText en="Replace this placeholder with official admission content and local requirements." hi="इस स्थान पर आधिकारिक प्रवेश जानकारी और स्थानीय आवश्यकताएं जोड़ें।" />
              </p>
            </div>
          ))}
        </div>
      </Section>
      <SiteFooter settings={settings} />
    </div>
  );
}
