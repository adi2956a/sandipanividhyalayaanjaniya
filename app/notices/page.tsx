import { LocalizedText } from "@/components/site/localized-text";
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
      <PageHero
        title={<LocalizedText en="News & Notices" hi="समाचार और सूचनाएं" />}
        subtitle={<LocalizedText en="Recent updates, circulars, holidays, and events published by the school administration." hi="विद्यालय प्रशासन द्वारा प्रकाशित हाल की सूचनाएं, परिपत्र, अवकाश और कार्यक्रम।" />}
      />
      <Section
        title={<LocalizedText en="All Notices" hi="सभी सूचनाएं" />}
        description={<LocalizedText en="This list can later be extended with search, filters, and pagination." hi="इस सूची को आगे खोज, फिल्टर और पेजिनेशन के साथ विस्तारित किया जा सकता है।" />}
      >
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
