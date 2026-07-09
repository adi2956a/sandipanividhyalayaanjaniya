"use client";

import { useEffect, useState } from "react";
import { SiteSettings } from "@/lib/types";

const initialState = {
  schoolName: "",
  schoolNameHi: "",
  address: "",
  phone: "",
  email: "",
  mapEmbedUrl: "",
  facebook: "",
  youtube: "",
  instagram: "",
  officeTimings: ""
};

export function SettingsManager() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function loadSettings() {
      const response = await fetch("/api/settings", { cache: "no-store" });
      const data = (await response.json()) as SiteSettings;
      setForm({
        schoolName: data.schoolName ?? "",
        schoolNameHi: data.schoolNameHi ?? "",
        address: data.address ?? "",
        phone: data.phone ?? "",
        email: data.email ?? "",
        mapEmbedUrl: data.mapEmbedUrl ?? "",
        facebook: data.socialLinks?.facebook ?? "",
        youtube: data.socialLinks?.youtube ?? "",
        instagram: data.socialLinks?.instagram ?? "",
        officeTimings: data.officeTimings ?? ""
      });
      setLoading(false);
    }

    void loadSettings();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setStatus("");

    const payload: SiteSettings = {
      schoolName: form.schoolName,
      schoolNameHi: form.schoolNameHi,
      address: form.address,
      phone: form.phone,
      email: form.email,
      mapEmbedUrl: form.mapEmbedUrl,
      officeTimings: form.officeTimings,
      socialLinks: {
        facebook: form.facebook,
        youtube: form.youtube,
        instagram: form.instagram
      }
    };

    const response = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setStatus(response.ok ? "Site settings updated." : "Unable to save site settings.");
    setSaving(false);
  }

  return (
    <form className="rounded-3xl border border-border p-6" onSubmit={handleSubmit}>
      {loading ? <p className="text-sm text-muted">Loading settings...</p> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <input className="rounded-2xl border border-border px-4 py-3" placeholder="School Name" value={form.schoolName} onChange={(event) => setForm((current) => ({ ...current, schoolName: event.target.value }))} />
        <input className="rounded-2xl border border-border px-4 py-3" placeholder="Hindi School Name" value={form.schoolNameHi} onChange={(event) => setForm((current) => ({ ...current, schoolNameHi: event.target.value }))} />
        <input className="rounded-2xl border border-border px-4 py-3 md:col-span-2" placeholder="Address" value={form.address} onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))} />
        <input className="rounded-2xl border border-border px-4 py-3" placeholder="Phone" value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} />
        <input className="rounded-2xl border border-border px-4 py-3" placeholder="Email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
        <input className="rounded-2xl border border-border px-4 py-3 md:col-span-2" placeholder="Google Map Embed URL" value={form.mapEmbedUrl} onChange={(event) => setForm((current) => ({ ...current, mapEmbedUrl: event.target.value }))} />
        <input className="rounded-2xl border border-border px-4 py-3" placeholder="Facebook URL" value={form.facebook} onChange={(event) => setForm((current) => ({ ...current, facebook: event.target.value }))} />
        <input className="rounded-2xl border border-border px-4 py-3" placeholder="YouTube URL" value={form.youtube} onChange={(event) => setForm((current) => ({ ...current, youtube: event.target.value }))} />
        <input className="rounded-2xl border border-border px-4 py-3 md:col-span-2" placeholder="Instagram URL" value={form.instagram} onChange={(event) => setForm((current) => ({ ...current, instagram: event.target.value }))} />
        <input className="rounded-2xl border border-border px-4 py-3 md:col-span-2" placeholder="Office Timings" value={form.officeTimings} onChange={(event) => setForm((current) => ({ ...current, officeTimings: event.target.value }))} />
      </div>
      <button className="mt-5 rounded-full bg-primary px-5 py-3 font-semibold text-white" disabled={saving} type="submit">
        {saving ? "Saving..." : "Save Settings"}
      </button>
      {status ? <p className="mt-4 text-sm text-muted">{status}</p> : null}
    </form>
  );
}
