import { LocalizedText } from "@/components/site/localized-text";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { DownloadCard } from "@/components/site/cards";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { getDownloads, getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function DownloadsPage() {
  const [settings, downloads] = await Promise.all([getSiteSettings(), getDownloads()]);

  return (
    <div>
      <SiteHeader settings={settings} />
      <PageHero
        title={<LocalizedText en="Downloads" hi="डाउनलोड" />}
        subtitle={<LocalizedText en="Admission forms, calendars, circulars, and other public documents linked from trusted storage services." hi="प्रवेश फॉर्म, कैलेंडर, परिपत्र और अन्य सार्वजनिक दस्तावेज़ यहां उपलब्ध हैं।" />}
      />
      <Section
        title={<LocalizedText en="Available Documents" hi="उपलब्ध दस्तावेज़" />}
        description={<LocalizedText en="Google Drive and external PDF links are supported without adding a separate file server." hi="Google Drive और बाहरी PDF लिंक बिना अलग फाइल सर्वर के समर्थित हैं।" />}
      >
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
