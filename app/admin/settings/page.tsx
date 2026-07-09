import { AdminShell } from "@/components/admin/shell";

export default function AdminSettingsPage() {
  return (
    <AdminShell title="Site Settings">
      <div className="rounded-3xl border border-border p-6">
        <p className="text-sm leading-6 text-muted">Use site settings for school name, Hindi name, address, phone, email, office timings, social links, and the Google Map embed URL.</p>
      </div>
    </AdminShell>
  );
}
