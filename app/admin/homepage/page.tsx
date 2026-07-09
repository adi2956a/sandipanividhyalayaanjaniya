import { AdminShell } from "@/components/admin/shell";

export default function AdminHomepagePage() {
  return (
    <AdminShell title="Homepage Content">
      <div className="rounded-3xl border border-border p-6">
        <p className="text-sm leading-6 text-muted">Use this section to manage hero slides, principal message, achievements, and why-choose-us cards. The data model is already wired through the `HomepageContent` singleton schema.</p>
      </div>
    </AdminShell>
  );
}

