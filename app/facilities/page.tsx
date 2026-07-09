import { LocalizedText } from "@/components/site/localized-text";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { getSiteSettings } from "@/lib/content";

const facilities = [
  { en: "Smart Classrooms", hi: "स्मार्ट कक्षाएं" },
  { en: "Science Lab", hi: "विज्ञान प्रयोगशाला" },
  { en: "Computer Access", hi: "कंप्यूटर सुविधा" },
  { en: "Library", hi: "पुस्तकालय" },
  { en: "Sports Facilities", hi: "खेल सुविधाएं" },
  { en: "Safe Campus Support", hi: "सुरक्षित परिसर सहयोग" }
];

export default async function FacilitiesPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <SiteHeader settings={settings} />
      <PageHero
        title={<LocalizedText en="Facilities" hi="सुविधाएं" />}
        subtitle={<LocalizedText en="A clear overview of the school's physical and academic support infrastructure." hi="विद्यालय की भौतिक और शैक्षणिक सहयोग अधोसंरचना का स्पष्ट परिचय।" />}
      />
      <Section
        title={<LocalizedText en="Infrastructure Snapshot" hi="अधोसंरचना की झलक" />}
        description={<LocalizedText en="Each card can later be expanded with real photographs, timings, usage notes, and maintenance details." hi="प्रत्येक कार्ड को आगे वास्तविक फोटो, समय, उपयोग जानकारी और रखरखाव विवरण से विस्तृत किया जा सकता है।" />}
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {facilities.map((item) => (
            <div key={item.en} className="rounded-3xl border border-border bg-white p-6 shadow-card">
              <h3 className="font-heading text-xl font-semibold text-primary">
                <LocalizedText en={item.en} hi={item.hi} />
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                <LocalizedText en="Brief descriptive content goes here so families can understand the student environment quickly." hi="यहां संक्षिप्त जानकारी दी जा सकती है ताकि परिवार छात्र वातावरण को जल्दी समझ सकें।" />
              </p>
            </div>
          ))}
        </div>
      </Section>
      <SiteFooter settings={settings} />
    </div>
  );
}
