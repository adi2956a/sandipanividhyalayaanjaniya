import { AdminShell } from "@/components/admin/shell";

export default function AdminDownloadsPage() {
  return (
    <AdminShell title="Manage Downloads">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <form className="rounded-3xl border border-border p-6">
          <h2 className="font-heading text-xl font-semibold text-primary">Add Download</h2>
          <div className="mt-4 grid gap-4">
            <input className="rounded-2xl border border-border px-4 py-3" placeholder="Title" />
            <select className="rounded-2xl border border-border px-4 py-3">
              <option>admission-form</option>
              <option>calendar</option>
              <option>prospectus</option>
              <option>circular</option>
              <option>govt-order</option>
            </select>
            <input className="rounded-2xl border border-border px-4 py-3" placeholder="Google Drive Share Link" />
            <button className="rounded-full bg-primary px-5 py-3 font-semibold text-white" type="button">
              Save Download
            </button>
          </div>
        </form>
        <div className="rounded-3xl border border-border p-6">
          <h2 className="font-heading text-xl font-semibold text-primary">Document Workflow</h2>
          <p className="mt-3 text-sm leading-6 text-muted">Admins can upload files to a shared Drive folder and paste the public link here, keeping hosting simple and low-maintenance.</p>
        </div>
      </div>
    </AdminShell>
  );
}

