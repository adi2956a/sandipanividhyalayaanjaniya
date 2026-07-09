import { AdminShell } from "@/components/admin/shell";

export default function AdminNoticesPage() {
  return (
    <AdminShell title="Manage Notices">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <form className="rounded-3xl border border-border p-6">
          <h2 className="font-heading text-xl font-semibold text-primary">Add Notice</h2>
          <div className="mt-4 grid gap-4">
            <input className="rounded-2xl border border-border px-4 py-3" placeholder="Title" />
            <select className="rounded-2xl border border-border px-4 py-3">
              <option>news</option>
              <option>circular</option>
              <option>holiday</option>
              <option>event</option>
            </select>
            <textarea className="min-h-28 rounded-2xl border border-border px-4 py-3" placeholder="Description" />
            <input className="rounded-2xl border border-border px-4 py-3" placeholder="Google Drive / PDF Link" />
            <button className="rounded-full bg-primary px-5 py-3 font-semibold text-white" type="button">
              Save Notice
            </button>
          </div>
        </form>
        <div className="rounded-3xl border border-border p-6">
          <h2 className="font-heading text-xl font-semibold text-primary">Published Notices</h2>
          <p className="mt-3 text-sm leading-6 text-muted">Connect this page to `/api/notices` for full CRUD. The layout is ready for table or card-based management.</p>
        </div>
      </div>
    </AdminShell>
  );
}

