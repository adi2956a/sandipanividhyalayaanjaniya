import Image from "next/image";
import Link from "next/link";
import { LocalizedText } from "@/components/site/localized-text";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { DownloadCard, GalleryCard, NoticeCard } from "@/components/site/cards";
import { Section } from "@/components/site/section";
import { getDownloads, getGalleryItems, getHomepageContent, getNotices, getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

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

      <section className="bg-[linear-gradient(180deg,rgb(var(--color-surface)),rgb(var(--color-card)))]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              <LocalizedText en="Official School Website" hi="विद्यालय की आधिकारिक वेबसाइट" />
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-primary md:text-5xl">
              <LocalizedText en="Building confident learners for Mandla's next generation." hi="मंडला की अगली पीढ़ी के लिए आत्मविश्वासी शिक्षार्थियों का निर्माण।" />
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{homepage.aboutSummary}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link className="rounded-full bg-accent px-6 py-3 font-semibold text-white" href="/admissions">
                <LocalizedText en="Admissions" hi="प्रवेश" />
              </Link>
              <Link className="rounded-full border border-primary px-6 py-3 font-semibold text-primary" href="/notices">
                <LocalizedText en="Latest Notices" hi="नवीनतम सूचनाएं" />
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

      <Section
        eyebrow={<LocalizedText en="Principal's Desk" hi="प्रधानाचार्य संदेश" />}
        title={<LocalizedText en="A message from the Principal" hi="प्रधानाचार्य का संदेश" />}
        description={homepage.principalMessage.text}
      >
        <div className="grid gap-6 rounded-[2rem] bg-primary p-6 text-white md:grid-cols-[220px_1fr] md:items-center">
          <div className="relative aspect-square overflow-hidden rounded-[1.5rem]">
            <Image alt={homepage.principalMessage.name} fill className="object-cover" sizes="220px" src={homepage.principalMessage.photoUrl} />
          </div>
          <div>
            <p className="font-heading text-2xl font-semibold">{homepage.principalMessage.name}</p>
            <p className="mt-1 text-white/75">{homepage.principalMessage.designation}</p>
            <Link className="mt-5 inline-flex rounded-full border border-secondary px-5 py-2 font-semibold text-white" href="/about">
              <LocalizedText en="Read More" hi="और पढ़ें" />
            </Link>
          </div>
        </div>
      </Section>

      <Section
        eyebrow={<LocalizedText en="Why Choose Us" hi="हमें क्यों चुनें" />}
        title={<LocalizedText en="A disciplined, student-focused campus" hi="अनुशासित और छात्र-केंद्रित परिसर" />}
        description={<LocalizedText en="The school combines public-service values with strong academic routines and broad student support." hi="विद्यालय सार्वजनिक सेवा मूल्यों, मजबूत शैक्षणिक दिनचर्या और व्यापक छात्र सहयोग को साथ लाता है।" />}
      >
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

      <Section
        eyebrow={<LocalizedText en="Facilities" hi="सुविधाएं" />}
        muted
        title={<LocalizedText en="Infrastructure that supports everyday learning" hi="दैनिक शिक्षा को सहयोग देने वाला अधोसंरचना तंत्र" />}
        description={<LocalizedText en="A compact preview of the core services and learning spaces available at the school." hi="विद्यालय में उपलब्ध मुख्य सेवाओं और शिक्षण स्थलों का संक्षिप्त परिचय।" />}
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            { en: "Smart Classrooms", hi: "स्मार्ट कक्षाएं" },
            { en: "Science Lab", hi: "विज्ञान प्रयोगशाला" },
            { en: "Library", hi: "पुस्तकालय" },
            { en: "Sports & Playground", hi: "खेल एवं मैदान" }
          ].map((item) => (
            <div key={item.en} className="rounded-3xl border border-border bg-white p-6 shadow-card">
              <h3 className="font-heading text-xl font-semibold text-primary">
                <LocalizedText en={item.en} hi={item.hi} />
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                <LocalizedText en="Designed to support active learning, safety, and day-to-day academic routines." hi="सक्रिय अधिगम, सुरक्षा और दैनिक शैक्षणिक दिनचर्या को सहयोग देने के लिए विकसित।" />
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow={<LocalizedText en="Updates" hi="अपडेट" />}
        title={<LocalizedText en="Latest Notices" hi="नवीनतम सूचनाएं" />}
        description={<LocalizedText en="Important announcements, circulars, holidays, and events for students and parents." hi="छात्रों और अभिभावकों के लिए महत्वपूर्ण घोषणाएं, परिपत्र, अवकाश और कार्यक्रम।" />}
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {latestNotices.map((notice) => (
            <NoticeCard key={notice._id ?? notice.title} notice={notice} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow={<LocalizedText en="Calendar" hi="कैलेंडर" />}
        muted
        title={<LocalizedText en="Upcoming Events" hi="आगामी कार्यक्रम" />}
        description={<LocalizedText en="Preview of upcoming school activities and engagement opportunities." hi="आगामी विद्यालय गतिविधियों और सहभागिता अवसरों की झलक।" />}
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {upcomingEvents.length ? (
            upcomingEvents.map((notice) => <NoticeCard key={notice._id ?? notice.title} notice={notice} />)
          ) : (
            <p className="text-muted">
              <LocalizedText en="No upcoming events have been posted yet." hi="अभी तक कोई आगामी कार्यक्रम प्रकाशित नहीं किया गया है।" />
            </p>
          )}
        </div>
      </Section>

      <Section
        eyebrow={<LocalizedText en="Achievements" hi="उपलब्धियां" />}
        title={<LocalizedText en="Student and school milestones" hi="छात्र एवं विद्यालय की उपलब्धियां" />}
        description={<LocalizedText en="Snapshots of progress across academics, reading culture, and co-curricular participation." hi="शैक्षणिक प्रगति, पठन संस्कृति और सह-पाठयक्रम सहभागिता की झलकियां।" />}
      >
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

      <Section
        eyebrow={<LocalizedText en="Gallery" hi="गैलरी" />}
        muted
        title={<LocalizedText en="Campus glimpses" hi="परिसर की झलकियां" />}
        description={<LocalizedText en="Recent photos and videos from classrooms, events, and school activities." hi="कक्षाओं, कार्यक्रमों और विद्यालय गतिविधियों की हाल की तस्वीरें और वीडियो।" />}
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {gallery.map((item) => (
            <GalleryCard key={item._id ?? item.title} item={item} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow={<LocalizedText en="Downloads" hi="डाउनलोड" />}
        title={<LocalizedText en="Forms and important documents" hi="फॉर्म और महत्वपूर्ण दस्तावेज़" />}
        description={<LocalizedText en="A few frequently used resources are highlighted here for quick access." hi="त्वरित उपयोग के लिए कुछ महत्वपूर्ण संसाधन यहां दिए गए हैं।" />}
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {downloads.map((item) => (
            <DownloadCard key={item._id ?? item.title} item={item} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow={<LocalizedText en="Schemes" hi="योजनाएं" />}
        muted
        title={<LocalizedText en="Government schemes and support" hi="सरकारी योजनाएं और सहयोग" />}
        description={<LocalizedText en="Students may benefit from scholarships, nutrition, inclusion, and access-related programmes run under state and national initiatives." hi="छात्र छात्रवृत्ति, पोषण, समावेशन और पहुंच संबंधी राज्य एवं राष्ट्रीय योजनाओं से लाभान्वित हो सकते हैं।" />}
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            { en: "RTE Support", hi: "आरटीई सहयोग" },
            { en: "Scholarships", hi: "छात्रवृत्तियां" },
            { en: "Mid-Day Meal", hi: "मिड-डे मील" },
            { en: "Student Welfare", hi: "छात्र कल्याण" }
          ].map((scheme) => (
            <div key={scheme.en} className="rounded-3xl border border-border bg-white p-6 shadow-card">
              <h3 className="font-heading text-lg font-semibold text-primary">
                <LocalizedText en={scheme.en} hi={scheme.hi} />
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                <LocalizedText en="Detailed eligibility and implementation support are available through the school office." hi="विस्तृत पात्रता और क्रियान्वयन सहयोग विद्यालय कार्यालय से उपलब्ध है।" />
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow={<LocalizedText en="Reach Us" hi="हमसे जुड़ें" />}
        title={<LocalizedText en="Contact and location" hi="संपर्क और स्थान" />}
        description={<LocalizedText en="Visit the contact page for a full enquiry form, office details, and map access." hi="पूरी पूछताछ फॉर्म, कार्यालय विवरण और मानचित्र के लिए संपर्क पृष्ठ देखें।" />}
      >
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-border bg-white p-6 shadow-card">
            <p className="font-heading text-xl font-semibold text-primary">
              <LocalizedText en="Office Information" hi="कार्यालय जानकारी" />
            </p>
            <p className="mt-4 text-sm leading-7 text-muted">{settings.address}</p>
            <p className="mt-2 text-sm text-muted">
              <LocalizedText en="Phone" hi="फोन" />: {settings.phone}
            </p>
            <p className="mt-2 text-sm text-muted">
              <LocalizedText en="Email" hi="ईमेल" />: {settings.email}
            </p>
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
