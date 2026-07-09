import { LocalizedText } from "@/components/site/localized-text";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AcademicsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <SiteHeader settings={settings} />
      <PageHero
        title={<LocalizedText en="Academics" hi="शैक्षणिक" />}
        subtitle={<LocalizedText en="Curriculum highlights, learning stages, school routines, and calendar guidance in a compact, maintainable format." hi="पाठ्यक्रम, अध्ययन स्तर, विद्यालय दिनचर्या और शैक्षणिक कैलेंडर की जानकारी एक सरल प्रारूप में।" />}
      />
      <Section
        title={<LocalizedText en="Learning Pathways" hi="अधिगम मार्ग" />}
        description={<LocalizedText en="Academic content can be grouped by primary, middle, and secondary levels without splitting into many separate pages." hi="शैक्षणिक सामग्री को प्राथमिक, माध्यमिक और उच्च स्तरों में व्यवस्थित किया जा सकता है।" />}
      >
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { en: "Primary", hi: "प्राथमिक" },
            { en: "Middle", hi: "मध्य" },
            { en: "Secondary", hi: "माध्यमिक" }
          ].map((level) => (
            <div key={level.en} className="rounded-3xl border border-border bg-white p-6 shadow-card">
              <h3 className="font-heading text-xl font-semibold text-primary">
                <LocalizedText en={level.en} hi={level.hi} />
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                <LocalizedText en="Add curriculum summaries, subject coverage, and examination guidance here." hi="यहां पाठ्यक्रम सार, विषय कवरेज और परीक्षा मार्गदर्शन जोड़ा जा सकता है।" />
              </p>
            </div>
          ))}
        </div>
      </Section>
      <Section
        muted
        title={<LocalizedText en="Academic Calendar" hi="शैक्षणिक कैलेंडर" />}
        description={<LocalizedText en="Important dates, examinations, and term activities can be listed here or linked through the downloads section." hi="महत्वपूर्ण तिथियां, परीक्षाएं और सत्र गतिविधियां यहां या डाउनलोड अनुभाग के माध्यम से दी जा सकती हैं।" />}
      >
        <div className="rounded-3xl border border-border bg-white p-6 shadow-card">
          <p className="text-sm leading-7 text-muted">
            <LocalizedText en="Use the Downloads page for printable calendars and this page for narrative guidance on the academic year." hi="प्रिंट योग्य कैलेंडर के लिए डाउनलोड पृष्ठ और शैक्षणिक वर्ष की जानकारी के लिए यह पृष्ठ उपयोग करें।" />
          </p>
        </div>
      </Section>
      <SiteFooter settings={settings} />
    </div>
  );
}
