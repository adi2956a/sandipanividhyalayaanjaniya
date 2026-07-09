import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { getSiteSettings } from "@/lib/content";

export default async function AcademicsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <SiteHeader settings={settings} />
      <PageHero title="Academics" subtitle="Curriculum highlights, learning stages, school routines, and calendar guidance in a compact, maintainable format." />
      <Section title="Learning Pathways" description="Academic content can be grouped by primary, middle, and secondary levels without splitting into many separate pages.">
        <div className="grid gap-5 md:grid-cols-3">
          {["Primary", "Middle", "Secondary"].map((level) => (
            <div key={level} className="rounded-3xl border border-border bg-white p-6 shadow-card">
              <h3 className="font-heading text-xl font-semibold text-primary">{level}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">Add curriculum summaries, subject coverage, and examination guidance here.</p>
            </div>
          ))}
        </div>
      </Section>
      <Section muted title="Academic Calendar" description="Important dates, examinations, and term activities can be listed here or linked through the downloads section.">
        <div className="rounded-3xl border border-border bg-white p-6 shadow-card">
          <p className="text-sm leading-7 text-muted">Use the Downloads page for printable calendars and this page for narrative guidance on the academic year.</p>
        </div>
      </Section>
      <SiteFooter settings={settings} />
    </div>
  );
}

