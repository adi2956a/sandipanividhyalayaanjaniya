"use client";

import { useEffect, useState } from "react";
import { DownloadCategory, DownloadItem } from "@/lib/types";

const initialForm = {
  title: "",
  category: "admission-form" as DownloadCategory,
  fileUrl: ""
};

export function DownloadsManager() {
  const [items, setItems] = useState<DownloadItem[]>([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadItems() {
    setLoading(true);
    const response = await fetch("/api/downloads", { cache: "no-store" });
    const data = await response.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    void loadItems();
  }, []);

  function resetForm() {
    setForm(initialForm);
    setEditingId(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setStatus("");

    const response = await fetch(editingId ? `/api/downloads/${editingId}` : "/api/downloads", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (!response.ok) {
      setStatus("Unable to save download.");
      setSaving(false);
      return;
    }

    await loadItems();
    resetForm();
    setStatus(editingId ? "Download updated." : "Download created.");
    setSaving(false);
  }

  async function handleDelete(id?: string) {
    if (!id) return;
    const response = await fetch(`/api/downloads/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setStatus("Unable to delete download.");
      return;
    }

    if (editingId === id) resetForm();
    await loadItems();
    setStatus("Download deleted.");
  }

  function handleEdit(item: DownloadItem) {
    setEditingId(item._id ?? null);
    setForm({
      title: item.title,
      category: item.category,
      fileUrl: item.fileUrl
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <form className="rounded-3xl border border-border p-6" onSubmit={handleSubmit}>
        <h2 className="font-heading text-xl font-semibold text-primary">{editingId ? "Edit Download" : "Add Download"}</h2>
        <div className="mt-4 grid gap-4">
          <input className="rounded-2xl border border-border px-4 py-3" placeholder="Title" required value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
          <select className="rounded-2xl border border-border px-4 py-3" value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value as DownloadCategory }))}>
            <option value="admission-form">admission-form</option>
            <option value="calendar">calendar</option>
            <option value="prospectus">prospectus</option>
            <option value="circular">circular</option>
            <option value="govt-order">govt-order</option>
          </select>
          <input className="rounded-2xl border border-border px-4 py-3" placeholder="Google Drive Share Link" required value={form.fileUrl} onChange={(event) => setForm((current) => ({ ...current, fileUrl: event.target.value }))} />
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-primary px-5 py-3 font-semibold text-white" disabled={saving} type="submit">
              {saving ? "Saving..." : editingId ? "Update Download" : "Save Download"}
            </button>
            {editingId ? (
              <button className="rounded-full border border-border px-5 py-3 font-semibold text-primary" type="button" onClick={resetForm}>
                Cancel Edit
              </button>
            ) : null}
          </div>
          {status ? <p className="text-sm text-muted">{status}</p> : null}
        </div>
      </form>

      <div className="rounded-3xl border border-border p-6">
        <h2 className="font-heading text-xl font-semibold text-primary">Stored Downloads</h2>
        {loading ? <p className="mt-4 text-sm text-muted">Loading downloads...</p> : null}
        {!loading && !items.length ? <p className="mt-4 text-sm text-muted">No downloads found in MongoDB.</p> : null}
        <div className="mt-4 grid gap-4">
          {items.map((item) => (
            <div key={item._id ?? item.title} className="rounded-2xl border border-border p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-semibold text-primary">{item.title}</p>
                  <p className="mt-1 text-xs uppercase text-muted">{item.category}</p>
                  <p className="mt-2 text-xs break-all text-muted">{item.fileUrl}</p>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-full border border-border px-3 py-1 text-sm text-primary" type="button" onClick={() => handleEdit(item)}>
                    Edit
                  </button>
                  <button className="rounded-full border border-red-200 px-3 py-1 text-sm text-red-600" type="button" onClick={() => void handleDelete(item._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
