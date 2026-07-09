import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { getSiteSettings } from "@/lib/content";

const facilities = ["Smart Classrooms", "Science Lab", "Computer Access", "Library", "Sports Facilities", "Safe Campus Support"];

export default async function FacilitiesPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <SiteHeader settings={settings} />
      <PageHero title="Facilities" subtitle="A clear overview of the school’s physical and academic support infrastructure." />
      <Section title="Infrastructure Snapshot" description="Each card can later be expanded with real photographs, timings, usage notes, and maintenance details.">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {facilities.map((item) => (
            <div key={item} className="rounded-3xl border border-border bg-white p-6 shadow-card">
              <h3 className="font-heading text-xl font-semibold text-primary">{item}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">Brief descriptive content goes here so families can understand the student environment quickly.</p>
            </div>
          ))}
        </div>
      </Section>
      <SiteFooter settings={settings} />
    </div>
  );
}

