import { LocalizedText } from "@/components/site/localized-text";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { getSiteSettings } from "@/lib/content";

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <SiteHeader settings={settings} />
      <PageHero
        title={<LocalizedText en="About the School" hi="विद्यालय के बारे में" />}
        subtitle={<LocalizedText en="Overview, history, vision, mission, and leadership information presented in one accessible page." hi="परिचय, इतिहास, दृष्टि, मिशन और नेतृत्व संबंधी जानकारी एक ही पृष्ठ पर।" />}
      />
      <Section
        title={<LocalizedText en="School Overview" hi="विद्यालय परिचय" />}
        description={<LocalizedText en="Sandipani Vidyalaya, Anjaniya serves students with a focus on inclusion, foundational literacy, discipline, and community trust." hi="संदीपनि विद्यालय, अंजनिया समावेशन, बुनियादी साक्षरता, अनुशासन और सामुदायिक विश्वास पर केंद्रित है।" />}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-white p-6 shadow-card">
            <h3 className="font-heading text-xl font-semibold text-primary">
              <LocalizedText en="Vision" hi="दृष्टि" />
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              <LocalizedText en="To provide equitable, high-quality education that prepares students for academic progress, responsible citizenship, and lifelong learning." hi="ऐसी गुणवत्तापूर्ण और समतामूलक शिक्षा प्रदान करना जो छात्रों को शैक्षणिक प्रगति, जिम्मेदार नागरिकता और आजीवन अधिगम के लिए तैयार करे।" />
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6 shadow-card">
            <h3 className="font-heading text-xl font-semibold text-primary">
              <LocalizedText en="Mission" hi="मिशन" />
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              <LocalizedText en="To build a safe, disciplined, and resource-rich environment where every learner can grow through guidance, values, and opportunity." hi="सुरक्षित, अनुशासित और संसाधन-संपन्न वातावरण बनाना जहां प्रत्येक शिक्षार्थी मार्गदर्शन, मूल्यों और अवसरों से विकसित हो सके।" />
            </p>
          </div>
        </div>
      </Section>
      <Section
        muted
        title={<LocalizedText en="History and Leadership" hi="इतिहास और नेतृत्व" />}
        description={<LocalizedText en="This section can be replaced with verified school history, establishment details, and a fuller principal's note during content population." hi="सामग्री अद्यतन के समय यहां प्रमाणित विद्यालय इतिहास, स्थापना विवरण और प्रधानाचार्य का विस्तृत संदेश जोड़ा जा सकता है।" />}
      >
        <div className="rounded-3xl border border-border bg-white p-6 shadow-card">
          <p className="text-sm leading-7 text-muted">
            <LocalizedText en="The current scaffold keeps these sections editorially simple so the administration can publish quickly and then expand with official content later." hi="वर्तमान संरचना इन अनुभागों को सरल रखती है ताकि प्रशासन शीघ्र प्रकाशन कर सके और बाद में आधिकारिक सामग्री जोड़ सके।" />
          </p>
        </div>
      </Section>
      <SiteFooter settings={settings} />
    </div>
  );
}
