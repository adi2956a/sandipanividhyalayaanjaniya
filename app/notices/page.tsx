import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { NoticeCard } from "@/components/site/cards";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { getNotices, getSiteSettings } from "@/lib/content";

export default async function NoticesPage() {
  const [settings, notices] = await Promise.all([getSiteSettings(), getNotices()]);

  return (
    <div>
      <SiteHeader settings={settings} />
      <PageHero title="News & Notices" subtitle="Recent updates, circulars, holidays, and events published by the school administration." />
      <Section title="All Notices" description="This list can later be extended with search, filters, and pagination.">
        <div className="grid gap-5 lg:grid-cols-2">
          {notices.map((notice) => (
            <NoticeCard key={notice._id ?? notice.title} notice={notice} />
          ))}
        </div>
      </Section>
      <SiteFooter settings={settings} />
    </div>
  );
}

