import { LocalizedText } from "@/components/site/localized-text";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { getSiteSettings } from "@/lib/content";

const facultyMembers = [
  {
    name: "Dr. Meena Sharma",
    roleEn: "Principal",
    roleHi: "प्रधानाचार्य",
    departmentEn: "Administration",
    departmentHi: "प्रशासन",
    detailsEn: "Leads academic planning, staff coordination, and parent communication across the campus.",
    detailsHi: "शैक्षणिक योजना, स्टाफ समन्वय और अभिभावक संवाद का नेतृत्व करती हैं।"
  },
  {
    name: "Rajesh Patel",
    roleEn: "Senior Teacher",
    roleHi: "वरिष्ठ शिक्षक",
    departmentEn: "Mathematics",
    departmentHi: "गणित",
    detailsEn: "Handles upper-grade mathematics and supports exam preparation and remedial sessions.",
    detailsHi: "उच्च कक्षाओं के गणित तथा परीक्षा तैयारी और अतिरिक्त सहायता कक्षाएं संभालते हैं।"
  },
  {
    name: "Sushma Verma",
    roleEn: "Teacher",
    roleHi: "शिक्षिका",
    departmentEn: "Science",
    departmentHi: "विज्ञान",
    detailsEn: "Supports practical learning in science with classroom demonstrations and activity-based teaching.",
    detailsHi: "विज्ञान विषय में गतिविधि-आधारित शिक्षण और कक्षा प्रदर्शन के साथ सहयोग करती हैं।"
  },
  {
    name: "Anil Tiwari",
    roleEn: "Teacher",
    roleHi: "शिक्षक",
    departmentEn: "Social Science",
    departmentHi: "सामाजिक विज्ञान",
    detailsEn: "Guides civic studies, history, and school projects linked with local awareness.",
    detailsHi: "नागरिक शास्त्र, इतिहास और स्थानीय जागरूकता से जुड़े विद्यालय प्रकल्पों का मार्गदर्शन करते हैं।"
  },
  {
    name: "Kavita Mishra",
    roleEn: "Accountant",
    roleHi: "लेखाकार",
    departmentEn: "Accounts & Records",
    departmentHi: "लेखा एवं अभिलेख",
    detailsEn: "Maintains office financial records, registers, and daily administrative paperwork.",
    detailsHi: "कार्यालय के वित्तीय अभिलेख, रजिस्टर और दैनिक प्रशासनिक दस्तावेज़ संभालती हैं।"
  },
  {
    name: "Dinesh Yadav",
    roleEn: "Office Assistant",
    roleHi: "कार्यालय सहायक",
    departmentEn: "Student Services",
    departmentHi: "छात्र सेवाएं",
    detailsEn: "Supports certificates, visitors, and day-to-day office coordination for students and families.",
    detailsHi: "प्रमाणपत्र, आगंतुक और छात्रों व परिवारों के लिए दैनिक कार्यालय समन्वय में सहायता करते हैं।"
  }
];

export const dynamic = "force-dynamic";

export default async function FacultiesPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <SiteHeader settings={settings} />
      <PageHero
        title={<LocalizedText en="Faculties" hi="संकाय" />}
        subtitle={
          <LocalizedText
            en="Meet the teaching, accounts, and office team that supports learning and administration."
            hi="शिक्षण, लेखा और कार्यालय टीम से परिचय जो शिक्षण और प्रशासन का सहयोग करती है।"
          />
        }
      />
      <Section
        title={<LocalizedText en="Staff Directory" hi="स्टाफ निर्देशिका" />}
        description={
          <LocalizedText
            en="This section can later include real staff photos, qualifications, subjects, and office timings."
            hi="इस अनुभाग में आगे वास्तविक स्टाफ फोटो, योग्यता, विषय और कार्यालय समय जोड़े जा सकते हैं।"
          />
        }
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {facultyMembers.map((member) => (
            <article key={member.name} className="rounded-3xl border border-border bg-white p-6 shadow-card">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface text-lg font-bold text-primary">
                  {member.name
                    .split(" ")
                    .slice(0, 2)
                    .map((part) => part[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-primary">{member.name}</h3>
                  <p className="text-sm text-secondary">
                    <LocalizedText en={member.roleEn} hi={member.roleHi} />
                  </p>
                </div>
              </div>
              <p className="mt-4 inline-flex rounded-full bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                <LocalizedText en={member.departmentEn} hi={member.departmentHi} />
              </p>
              <p className="mt-4 text-sm leading-6 text-muted">
                <LocalizedText en={member.detailsEn} hi={member.detailsHi} />
              </p>
            </article>
          ))}
        </div>
      </Section>
      <SiteFooter settings={settings} />
    </div>
  );
}
