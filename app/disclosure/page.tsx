import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { getSiteSettings } from "@/lib/content";

export default async function DisclosurePage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <SiteHeader settings={settings} />
      <PageHero title="Mandatory Public Disclosure" subtitle="A single-page disclosure layout for compliance content, ready to expand with official data and document links." />
      <Section title="Disclosure Sections" description="This page keeps required compliance information grouped without creating dozens of separate pages.">
        <div className="grid gap-5 md:grid-cols-2">
          {["General Information", "Documents & Information", "Result & Academics", "Infrastructure Details"].map((item) => (
            <div key={item} className="rounded-3xl border border-border bg-white p-6 shadow-card">
              <h3 className="font-heading text-xl font-semibold text-primary">{item}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">Replace with verified disclosure tables, links, and notices as required by the board or department.</p>
            </div>
          ))}
        </div>
      </Section>
      <SiteFooter settings={settings} />
    </div>
  );
}

