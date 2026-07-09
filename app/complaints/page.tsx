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
      <section className="bg-[#f3f4f8]">
        <div className="mx-auto max-w-5xl px-4 py-14 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#63708b]">Private Support Desk</p>
            <h1 className="mt-4 font-heading text-4xl font-semibold text-[#1f2940]">This is a safe space to speak up</h1>
            <p className="mt-4 text-lg leading-8 text-[#5e687d]">
              No names, no login. Your identity is not recorded here unless you choose to leave optional contact details for a direct reply.
            </p>
          </div>

          <div className="mt-10 grid gap-6">
            <div className="flex flex-col gap-4 rounded-[2rem] border border-[#d9dbe8] bg-white/70 p-6 text-[#1f2940] shadow-card md:flex-row md:items-center md:justify-between">
              <p className="font-medium">Tell us what happened. You will receive a tracking ID to check progress later at any time.</p>
              <a
                className="inline-flex w-fit rounded-full border border-[#c8cede] bg-white px-5 py-3 font-semibold text-[#1f2940] transition hover:bg-[#f7f7fb]"
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
