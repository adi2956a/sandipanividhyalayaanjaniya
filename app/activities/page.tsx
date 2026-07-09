import { LocalizedText } from "@/components/site/localized-text";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { getSiteSettings } from "@/lib/content";

export default async function ActivitiesPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <SiteHeader settings={settings} />
      <PageHero
        title={<LocalizedText en="Student Activities & Achievements" hi="छात्र गतिविधियां और उपलब्धियां" />}
        subtitle={<LocalizedText en="Cultural, academic, sports, and community participation highlights." hi="सांस्कृतिक, शैक्षणिक, खेल और सामुदायिक सहभागिता की प्रमुख झलकियां।" />}
      />
      <Section
        title={<LocalizedText en="Co-Curricular Life" hi="सह-पाठयक्रम जीवन" />}
        description={<LocalizedText en="This structure supports school achievements without requiring a separate page for each programme." hi="यह संरचना हर कार्यक्रम के लिए अलग पृष्ठ बनाए बिना विद्यालय उपलब्धियों को प्रस्तुत करती है।" />}
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            { en: "Sports", hi: "खेल" },
            { en: "Cultural Events", hi: "सांस्कृतिक कार्यक्रम" },
            { en: "Science Activities", hi: "विज्ञान गतिविधियां" },
            { en: "Community Outreach", hi: "सामुदायिक सहभागिता" }
          ].map((item) => (
            <div key={item.en} className="rounded-3xl border border-border bg-white p-6 shadow-card">
              <h3 className="font-heading text-lg font-semibold text-primary">
                <LocalizedText en={item.en} hi={item.hi} />
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                <LocalizedText en="Publish annual highlights, club participation, and recognition summaries here." hi="यहां वार्षिक उपलब्धियां, क्लब सहभागिता और सम्मान सारांश प्रकाशित किए जा सकते हैं।" />
              </p>
            </div>
          ))}
        </div>
      </Section>
      <SiteFooter settings={settings} />
    </div>
  );
}
