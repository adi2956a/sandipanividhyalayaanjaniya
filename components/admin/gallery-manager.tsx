"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { GalleryItem, GalleryType } from "@/lib/types";

const initialForm = {
  title: "",
  type: "photo" as GalleryType,
  imageUrl: "",
  youtubeId: "",
  category: ""
};

export function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadItems() {
    setLoading(true);
    const response = await fetch("/api/gallery", { cache: "no-store" });
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

    const payload =
      form.type === "video"
        ? { title: form.title, type: form.type, youtubeId: form.youtubeId, category: form.category }
        : { title: form.title, type: form.type, imageUrl: form.imageUrl, category: form.category };

    const response = await fetch(editingId ? `/api/gallery/${editingId}` : "/api/gallery", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      setStatus("Unable to save gallery item.");
      setSaving(false);
      return;
    }

    await loadItems();
    resetForm();
    setStatus(editingId ? "Gallery item updated." : "Gallery item created.");
    setSaving(false);
  }

  async function handleDelete(id?: string) {
    if (!id) return;
    const response = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setStatus("Unable to delete gallery item.");
      return;
    }

    if (editingId === id) resetForm();
    await loadItems();
    setStatus("Gallery item deleted.");
  }

  function handleEdit(item: GalleryItem) {
    setEditingId(item._id ?? null);
    setForm({
      title: item.title,
      type: item.type,
      imageUrl: item.imageUrl ?? "",
      youtubeId: item.youtubeId ?? "",
      category: item.category
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <form className="rounded-3xl border border-border p-6" onSubmit={handleSubmit}>
        <h2 className="font-heading text-xl font-semibold text-primary">{editingId ? "Edit Gallery Item" : "Add Photo / Video"}</h2>
        <div className="mt-4 grid gap-4">
          <input className="rounded-2xl border border-border px-4 py-3" placeholder="Title" required value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
          <select className="rounded-2xl border border-border px-4 py-3" value={form.type} onChange={(event) => setForm((current) => ({ ...current, type: event.target.value as GalleryType }))}>
            <option value="photo">photo</option>
            <option value="video">video</option>
          </select>
          {form.type === "photo" ? (
            <input className="rounded-2xl border border-border px-4 py-3" placeholder="Image URL" required value={form.imageUrl} onChange={(event) => setForm((current) => ({ ...current, imageUrl: event.target.value }))} />
          ) : (
            <input className="rounded-2xl border border-border px-4 py-3" placeholder="YouTube Link or ID" required value={form.youtubeId} onChange={(event) => setForm((current) => ({ ...current, youtubeId: event.target.value }))} />
          )}
          <input className="rounded-2xl border border-border px-4 py-3" placeholder="Category" required value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} />
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-primary px-5 py-3 font-semibold text-white" disabled={saving} type="submit">
              {saving ? "Saving..." : editingId ? "Update Item" : "Save Item"}
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
        <h2 className="font-heading text-xl font-semibold text-primary">Existing Gallery Items</h2>
        {loading ? <p className="mt-4 text-sm text-muted">Loading gallery...</p> : null}
        {!loading && !items.length ? <p className="mt-4 text-sm text-muted">No gallery items found in MongoDB.</p> : null}
        <div className="mt-4 grid gap-4">
          {items.map((item) => (
            <div key={item._id ?? item.title} className="rounded-2xl border border-border p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-semibold text-primary">{item.title}</p>
                  <p className="mt-1 text-xs uppercase text-muted">{item.type} • {item.category}</p>
                  {item.type === "photo" && item.imageUrl ? (
                    <div className="relative mt-3 h-24 w-32 overflow-hidden rounded-xl border border-border">
                      <Image alt={item.title} fill className="object-cover" sizes="128px" src={item.imageUrl} />
                    </div>
                  ) : null}
                  {item.type === "video" && item.youtubeId ? <p className="mt-2 text-xs break-all text-muted">{item.youtubeId}</p> : null}
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
