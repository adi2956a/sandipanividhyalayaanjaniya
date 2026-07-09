"use client";

import { useEffect, useState } from "react";
import { PreviousPaperExamType, PreviousYearPaperItem } from "@/lib/types";

const initialForm = {
  class: 9,
  subject: "",
  year: new Date().getFullYear(),
  examType: "annual" as PreviousPaperExamType,
  fileUrl: ""
};

export function PreviousPapersManager() {
  const [items, setItems] = useState<PreviousYearPaperItem[]>([]);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [filters, setFilters] = useState({ class: "9", subject: "", year: "" });

  async function loadItems() {
    setLoading(true);
    const params = new URLSearchParams({ class: filters.class });
    if (filters.subject) params.set("subject", filters.subject);
    if (filters.year) params.set("year", filters.year);
    const response = await fetch(`/api/previous-papers?${params.toString()}`, { cache: "no-store" });
    const data = await response.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    void loadItems();
  }, [filters.class, filters.subject, filters.year]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setStatus("");

    const response = await fetch("/api/previous-papers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        class: Number(form.class),
        year: Number(form.year)
      })
    });

    if (!response.ok) {
      setStatus("Unable to save paper.");
      setSaving(false);
      return;
    }

    await loadItems();
    setForm(initialForm);
    setStatus("Paper saved.");
    setSaving(false);
  }

  async function handleDelete(id?: string) {
    if (!id) return;
    const response = await fetch(`/api/previous-papers/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setStatus("Unable to delete paper.");
      return;
    }
    await loadItems();
    setStatus("Paper deleted.");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <form className="rounded-3xl border border-border p-6" onSubmit={handleSubmit}>
        <h2 className="font-heading text-xl font-semibold text-primary">Add Previous Paper</h2>
        <div className="mt-4 grid gap-4">
          <select className="rounded-2xl border border-border px-4 py-3" value={form.class} onChange={(event) => setForm((current) => ({ ...current, class: Number(event.target.value) }))}>
            {[9, 10, 11, 12].map((classValue) => (
              <option key={classValue} value={classValue}>
                Class {classValue}
              </option>
            ))}
          </select>
          <input className="rounded-2xl border border-border px-4 py-3" placeholder="Subject" required value={form.subject} onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))} />
          <div className="grid gap-4 md:grid-cols-2">
            <input className="rounded-2xl border border-border px-4 py-3" min={2000} placeholder="Year" required type="number" value={form.year} onChange={(event) => setForm((current) => ({ ...current, year: Number(event.target.value) }))} />
            <select className="rounded-2xl border border-border px-4 py-3" value={form.examType} onChange={(event) => setForm((current) => ({ ...current, examType: event.target.value as PreviousPaperExamType }))}>
              <option value="annual">Annual</option>
              <option value="half-yearly">Half-Yearly</option>
              <option value="pre-board">Pre-Board</option>
              <option value="unit-test">Unit Test</option>
            </select>
          </div>
          <input className="rounded-2xl border border-border px-4 py-3" placeholder="PDF URL" required value={form.fileUrl} onChange={(event) => setForm((current) => ({ ...current, fileUrl: event.target.value }))} />
          <button className="rounded-full bg-primary px-5 py-3 font-semibold text-white" disabled={saving} type="submit">
            {saving ? "Saving..." : "Save Paper"}
          </button>
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
          <input className="rounded-2xl border border-border px-4 py-3" placeholder="Filter subject" value={filters.subject} onChange={(event) => setFilters((current) => ({ ...current, subject: event.target.value }))} />
          <input className="rounded-2xl border border-border px-4 py-3" placeholder="Year" value={filters.year} onChange={(event) => setFilters((current) => ({ ...current, year: event.target.value }))} />
        </div>
        {loading ? <p className="mt-4 text-sm text-muted">Loading papers...</p> : null}
        {!loading && !items.length ? <p className="mt-4 text-sm text-muted">No papers found.</p> : null}
        <div className="mt-4 grid gap-4">
          {items.map((item) => (
            <div key={item._id ?? `${item.subject}-${item.year}-${item.examType}`} className="rounded-2xl border border-border p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-primary">{item.subject}</p>
                  <p className="mt-1 text-xs uppercase text-muted">
                    Class {item.class} / {item.year} / {item.examType}
                  </p>
                  <p className="mt-2 text-xs break-all text-muted">{item.fileUrl}</p>
                </div>
                <button className="rounded-full border border-red-200 px-3 py-1 text-sm text-red-600" type="button" onClick={() => void handleDelete(item._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
