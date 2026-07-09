import { AdminShell } from "@/components/admin/shell";

export default function AdminDashboardPage() {
  return (
    <AdminShell title="Dashboard">
      <div className="grid gap-5 md:grid-cols-3">
        {[
          ["Notices", "Publish announcements, circulars, holidays, and events."],
          ["Gallery", "Manage photos and embedded YouTube video entries."],
          ["Downloads", "Paste Google Drive or PDF links for public use."],
          ["Student Resources", "Organize chapter videos, notes, and subject-wise learning material."],
          ["Previous Papers", "Maintain exam paper links by class, subject, year, and exam type."],
          ["Complaints", "Review anonymous submissions, track urgent cases, and post admin responses."]
        ].map(([title, text]) => (
          <div key={title} className="rounded-3xl border border-border bg-surface p-6">
            <h2 className="font-heading text-xl font-semibold text-primary">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
