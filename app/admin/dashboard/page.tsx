import Link from "next/link";
import { AdminShell } from "@/components/admin/shell";

export default function AdminDashboardPage() {
  return (
    <AdminShell title="Dashboard">
      <div className="grid gap-5 md:grid-cols-3">
        {[
          ["/admin/notices", "Notices", "Publish announcements, circulars, holidays, and events."],
          ["/admin/gallery", "Gallery", "Manage photos and embedded YouTube video entries."],
          ["/admin/downloads", "Downloads", "Paste Google Drive or PDF links for public use."],
          ["/admin/student-resources", "Student Resources", "Organize chapter videos, notes, and subject-wise learning material."],
          ["/admin/previous-papers", "Previous Papers", "Maintain exam paper links by class, subject, year, and exam type."],
          ["/admin/complaints", "Complaints", "Review anonymous submissions, track urgent cases, and post admin responses."]
        ].map(([href, title, text]) => (
          <Link
            key={href}
            className="rounded-3xl border border-border bg-surface p-6 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card"
            href={href}
          >
            <h2 className="font-heading text-xl font-semibold text-primary">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
