import { ComplaintForm } from "@/components/site/complaint-form";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ComplaintsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <SiteHeader settings={settings} />
      <section className="bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-14 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-secondary">Complaint Box</p>
            <h1 className="mt-4 font-heading text-4xl font-semibold text-ink">This is a safe space to speak up</h1>
            <p className="mt-4 text-lg leading-8 text-muted">
              Your identity stays private here. No names and no login are required unless you choose to share optional contact details for a direct reply.
            </p>
          </div>

          <div className="mt-10 grid gap-6">
            <div className="flex flex-col gap-4 rounded-[2rem] border border-border bg-white/70 p-6 text-ink shadow-card md:flex-row md:items-center md:justify-between">
              <p className="font-medium">Tell us what happened. You will receive a tracking ID to check progress later at any time.</p>
              <a
                className="inline-flex w-fit rounded-full border border-border bg-white px-5 py-3 font-semibold text-primary transition hover:bg-surface"
                href="/complaints/track"
              >
                Track Your Complaint
              </a>
            </div>
            <ComplaintForm />
          </div>
        </div>
      </section>
      <SiteFooter settings={settings} />
    </div>
  );
}
