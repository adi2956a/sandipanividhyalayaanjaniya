import { AdminShell } from "@/components/admin/shell";

export default function AdminGalleryPage() {
  return (
    <AdminShell title="Manage Gallery">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <form className="rounded-3xl border border-border p-6">
          <h2 className="font-heading text-xl font-semibold text-primary">Add Photo / Video</h2>
          <div className="mt-4 grid gap-4">
            <input className="rounded-2xl border border-border px-4 py-3" placeholder="Title" />
            <select className="rounded-2xl border border-border px-4 py-3">
              <option>photo</option>
              <option>video</option>
            </select>
            <input className="rounded-2xl border border-border px-4 py-3" placeholder="Image URL or YouTube Link" />
            <input className="rounded-2xl border border-border px-4 py-3" placeholder="Category" />
            <button className="rounded-full bg-primary px-5 py-3 font-semibold text-white" type="button">
              Save Item
            </button>
          </div>
        </form>
        <div className="rounded-3xl border border-border p-6">
          <h2 className="font-heading text-xl font-semibold text-primary">Media Notes</h2>
          <p className="mt-3 text-sm leading-6 text-muted">Videos should store only the YouTube ID. Photos should store a Cloudinary or blob URL returned after upload.</p>
        </div>
      </div>
    </AdminShell>
  );
}

