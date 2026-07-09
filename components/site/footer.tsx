import Link from "next/link";
import { SiteSettings } from "@/lib/types";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <p className="font-heading text-xl font-semibold">{settings.schoolName}</p>
          <p className="mt-3 text-sm text-white/80">{settings.address}</p>
          <p className="mt-2 text-sm text-white/80">Email: {settings.email}</p>
          <p className="text-sm text-white/80">Phone: {settings.phone}</p>
        </div>
        <div>
          <p className="font-heading text-lg font-semibold">Quick Links</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-white/80">
            <Link href="/notices">Notices & Circulars</Link>
            <Link href="/downloads">Downloads</Link>
            <Link href="/disclosure">Mandatory Disclosure</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>
        <div>
          <p className="font-heading text-lg font-semibold">Important Note</p>
          <p className="mt-3 text-sm leading-6 text-white/80">
            This website is intended to provide public information about school activities,
            admissions, notices, and services. Content should be verified with the school office
            for official submission needs.
          </p>
        </div>
      </div>
    </footer>
  );
}

