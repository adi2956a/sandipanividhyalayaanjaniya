"use client";

import { useEffect, useState } from "react";
import { NoticeItem, NoticeType } from "@/lib/types";

const initialForm = {
  title: "",
  titleHi: "",
  type: "news" as NoticeType,
  description: "",
  fileUrl: "",
  eventDate: "",
  isPinned: false
};

export function NoticesManager() {
  const [items, setItems] = useState<NoticeItem[]>([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadItems() {
    setLoading(true);
    const response = await fetch("/api/notices", { cache: "no-store" });
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

    const payload = {
      ...form,
      titleHi: form.titleHi || undefined,
      fileUrl: form.fileUrl || undefined,
      eventDate: form.eventDate || undefined
    };

    const response = await fetch(editingId ? `/api/notices/${editingId}` : "/api/notices", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      setStatus("Unable to save notice.");
      setSaving(false);
      return;
    }

    await loadItems();
    resetForm();
    setStatus(editingId ? "Notice updated." : "Notice created.");
    setSaving(false);
  }

  async function handleDelete(id?: string) {
    if (!id) return;

    const response = await fetch(`/api/notices/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setStatus("Unable to delete notice.");
      return;
    }

    if (editingId === id) resetForm();
    await loadItems();
    setStatus("Notice deleted.");
  }

  function handleEdit(item: NoticeItem) {
    setEditingId(item._id ?? null);
    setForm({
      title: item.title,
      titleHi: item.titleHi ?? "",
      type: item.type,
      description: item.description,
      fileUrl: item.fileUrl ?? "",
      eventDate: item.eventDate ? item.eventDate.slice(0, 10) : "",
      isPinned: Boolean(item.isPinned)
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <form className="rounded-3xl border border-border p-6" onSubmit={handleSubmit}>
        <h2 className="font-heading text-xl font-semibold text-primary">{editingId ? "Edit Notice" : "Add Notice"}</h2>
        <div className="mt-4 grid gap-4">
          <input className="rounded-2xl border border-border px-4 py-3" placeholder="Title" required value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
          <input className="rounded-2xl border border-border px-4 py-3" placeholder="Hindi Title (Optional)" value={form.titleHi} onChange={(event) => setForm((current) => ({ ...current, titleHi: event.target.value }))} />
          <select className="rounded-2xl border border-border px-4 py-3" value={form.type} onChange={(event) => setForm((current) => ({ ...current, type: event.target.value as NoticeType }))}>
            <option value="news">news</option>
            <option value="circular">circular</option>
            <option value="holiday">holiday</option>
            <option value="event">event</option>
          </select>
          <textarea className="min-h-28 rounded-2xl border border-border px-4 py-3" placeholder="Description" required value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} />
          <input className="rounded-2xl border border-border px-4 py-3" placeholder="Google Drive / PDF Link" value={form.fileUrl} onChange={(event) => setForm((current) => ({ ...current, fileUrl: event.target.value }))} />
          <input className="rounded-2xl border border-border px-4 py-3" type="date" value={form.eventDate} onChange={(event) => setForm((current) => ({ ...current, eventDate: event.target.value }))} />
          <label className="flex items-center gap-3 text-sm text-muted">
            <input checked={form.isPinned} type="checkbox" onChange={(event) => setForm((current) => ({ ...current, isPinned: event.target.checked }))} />
            Pin this notice on top
          </label>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-primary px-5 py-3 font-semibold text-white" disabled={saving} type="submit">
              {saving ? "Saving..." : editingId ? "Update Notice" : "Save Notice"}
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
        <h2 className="font-heading text-xl font-semibold text-primary">Published Notices</h2>
        {loading ? <p className="mt-4 text-sm text-muted">Loading notices...</p> : null}
        {!loading && !items.length ? <p className="mt-4 text-sm text-muted">No notices found in MongoDB.</p> : null}
        <div className="mt-4 grid gap-4">
          {items.map((item) => (
            <div key={item._id ?? item.title} className="rounded-2xl border border-border p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-primary">{item.title}</p>
                  <p className="mt-1 text-xs uppercase text-muted">{item.type}{item.isPinned ? " • pinned" : ""}</p>
                  <p className="mt-2 text-sm text-muted">{item.description}</p>
                  {item.fileUrl ? <p className="mt-2 text-xs break-all text-muted">{item.fileUrl}</p> : null}
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
