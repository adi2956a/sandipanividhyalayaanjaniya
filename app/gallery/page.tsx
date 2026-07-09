import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { GalleryCard } from "@/components/site/cards";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { getGalleryItems, getSiteSettings } from "@/lib/content";

export default async function GalleryPage() {
  const [settings, gallery] = await Promise.all([getSiteSettings(), getGalleryItems()]);

  return (
    <div>
      <SiteHeader settings={settings} />
      <PageHero title="Gallery" subtitle="Photos and videos from school events, academic activities, and campus life." />
      <Section title="Photos & Videos" description="The gallery supports both image URLs and embedded YouTube videos, matching the intended low-cost media workflow.">
        <div className="grid gap-5 lg:grid-cols-3">
          {gallery.map((item) => (
            <GalleryCard key={item._id ?? item.title} item={item} />
          ))}
        </div>
      </Section>
      <SiteFooter settings={settings} />
    </div>
  );
}

