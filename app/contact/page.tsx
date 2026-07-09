import { LocalizedText } from "@/components/site/localized-text";
import { ContactForm } from "@/components/site/contact-form";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <SiteHeader settings={settings} />
      <PageHero
        title={<LocalizedText en="Contact" hi="संपर्क" />}
        subtitle={<LocalizedText en="Reach the school office for admissions, notices, support, or general information." hi="प्रवेश, सूचनाएं, सहायता या सामान्य जानकारी के लिए विद्यालय कार्यालय से संपर्क करें।" />}
      />
      <Section
        title={<LocalizedText en="Office Contact" hi="कार्यालय संपर्क" />}
        description={<LocalizedText en="Parents and visitors can use the form below or reach out directly through the office channels." hi="अभिभावक और आगंतुक नीचे दिए गए फॉर्म या सीधे कार्यालय माध्यमों से संपर्क कर सकते हैं।" />}
      >
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-3xl border border-border bg-white p-6 shadow-card">
            <p className="font-heading text-xl font-semibold text-primary">
              <LocalizedText en="School Office" hi="विद्यालय कार्यालय" />
            </p>
            <p className="mt-4 text-sm leading-7 text-muted">{settings.address}</p>
            <p className="mt-2 text-sm text-muted">
              <LocalizedText en="Phone" hi="फोन" />: {settings.phone}
            </p>
            <p className="mt-2 text-sm text-muted">
              <LocalizedText en="Email" hi="ईमेल" />: {settings.email}
            </p>
            <p className="mt-2 text-sm text-muted">
              <LocalizedText en="Hours" hi="समय" />: {settings.officeTimings}
            </p>
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
