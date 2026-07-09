import { LocalizedText } from "@/components/site/localized-text";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { getSiteSettings } from "@/lib/content";

const facilities = [
  { en: "Smart Classrooms", hi: "à¤¸à¥à¤®à¤¾à¤°à¥à¤Ÿ à¤•à¤•à¥à¤·à¤¾à¤à¤‚" },
  { en: "Science Lab", hi: "à¤µà¤¿à¤œà¥à¤žà¤¾à¤¨ à¤ªà¥à¤°à¤¯à¥‹à¤—à¤¶à¤¾à¤²à¤¾" },
  { en: "Computer Access", hi: "à¤•à¤‚à¤ªà¥à¤¯à¥‚à¤Ÿà¤° à¤¸à¥à¤µà¤¿à¤§à¤¾" },
  { en: "Library", hi: "à¤ªà¥à¤¸à¥à¤¤à¤•à¤¾à¤²à¤¯" },
  { en: "Sports Facilities", hi: "à¤–à¥‡à¤² à¤¸à¥à¤µà¤¿à¤§à¤¾à¤à¤‚" },
  { en: "Safe Campus Support", hi: "à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤ªà¤°à¤¿à¤¸à¤° à¤¸à¤¹à¤¯à¥‹à¤—" }
];

export const dynamic = "force-dynamic";

export default async function FacilitiesPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <SiteHeader settings={settings} />
      <PageHero
        title={<LocalizedText en="Facilities" hi="à¤¸à¥à¤µà¤¿à¤§à¤¾à¤à¤‚" />}
        subtitle={<LocalizedText en="A clear overview of the school's physical and academic support infrastructure." hi="à¤µà¤¿à¤¦à¥à¤¯à¤¾à¤²à¤¯ à¤•à¥€ à¤­à¥Œà¤¤à¤¿à¤• à¤”à¤° à¤¶à¥ˆà¤•à¥à¤·à¤£à¤¿à¤• à¤¸à¤¹à¤¯à¥‹à¤— à¤…à¤§à¥‹à¤¸à¤‚à¤°à¤šà¤¨à¤¾ à¤•à¤¾ à¤¸à¥à¤ªà¤·à¥à¤Ÿ à¤ªà¤°à¤¿à¤šà¤¯à¥¤" />}
      />
      <Section
        title={<LocalizedText en="Infrastructure Snapshot" hi="à¤…à¤§à¥‹à¤¸à¤‚à¤°à¤šà¤¨à¤¾ à¤•à¥€ à¤à¤²à¤•" />}
        description={<LocalizedText en="Each card can later be expanded with real photographs, timings, usage notes, and maintenance details." hi="à¤ªà¥à¤°à¤¤à¥à¤¯à¥‡à¤• à¤•à¤¾à¤°à¥à¤¡ à¤•à¥‹ à¤†à¤—à¥‡ à¤µà¤¾à¤¸à¥à¤¤à¤µà¤¿à¤• à¤«à¥‹à¤Ÿà¥‹, à¤¸à¤®à¤¯, à¤‰à¤ªà¤¯à¥‹à¤— à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤”à¤° à¤°à¤–à¤°à¤–à¤¾à¤µ à¤µà¤¿à¤µà¤°à¤£ à¤¸à¥‡ à¤µà¤¿à¤¸à¥à¤¤à¥ƒà¤¤ à¤•à¤¿à¤¯à¤¾ à¤œà¤¾ à¤¸à¤•à¤¤à¤¾ à¤¹à¥ˆà¥¤" />}
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {facilities.map((item) => (
            <div key={item.en} className="rounded-3xl border border-border bg-white p-6 shadow-card">
              <h3 className="font-heading text-xl font-semibold text-primary">
                <LocalizedText en={item.en} hi={item.hi} />
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                <LocalizedText en="Brief descriptive content goes here so families can understand the student environment quickly." hi="à¤¯à¤¹à¤¾à¤‚ à¤¸à¤‚à¤•à¥à¤·à¤¿à¤ªà¥à¤¤ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤¦à¥€ à¤œà¤¾ à¤¸à¤•à¤¤à¥€ à¤¹à¥ˆ à¤¤à¤¾à¤•à¤¿ à¤ªà¤°à¤¿à¤µà¤¾à¤° à¤›à¤¾à¤¤à¥à¤° à¤µà¤¾à¤¤à¤¾à¤µà¤°à¤£ à¤•à¥‹ à¤œà¤²à¥à¤¦à¥€ à¤¸à¤®à¤ à¤¸à¤•à¥‡à¤‚à¥¤" />
              </p>
            </div>
          ))}
        </div>
      </Section>
      <SiteFooter settings={settings} />
    </div>
  );
}
