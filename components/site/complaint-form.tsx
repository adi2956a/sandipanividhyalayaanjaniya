"use client";

import { useState } from "react";
import { ComplaintCategory, ComplaintRole } from "@/lib/types";

const categories: { value: ComplaintCategory; label: string }[] = [
  { value: "bullying", label: "Bullying / Ragging" },
  { value: "teacher-conduct", label: "Teacher Conduct" },
  { value: "infrastructure", label: "Infrastructure Issue" },
  { value: "academic", label: "Academic Concern" },
  { value: "safety", label: "Safety Concern" },
  { value: "fee-related", label: "Fee Related" },
  { value: "other", label: "Other" }
];

const initialForm = {
  submittedBy: "student" as ComplaintRole,
  category: "academic" as ComplaintCategory,
  classSection: "",
  message: "",
  optionalContact: ""
};

export function ComplaintForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setStatus("");

    const response = await fetch("/api/complaints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await response.json();

    if (!response.ok) {
      setStatus(data.error ?? "Unable to submit right now.");
      setSaving(false);
      return;
    }

    setTrackingId(data.trackingId);
    setForm(initialForm);
    setSaving(false);
  }

  async function handleCopy() {
    if (!trackingId) return;
    await navigator.clipboard.writeText(trackingId);
    setStatus("Tracking ID copied.");
  }

  if (trackingId) {
    return (
      <div className="rounded-[2rem] border border-[#d9dbe8] bg-white p-8 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#63708b]">Submission Received</p>
        <h2 className="mt-3 font-heading text-3xl font-semibold text-[#1f2940]">Save this tracking ID</h2>
        <div className="mt-6 rounded-3xl border border-[#d9dbe8] bg-[#f7f7fb] p-6 text-center">
          <p className="font-heading text-4xl font-bold tracking-[0.12em] text-[#1f2940]">{trackingId}</p>
        </div>
        <p className="mt-4 text-sm leading-6 text-[#5e687d]">
          The school takes every submission seriously. Keep this ID safe to check your status later without sharing your name or logging in.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="rounded-full bg-[#1f2940] px-5 py-3 font-semibold text-white" type="button" onClick={() => void handleCopy()}>
            Copy Tracking ID
          </button>
          <a className="rounded-full border border-[#d9dbe8] px-5 py-3 font-semibold text-[#1f2940]" href="/complaints/track">
            Track Status
          </a>
        </div>
        {status ? <p className="mt-4 text-sm text-[#5e687d]">{status}</p> : null}
      </div>
    );
  }

  return (
    <form className="rounded-[2rem] border border-[#d9dbe8] bg-white p-8 shadow-card" onSubmit={handleSubmit}>
      <div className="rounded-3xl border border-[#e7e9f2] bg-[#f8f8fc] p-4 text-sm text-[#5e687d]">
        No names, no login. Your identity is never recorded unless you choose to leave optional contact information for a direct reply.
      </div>

      <div className="mt-6 grid gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#63708b]">I Am A</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {(["student", "parent"] as ComplaintRole[]).map((role) => (
              <button
                key={role}
                className={`rounded-full px-5 py-3 font-semibold transition ${
                  form.submittedBy === role ? "bg-[#1f2940] text-white" : "border border-[#d9dbe8] bg-white text-[#1f2940]"
                }`}
                type="button"
                onClick={() => setForm((current) => ({ ...current, submittedBy: role }))}
              >
                {role === "student" ? "Student" : "Parent"}
              </button>
            ))}
          </div>
        </div>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-[#1f2940]">Category</span>
          <select
            className="rounded-2xl border border-[#d9dbe8] px-4 py-3"
            value={form.category}
            onChange={(event) => setForm((current) => ({ ...current, category: event.target.value as ComplaintCategory }))}
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-[#1f2940]">Class / Section (optional)</span>
          <input
            className="rounded-2xl border border-[#d9dbe8] px-4 py-3"
            placeholder="For example: Class 10-B"
            value={form.classSection}
            onChange={(event) => setForm((current) => ({ ...current, classSection: event.target.value }))}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-[#1f2940]">Your Message</span>
          <textarea
            required
            className="min-h-[180px] rounded-2xl border border-[#d9dbe8] px-4 py-3"
            placeholder="Share what happened, where it happened, and what support you need."
            value={form.message}
            onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-[#1f2940]">Optional Contact</span>
          <input
            className="rounded-2xl border border-[#d9dbe8] px-4 py-3"
            placeholder="Optional - only if you'd like a direct reply"
            value={form.optionalContact}
            onChange={(event) => setForm((current) => ({ ...current, optionalContact: event.target.value }))}
          />
        </label>

        <div className="flex flex-wrap items-center gap-4">
          <button className="rounded-full bg-[#1f2940] px-6 py-3 font-semibold text-white" disabled={saving} type="submit">
            {saving ? "Submitting..." : "Submit Anonymously"}
          </button>
          {status ? <p className="text-sm text-[#5e687d]">{status}</p> : null}
        </div>
      </div>
    </form>
  );
}
