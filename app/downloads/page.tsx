import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { DownloadCard } from "@/components/site/cards";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { getDownloads, getSiteSettings } from "@/lib/content";

export default async function DownloadsPage() {
  const [settings, downloads] = await Promise.all([getSiteSettings(), getDownloads()]);

  return (
    <div>
      <SiteHeader settings={settings} />
      <PageHero title="Downloads" subtitle="Admission forms, calendars, circulars, and other public documents linked from trusted storage services." />
      <Section title="Available Documents" description="Google Drive and external PDF links are supported without adding a separate file server.">
        <div className="grid gap-5 lg:grid-cols-3">
          {downloads.map((item) => (
            <DownloadCard key={item._id ?? item.title} item={item} />
          ))}
        </div>
      </Section>
      <SiteFooter settings={settings} />
    </div>
  );
}

