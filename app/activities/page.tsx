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
      <PageHero title="Student Activities & Achievements" subtitle="Cultural, academic, sports, and community participation highlights." />
      <Section title="Co-Curricular Life" description="This structure supports school achievements without requiring a separate page for each programme.">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {["Sports", "Cultural Events", "Science Activities", "Community Outreach"].map((item) => (
            <div key={item} className="rounded-3xl border border-border bg-white p-6 shadow-card">
              <h3 className="font-heading text-lg font-semibold text-primary">{item}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">Publish annual highlights, club participation, and recognition summaries here.</p>
            </div>
          ))}
        </div>
      </Section>
      <SiteFooter settings={settings} />
    </div>
  );
}

