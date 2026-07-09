import Link from "next/link";
import { SiteSettings } from "@/lib/types";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/facilities", label: "Facilities" },
  { href: "/activities", label: "Activities" },
  { href: "/notices", label: "Notices" },
  { href: "/gallery", label: "Gallery" },
  { href: "/downloads", label: "Downloads" },
  { href: "/disclosure", label: "Disclosure" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  return (
    <>
      <div className="bg-primary text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-sm md:px-6">
          <p>School Education Department, Government of Madhya Pradesh</p>
          <p className="hidden md:block">{settings.officeTimings}</p>
        </div>
      </div>
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 md:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-heading text-2xl font-bold text-primary">{settings.schoolName}</p>
            <p className="font-hindi text-sm text-muted">{settings.schoolNameHi}</p>
            <p className="mt-1 text-sm text-muted">{settings.address}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <a className="rounded-full border border-secondary px-4 py-2 font-medium text-primary" href={`tel:${settings.phone}`}>
              {settings.phone}
            </a>
            <a className="rounded-full bg-accent px-4 py-2 font-medium text-white" href="/admissions">
              Apply / Enquire
            </a>
          </div>
        </div>
        <nav className="sticky top-0 z-20 border-t border-border bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-4 py-3 text-sm font-medium md:px-6">
            {navItems.map((item) => (
              <Link key={item.href} className="whitespace-nowrap text-ink transition hover:text-primary" href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
    </>
  );
}

