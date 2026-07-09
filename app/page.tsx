import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { DownloadCard, GalleryCard, NoticeCard } from "@/components/site/cards";
import { Section } from "@/components/site/section";
import { getDownloads, getGalleryItems, getHomepageContent, getNotices, getSiteSettings } from "@/lib/content";

export default async function HomePage() {
  const [settings, homepage, notices, gallery, downloads] = await Promise.all([
    getSiteSettings(),
    getHomepageContent(),
    getNotices(),
    getGalleryItems(),
    getDownloads()
  ]);

  const latestNotices = notices.slice(0, 3);
  const upcomingEvents = notices.filter((notice) => notice.type === "event").slice(0, 3);

  return (
    <div>
      <SiteHeader settings={settings} />

      <section className="bg-gradient-to-b from-surface to-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Official School Website</p>
            <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-primary md:text-5xl">
              Building confident learners for Mandla’s next generation.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{homepage.aboutSummary}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link className="rounded-full bg-accent px-6 py-3 font-semibold text-white" href="/admissions">
                Admissions
              </Link>
              <Link className="rounded-full border border-primary px-6 py-3 font-semibold text-primary" href="/notices">
                Latest Notices
              </Link>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {homepage.heroSlides.slice(0, 2).map((slide) => (
              <div key={slide.caption} className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-card">
                <div className="relative aspect-[4/5]">
                  <Image alt={slide.caption} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 25vw" src={slide.imageUrl} />
                </div>
                <p className="p-4 text-sm text-muted">{slide.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section eyebrow="Principal's Desk" title="A message from the Principal" description={homepage.principalMessage.text}>
        <div className="grid gap-6 rounded-[2rem] bg-primary p-6 text-white md:grid-cols-[220px_1fr] md:items-center">
          <div className="relative aspect-square overflow-hidden rounded-[1.5rem]">
            <Image alt={homepage.principalMessage.name} fill className="object-cover" sizes="220px" src={homepage.principalMessage.photoUrl} />
          </div>
          <div>
            <p className="font-heading text-2xl font-semibold">{homepage.principalMessage.name}</p>
            <p className="mt-1 text-white/75">{homepage.principalMessage.designation}</p>
            <Link className="mt-5 inline-flex rounded-full border border-secondary px-5 py-2 font-semibold text-white" href="/about">
              Read More
            </Link>
          </div>
        </div>
      </Section>

      <Section eyebrow="Why Choose Us" title="A disciplined, student-focused campus" description="The school combines public-service values with strong academic routines and broad student support.">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {homepage.whyChooseUs.map((item) => (
            <article key={item.title} className="rounded-3xl border border-border bg-white p-6 shadow-card">
              <div className="text-3xl">{item.icon}</div>
              <h3 className="mt-4 font-heading text-xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Facilities" muted title="Infrastructure that supports everyday learning" description="A compact preview of the core services and learning spaces available at the school.">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {["Smart Classrooms", "Science Lab", "Library", "Sports & Playground"].map((item) => (
            <div key={item} className="rounded-3xl border border-border bg-white p-6 shadow-card">
              <h3 className="font-heading text-xl font-semibold text-primary">{item}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                Designed to support active learning, safety, and day-to-day academic routines.
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Updates" title="Latest Notices" description="Important announcements, circulars, holidays, and events for students and parents.">
        <div className="grid gap-5 lg:grid-cols-3">
          {latestNotices.map((notice) => (
            <NoticeCard key={notice._id ?? notice.title} notice={notice} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Calendar" muted title="Upcoming Events" description="Preview of upcoming school activities and engagement opportunities.">
        <div className="grid gap-5 lg:grid-cols-3">
          {upcomingEvents.length ? (
            upcomingEvents.map((notice) => <NoticeCard key={notice._id ?? notice.title} notice={notice} />)
          ) : (
            <p className="text-muted">No upcoming events have been posted yet.</p>
          )}
        </div>
      </Section>

      <Section eyebrow="Achievements" title="Student and school milestones" description="Snapshots of progress across academics, reading culture, and co-curricular participation.">
        <div className="grid gap-5 lg:grid-cols-3">
          {homepage.achievements.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-3xl border border-border bg-white shadow-card">
              <div className="relative aspect-[4/3]">
                <Image alt={item.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" src={item.imageUrl} />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Gallery" muted title="Campus glimpses" description="Recent photos and videos from classrooms, events, and school activities.">
        <div className="grid gap-5 lg:grid-cols-3">
          {gallery.map((item) => (
            <GalleryCard key={item._id ?? item.title} item={item} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Downloads" title="Forms and important documents" description="A few frequently used resources are highlighted here for quick access.">
        <div className="grid gap-5 lg:grid-cols-3">
          {downloads.map((item) => (
            <DownloadCard key={item._id ?? item.title} item={item} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Schemes" muted title="Government schemes and support" description="Students may benefit from scholarships, nutrition, inclusion, and access-related programmes run under state and national initiatives.">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {["RTE Support", "Scholarships", "Mid-Day Meal", "Student Welfare"].map((scheme) => (
            <div key={scheme} className="rounded-3xl border border-border bg-white p-6 shadow-card">
              <h3 className="font-heading text-lg font-semibold text-primary">{scheme}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">Detailed eligibility and implementation support are available through the school office.</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Reach Us" title="Contact and location" description="Visit the contact page for a full enquiry form, office details, and map access.">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-border bg-white p-6 shadow-card">
            <p className="font-heading text-xl font-semibold text-primary">Office Information</p>
            <p className="mt-4 text-sm leading-7 text-muted">{settings.address}</p>
            <p className="mt-2 text-sm text-muted">Phone: {settings.phone}</p>
            <p className="mt-2 text-sm text-muted">Email: {settings.email}</p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border shadow-card">
            <iframe className="h-[320px] w-full" loading="lazy" src={settings.mapEmbedUrl} title="School Location" />
          </div>
        </div>
      </Section>

      <SiteFooter settings={settings} />
    </div>
  );
}

