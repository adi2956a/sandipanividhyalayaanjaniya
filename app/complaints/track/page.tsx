import { ComplaintTracker } from "@/components/site/complaint-tracker";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ComplaintTrackPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <SiteHeader settings={settings} />
      <section className="bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-14 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-secondary">Status Check</p>
            <h1 className="mt-4 font-heading text-4xl font-semibold text-ink">Track your complaint privately</h1>
            <p className="mt-4 text-lg leading-8 text-muted">
              Only an exact tracking ID can open a status update. There is no public listing or browsing of complaints.
            </p>
          </div>
          <div className="mt-10">
            <ComplaintTracker />
          </div>
        </div>
      </section>
      <SiteFooter settings={settings} />
    </div>
  );
}
