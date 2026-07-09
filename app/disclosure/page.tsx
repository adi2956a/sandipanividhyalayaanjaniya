import { LocalizedText } from "@/components/site/localized-text";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function DisclosurePage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <SiteHeader settings={settings} />
      <PageHero
        title={<LocalizedText en="Mandatory Public Disclosure" hi="अनिवार्य सार्वजनिक प्रकटीकरण" />}
        subtitle={<LocalizedText en="A single-page disclosure layout for compliance content, ready to expand with official data and document links." hi="अनुपालन सामग्री के लिए एकल-पृष्ठ संरचना, जिसे आधिकारिक डेटा और दस्तावेज़ लिंक के साथ विस्तारित किया जा सकता है।" />}
      />
      <Section
        title={<LocalizedText en="Disclosure Sections" hi="प्रकटीकरण अनुभाग" />}
        description={<LocalizedText en="This page keeps required compliance information grouped without creating dozens of separate pages." hi="यह पृष्ठ आवश्यक अनुपालन जानकारी को कई अलग-अलग पृष्ठों के बिना व्यवस्थित रखता है।" />}
      >
        <div className="grid gap-5 md:grid-cols-2">
          {[
            { en: "General Information", hi: "सामान्य जानकारी" },
            { en: "Documents & Information", hi: "दस्तावेज़ और जानकारी" },
            { en: "Result & Academics", hi: "परिणाम और शैक्षणिक" },
            { en: "Infrastructure Details", hi: "अधोसंरचना विवरण" }
          ].map((item) => (
            <div key={item.en} className="rounded-3xl border border-border bg-white p-6 shadow-card">
              <h3 className="font-heading text-xl font-semibold text-primary">
                <LocalizedText en={item.en} hi={item.hi} />
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                <LocalizedText en="Replace with verified disclosure tables, links, and notices as required by the board or department." hi="इसे बोर्ड या विभाग की आवश्यकता अनुसार सत्यापित तालिकाओं, लिंक और सूचनाओं से बदलें।" />
              </p>
            </div>
          ))}
        </div>
      </Section>
      <SiteFooter settings={settings} />
    </div>
  );
}
