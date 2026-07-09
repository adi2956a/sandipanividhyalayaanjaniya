import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { getSiteSettings } from "@/lib/content";

export default async function AdmissionsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <SiteHeader settings={settings} />
      <PageHero title="Admissions" subtitle="Admission steps, eligibility, required documents, schedule notes, and parent FAQs collected in one place." />
      <Section title="Admission Process" description="This page is intentionally structured for low-admin upkeep while covering the usual items parents ask for.">
        <div className="grid gap-5 md:grid-cols-2">
          {["Eligibility Criteria", "Documents Required", "Application Schedule", "Frequently Asked Questions"].map((item) => (
            <div key={item} className="rounded-3xl border border-border bg-white p-6 shadow-card">
              <h3 className="font-heading text-xl font-semibold text-primary">{item}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">Replace this placeholder with official admission content and local requirements.</p>
            </div>
          ))}
        </div>
      </Section>
      <SiteFooter settings={settings} />
    </div>
  );
}

