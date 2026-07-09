"use client";

import { useEffect, useMemo, useState } from "react";
import { ComplaintCategory, ComplaintItem, ComplaintRole, ComplaintStatus } from "@/lib/types";
import { parseSafeDate } from "@/lib/utils";

function formatLabel(value: string) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export function ComplaintsManager() {
  const [items, setItems] = useState<ComplaintItem[]>([]);
  const [selected, setSelected] = useState<ComplaintItem | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [filters, setFilters] = useState({ category: "", status: "", submittedBy: "" });
  const [editState, setEditState] = useState({ status: "submitted" as ComplaintStatus, adminResponse: "" });

  async function loadItems() {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.category) params.set("category", filters.category);
    if (filters.status) params.set("status", filters.status);
    if (filters.submittedBy) params.set("submittedBy", filters.submittedBy);
    const response = await fetch(`/api/complaints?${params.toString()}`, { cache: "no-store" });
    const data = await response.json();
    const nextItems = Array.isArray(data) ? data : [];
    setItems(nextItems);
    if (selected?._id) {
      const refreshed = nextItems.find((item: ComplaintItem) => item._id === selected._id) ?? null;
      setSelected(refreshed);
      if (refreshed) {
        setEditState({ status: refreshed.status, adminResponse: refreshed.adminResponse ?? "" });
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    void loadItems();
  }, [filters.category, filters.status, filters.submittedBy]);

  const stats = useMemo(() => {
    const openItems = items.filter((item) => item.status !== "resolved");
    const resolved = items.filter((item) => item.resolvedAt);
    const averageResolutionHours = resolved.length
      ? Math.round(
          resolved.reduce((sum, item) => {
            const created = parseSafeDate(item.createdAt)?.getTime();
            const resolvedAt = parseSafeDate(item.resolvedAt)?.getTime();

            if (!created || !resolvedAt) return sum;
            return sum + (resolvedAt - created) / (1000 * 60 * 60);
          }, 0) / resolved.length
        )
      : 0;

    return {
      totalOpen: openItems.length,
      averageResolutionHours,
      urgent: items.filter((item) => item.isUrgent).length
    };
  }, [items]);

  async function handleSelect(id?: string) {
    if (!id) return;
    const response = await fetch(`/api/complaints/${id}`, { cache: "no-store" });
    const data = await response.json();
    setSelected(data);
    setEditState({ status: data.status, adminResponse: data.adminResponse ?? "" });
  }

  async function handleSave() {
    if (!selected?._id) return;
    setSaving(true);
    setStatusMessage("");

    const response = await fetch(`/api/complaints/${selected._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editState)
    });

    if (!response.ok) {
      setStatusMessage("Unable to update complaint.");
      setSaving(false);
      return;
    }

    await loadItems();
    setStatusMessage("Complaint updated.");
    setSaving(false);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="rounded-3xl border border-border p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-surface p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">Open</p>
            <p className="mt-2 font-heading text-3xl font-semibold text-primary">{stats.totalOpen}</p>
          </div>
          <div className="rounded-3xl bg-surface p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">Urgent</p>
            <p className="mt-2 font-heading text-3xl font-semibold text-primary">{stats.urgent}</p>
          </div>
          <div className="rounded-3xl bg-surface p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">Avg Resolution</p>
            <p className="mt-2 font-heading text-3xl font-semibold text-primary">{stats.averageResolutionHours}h</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <select className="rounded-2xl border border-border px-4 py-3" value={filters.category} onChange={(event) => setFilters((current) => ({ ...current, category: event.target.value }))}>
            <option value="">All categories</option>
            {(["bullying", "teacher-conduct", "infrastructure", "academic", "safety", "fee-related", "other"] as ComplaintCategory[]).map((category) => (
              <option key={category} value={category}>
                {formatLabel(category)}
              </option>
            ))}
          </select>
          <select className="rounded-2xl border border-border px-4 py-3" value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))}>
            <option value="">All statuses</option>
            {(["submitted", "under-review", "resolved"] as ComplaintStatus[]).map((status) => (
              <option key={status} value={status}>
                {formatLabel(status)}
              </option>
            ))}
          </select>
          <select className="rounded-2xl border border-border px-4 py-3" value={filters.submittedBy} onChange={(event) => setFilters((current) => ({ ...current, submittedBy: event.target.value }))}>
            <option value="">All roles</option>
            {(["student", "parent"] as ComplaintRole[]).map((role) => (
              <option key={role} value={role}>
                {formatLabel(role)}
              </option>
            ))}
          </select>
        </div>

        {loading ? <p className="mt-4 text-sm text-muted">Loading complaints...</p> : null}
        {!loading && !items.length ? <p className="mt-4 text-sm text-muted">No complaints found.</p> : null}

        <div className="mt-4 grid gap-4">
          {items.map((item) => (
            <button
              key={item._id ?? item.trackingId}
              className={`rounded-3xl border p-5 text-left transition ${
                item.isUrgent ? "border-red-200 bg-red-50/60" : "border-border bg-white"
              }`}
              type="button"
              onClick={() => void handleSelect(item._id)}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-heading text-lg font-semibold text-primary">{item.trackingId}</span>
                {item.isUrgent ? <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase text-red-700">Urgent</span> : null}
              </div>
              <p className="mt-2 text-sm text-muted">
                {formatLabel(item.category)} | {formatLabel(item.submittedBy)} | {item.classSection || "No class/section"}
              </p>
              <p className="mt-2 text-sm text-muted">{formatLabel(item.status)}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-border p-6">
        {!selected ? <p className="text-sm text-muted">Select a complaint to review and respond.</p> : null}
        {selected ? (
          <div className="grid gap-5">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted">{selected.trackingId}</p>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-primary">{formatLabel(selected.category)}</h2>
              <p className="mt-2 text-sm text-muted">
                {formatLabel(selected.submittedBy)} | {selected.classSection || "No class/section provided"}
              </p>
              {selected.optionalContact ? <p className="mt-1 text-sm text-muted">Optional contact: {selected.optionalContact}</p> : null}
            </div>

            <div className="rounded-3xl bg-surface p-5">
              <p className="text-sm font-medium text-primary">Complaint message</p>
              <p className="mt-3 whitespace-pre-wrap leading-7 text-ink">{selected.message}</p>
            </div>

            <select className="rounded-2xl border border-border px-4 py-3" value={editState.status} onChange={(event) => setEditState((current) => ({ ...current, status: event.target.value as ComplaintStatus }))}>
              <option value="submitted">Submitted</option>
              <option value="under-review">Under Review</option>
              <option value="resolved">Resolved</option>
            </select>

            <textarea
              className="min-h-[180px] rounded-2xl border border-border px-4 py-3"
              placeholder="Write a response visible to the submitter via tracking ID."
              value={editState.adminResponse}
              onChange={(event) => setEditState((current) => ({ ...current, adminResponse: event.target.value }))}
            />

            <div className="flex flex-wrap items-center gap-4">
              <button className="rounded-full bg-primary px-5 py-3 font-semibold text-white" disabled={saving} type="button" onClick={() => void handleSave()}>
                {saving ? "Saving..." : "Save Response"}
              </button>
              {statusMessage ? <p className="text-sm text-muted">{statusMessage}</p> : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
