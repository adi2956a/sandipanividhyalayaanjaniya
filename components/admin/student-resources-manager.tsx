"use client";

import { useEffect, useState } from "react";
import { extractYoutubeId } from "@/lib/youtube";
import { ResourceStream, StudentResourceItem } from "@/lib/types";

type VideoDraft = { title: string; url: string };

const initialForm = {
  class: 9,
  stream: "common" as ResourceStream,
  subject: "",
  chapter: "",
  chapterOrder: 0,
  notesPdfUrl: "",
  youtubeLinks: [{ title: "", url: "" }] as VideoDraft[]
};

export function StudentResourcesManager() {
  const [items, setItems] = useState<StudentResourceItem[]>([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [filters, setFilters] = useState({ class: "9", stream: "common", subject: "" });

  async function loadItems() {
    setLoading(true);
    const params = new URLSearchParams({ class: filters.class });
    if (filters.stream) params.set("stream", filters.stream);
    if (filters.subject) params.set("subject", filters.subject);
    const response = await fetch(`/api/student-resources?${params.toString()}`, { cache: "no-store" });
    const data = await response.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    void loadItems();
  }, [filters.class, filters.stream, filters.subject]);

  function resetForm() {
    setForm(initialForm);
    setEditingId(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setStatus("");

    const youtubeLinks = form.youtubeLinks
      .map((item) => ({ title: item.title.trim(), youtubeId: extractYoutubeId(item.url) }))
      .filter((item) => item.youtubeId);

    const payload = {
      class: Number(form.class),
      stream: form.class >= 11 ? form.stream : "common",
      subject: form.subject.trim(),
      chapter: form.chapter.trim(),
      chapterOrder: Number(form.chapterOrder),
      notesPdfUrl: form.notesPdfUrl.trim(),
      youtubeLinks
    };

    const response = await fetch(editingId ? `/api/student-resources/${editingId}` : "/api/student-resources", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      setStatus("Unable to save chapter.");
      setSaving(false);
      return;
    }

    await loadItems();
    resetForm();
    setStatus(editingId ? "Chapter updated." : "Chapter created.");
    setSaving(false);
  }

  async function handleDelete(id?: string) {
    if (!id) return;
    const response = await fetch(`/api/student-resources/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setStatus("Unable to delete chapter.");
      return;
    }
    if (editingId === id) resetForm();
    await loadItems();
    setStatus("Chapter deleted.");
  }

  function handleEdit(item: StudentResourceItem) {
    setEditingId(item._id ?? null);
    setForm({
      class: item.class,
      stream: item.stream,
      subject: item.subject,
      chapter: item.chapter,
      chapterOrder: item.chapterOrder,
      notesPdfUrl: item.notesPdfUrl ?? "",
      youtubeLinks: item.youtubeLinks.length
        ? item.youtubeLinks.map((video) => ({ title: video.title, url: `https://www.youtube.com/watch?v=${video.youtubeId}` }))
        : [{ title: "", url: "" }]
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form className="rounded-3xl border border-border p-6" onSubmit={handleSubmit}>
        <h2 className="font-heading text-xl font-semibold text-primary">{editingId ? "Edit Chapter" : "Add Chapter"}</h2>
        <div className="mt-4 grid gap-4">
          <div className="grid gap-4 md:grid-cols-3">
            <select className="rounded-2xl border border-border px-4 py-3" value={form.class} onChange={(event) => setForm((current) => ({ ...current, class: Number(event.target.value) }))}>
              {[9, 10, 11, 12].map((classValue) => (
                <option key={classValue} value={classValue}>
                  Class {classValue}
                </option>
              ))}
            </select>
            <select
              className="rounded-2xl border border-border px-4 py-3"
              disabled={form.class < 11}
              value={form.class < 11 ? "common" : form.stream}
              onChange={(event) => setForm((current) => ({ ...current, stream: event.target.value as ResourceStream }))}
            >
              <option value="common">Common</option>
              <option value="science">Science</option>
              <option value="commerce">Commerce</option>
              <option value="arts">Arts</option>
            </select>
            <input className="rounded-2xl border border-border px-4 py-3" placeholder="Subject" required value={form.subject} onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))} />
          </div>
          <input className="rounded-2xl border border-border px-4 py-3" placeholder="Chapter name" required value={form.chapter} onChange={(event) => setForm((current) => ({ ...current, chapter: event.target.value }))} />
          <input className="rounded-2xl border border-border px-4 py-3" min={0} placeholder="Chapter order" type="number" value={form.chapterOrder} onChange={(event) => setForm((current) => ({ ...current, chapterOrder: Number(event.target.value) }))} />
          <input className="rounded-2xl border border-border px-4 py-3" placeholder="Notes PDF URL" value={form.notesPdfUrl} onChange={(event) => setForm((current) => ({ ...current, notesPdfUrl: event.target.value }))} />

          <div className="rounded-3xl border border-border p-4">
            <p className="font-semibold text-primary">YouTube Parts</p>
            <div className="mt-4 grid gap-4">
              {form.youtubeLinks.map((video, index) => (
                <div key={`${index}-${video.title}`} className="grid gap-3 md:grid-cols-[1fr_1.3fr_auto]">
                  <input
                    className="rounded-2xl border border-border px-4 py-3"
                    placeholder="Video title"
                    value={video.title}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        youtubeLinks: current.youtubeLinks.map((item, itemIndex) => (itemIndex === index ? { ...item, title: event.target.value } : item))
                      }))
                    }
                  />
                  <input
                    className="rounded-2xl border border-border px-4 py-3"
                    placeholder="Paste YouTube URL"
                    value={video.url}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        youtubeLinks: current.youtubeLinks.map((item, itemIndex) => (itemIndex === index ? { ...item, url: event.target.value } : item))
                      }))
                    }
                  />
                  <button
                    className="rounded-full border border-red-200 px-4 py-3 text-sm text-red-600"
                    type="button"
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        youtubeLinks: current.youtubeLinks.length > 1 ? current.youtubeLinks.filter((_, itemIndex) => itemIndex !== index) : [{ title: "", url: "" }]
                      }))
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                className="w-fit rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary"
                type="button"
                onClick={() => setForm((current) => ({ ...current, youtubeLinks: [...current.youtubeLinks, { title: "", url: "" }] }))}
              >
                Add Video Part
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-primary px-5 py-3 font-semibold text-white" disabled={saving} type="submit">
              {saving ? "Saving..." : editingId ? "Update Chapter" : "Save Chapter"}
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
        <div className="grid gap-4 md:grid-cols-3">
          <select className="rounded-2xl border border-border px-4 py-3" value={filters.class} onChange={(event) => setFilters((current) => ({ ...current, class: event.target.value }))}>
            {[9, 10, 11, 12].map((classValue) => (
              <option key={classValue} value={classValue}>
                Class {classValue}
              </option>
            ))}
          </select>
          <select className="rounded-2xl border border-border px-4 py-3" value={filters.stream} onChange={(event) => setFilters((current) => ({ ...current, stream: event.target.value }))}>
            <option value="common">Common</option>
            <option value="science">Science</option>
            <option value="commerce">Commerce</option>
            <option value="arts">Arts</option>
          </select>
          <input className="rounded-2xl border border-border px-4 py-3" placeholder="Filter subject" value={filters.subject} onChange={(event) => setFilters((current) => ({ ...current, subject: event.target.value }))} />
        </div>
        {loading ? <p className="mt-4 text-sm text-muted">Loading chapters...</p> : null}
        {!loading && !items.length ? <p className="mt-4 text-sm text-muted">No chapters found.</p> : null}
        <div className="mt-4 grid gap-4">
          {items.map((item) => (
            <div key={item._id ?? `${item.subject}-${item.chapter}`} className="rounded-2xl border border-border p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-semibold text-primary">{item.chapter}</p>
                  <p className="mt-1 text-xs uppercase text-muted">
                    Class {item.class} / {item.stream} / {item.subject}
                  </p>
                  <p className="mt-2 text-xs text-muted">Videos: {item.youtubeLinks.length}</p>
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
