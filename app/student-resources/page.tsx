import { Suspense } from "react";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { PageHero } from "@/components/site/page-hero";
import { StudentResourcesPage } from "@/components/site/student-resources-page";
import { getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function StudentResourcesRoute() {
  const settings = await getSiteSettings();

  return (
    <div>
      <SiteHeader settings={settings} />
      <PageHero
        title="Student Resources"
        subtitle="Browse class-wise study material, chapter videos, notes, and previous year papers in one place."
      />
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
          <Suspense fallback={<p className="text-sm text-muted">Loading resources...</p>}>
            <StudentResourcesPage />
          </Suspense>
        </div>
      </section>
      <SiteFooter settings={settings} />
    </div>
  );
}
