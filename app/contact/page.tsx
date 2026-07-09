import { ContactForm } from "@/components/site/contact-form";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { getSiteSettings } from "@/lib/content";

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <SiteHeader settings={settings} />
      <PageHero title="Contact" subtitle="Reach the school office for admissions, notices, support, or general information." />
      <Section title="Office Contact" description="Parents and visitors can use the form below or reach out directly through the office channels.">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-3xl border border-border bg-white p-6 shadow-card">
            <p className="font-heading text-xl font-semibold text-primary">School Office</p>
            <p className="mt-4 text-sm leading-7 text-muted">{settings.address}</p>
            <p className="mt-2 text-sm text-muted">Phone: {settings.phone}</p>
            <p className="mt-2 text-sm text-muted">Email: {settings.email}</p>
            <p className="mt-2 text-sm text-muted">Hours: {settings.officeTimings}</p>
            <div className="mt-5 overflow-hidden rounded-3xl border border-border">
              <iframe className="h-[260px] w-full" loading="lazy" src={settings.mapEmbedUrl} title="School Map" />
            </div>
          </div>
          <ContactForm />
        </div>
      </Section>
      <SiteFooter settings={settings} />
    </div>
  );
}

