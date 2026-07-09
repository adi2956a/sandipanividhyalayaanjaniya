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
      <PageHero title="About the School" subtitle="Overview, history, vision, mission, and leadership information presented in one accessible page." />
      <Section title="School Overview" description="Sandipani Vidyalaya, Anjaniya serves students with a focus on inclusion, foundational literacy, discipline, and community trust.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-white p-6 shadow-card">
            <h3 className="font-heading text-xl font-semibold text-primary">Vision</h3>
            <p className="mt-3 text-sm leading-7 text-muted">To provide equitable, high-quality education that prepares students for academic progress, responsible citizenship, and lifelong learning.</p>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6 shadow-card">
            <h3 className="font-heading text-xl font-semibold text-primary">Mission</h3>
            <p className="mt-3 text-sm leading-7 text-muted">To build a safe, disciplined, and resource-rich environment where every learner can grow through guidance, values, and opportunity.</p>
          </div>
        </div>
      </Section>
      <Section muted title="History and Leadership" description="This section can be replaced with verified school history, establishment details, and a fuller principal’s note during content population.">
        <div className="rounded-3xl border border-border bg-white p-6 shadow-card">
          <p className="text-sm leading-7 text-muted">The current scaffold keeps these sections editorially simple so the administration can publish quickly and then expand with official content later.</p>
        </div>
      </Section>
      <SiteFooter settings={settings} />
    </div>
  );
}

