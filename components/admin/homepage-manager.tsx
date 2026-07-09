"use client";

import { useEffect, useState } from "react";
import { HomepageContent } from "@/lib/types";

const initialState = {
  aboutSummary: "",
  principalText: "",
  principalPhotoUrl: "",
  principalName: "",
  principalDesignation: "",
  heroSlidesJson: "[]",
  achievementsJson: "[]",
  whyChooseUsJson: "[]"
};

export function HomepageManager() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadContent() {
      const response = await fetch("/api/homepage", { cache: "no-store" });
      const data = (await response.json()) as HomepageContent;
      setForm({
        aboutSummary: data.aboutSummary ?? "",
        principalText: data.principalMessage?.text ?? "",
        principalPhotoUrl: data.principalMessage?.photoUrl ?? "",
        principalName: data.principalMessage?.name ?? "",
        principalDesignation: data.principalMessage?.designation ?? "",
        heroSlidesJson: JSON.stringify(data.heroSlides ?? [], null, 2),
        achievementsJson: JSON.stringify(data.achievements ?? [], null, 2),
        whyChooseUsJson: JSON.stringify(data.whyChooseUs ?? [], null, 2)
      });
      setLoading(false);
    }

    void loadContent();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setStatus("");

    try {
      const payload: HomepageContent = {
        aboutSummary: form.aboutSummary,
        principalMessage: {
          text: form.principalText,
          photoUrl: form.principalPhotoUrl,
          name: form.principalName,
          designation: form.principalDesignation
        },
        heroSlides: JSON.parse(form.heroSlidesJson),
        achievements: JSON.parse(form.achievementsJson),
        whyChooseUs: JSON.parse(form.whyChooseUsJson)
      };

      const response = await fetch("/api/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        setStatus("Unable to save homepage content.");
        setSaving(false);
        return;
      }

      setStatus("Homepage content updated.");
    } catch {
      setStatus("Invalid JSON in hero slides, achievements, or why-choose-us.");
    }

    setSaving(false);
  }

  return (
    <form className="rounded-3xl border border-border p-6" onSubmit={handleSubmit}>
      <p className="text-sm text-muted">Manage homepage content directly from MongoDB. Array sections use JSON so you can fully edit slides, achievements, and cards.</p>
      {loading ? <p className="mt-4 text-sm text-muted">Loading homepage content...</p> : null}
      <div className="mt-4 grid gap-4">
        <textarea className="min-h-28 rounded-2xl border border-border px-4 py-3" placeholder="About Summary" value={form.aboutSummary} onChange={(event) => setForm((current) => ({ ...current, aboutSummary: event.target.value }))} />
        <textarea className="min-h-28 rounded-2xl border border-border px-4 py-3" placeholder="Principal Message" value={form.principalText} onChange={(event) => setForm((current) => ({ ...current, principalText: event.target.value }))} />
        <div className="grid gap-4 md:grid-cols-3">
          <input className="rounded-2xl border border-border px-4 py-3" placeholder="Principal Photo URL" value={form.principalPhotoUrl} onChange={(event) => setForm((current) => ({ ...current, principalPhotoUrl: event.target.value }))} />
          <input className="rounded-2xl border border-border px-4 py-3" placeholder="Principal Name" value={form.principalName} onChange={(event) => setForm((current) => ({ ...current, principalName: event.target.value }))} />
          <input className="rounded-2xl border border-border px-4 py-3" placeholder="Principal Designation" value={form.principalDesignation} onChange={(event) => setForm((current) => ({ ...current, principalDesignation: event.target.value }))} />
        </div>
        <textarea className="min-h-52 rounded-2xl border border-border px-4 py-3 font-mono text-sm" placeholder='Hero Slides JSON: [{ "imageUrl": "", "caption": "" }]' value={form.heroSlidesJson} onChange={(event) => setForm((current) => ({ ...current, heroSlidesJson: event.target.value }))} />
        <textarea className="min-h-52 rounded-2xl border border-border px-4 py-3 font-mono text-sm" placeholder='Achievements JSON: [{ "title": "", "description": "", "imageUrl": "", "date": "" }]' value={form.achievementsJson} onChange={(event) => setForm((current) => ({ ...current, achievementsJson: event.target.value }))} />
        <textarea className="min-h-52 rounded-2xl border border-border px-4 py-3 font-mono text-sm" placeholder='Why Choose Us JSON: [{ "icon": "", "title": "", "description": "" }]' value={form.whyChooseUsJson} onChange={(event) => setForm((current) => ({ ...current, whyChooseUsJson: event.target.value }))} />
        <button className="w-fit rounded-full bg-primary px-5 py-3 font-semibold text-white" disabled={saving} type="submit">
          {saving ? "Saving..." : "Save Homepage Content"}
        </button>
        {status ? <p className="text-sm text-muted">{status}</p> : null}
      </div>
    </form>
  );
}
