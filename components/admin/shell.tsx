import Link from "next/link";
import { ReactNode } from "react";

const adminLinks = [
  { href: "/admin/dashboard", label: "Overview" },
  { href: "/admin/notices", label: "Notices" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/downloads", label: "Downloads" },
  { href: "/admin/homepage", label: "Homepage" },
  { href: "/admin/settings", label: "Settings" }
];

export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[240px_minmax(0,1fr)] md:px-6">
        <aside className="rounded-3xl bg-primary p-6 text-white">
          <p className="font-heading text-xl font-semibold">Admin Panel</p>
          <div className="mt-6 flex flex-col gap-2 text-sm">
            {adminLinks.map((link) => (
              <Link key={link.href} className="rounded-2xl px-4 py-3 transition hover:bg-white/10" href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </aside>
        <main>
          <div className="rounded-3xl bg-white p-8 shadow-card">
            <h1 className="font-heading text-3xl font-semibold text-primary">{title}</h1>
            <div className="mt-6">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}

