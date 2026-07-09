"use client";

import { useState } from "react";
import { ComplaintTrackResult } from "@/lib/types";

function formatLabel(value: string) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export function ComplaintTracker() {
  const [trackingId, setTrackingId] = useState("");
  const [result, setResult] = useState<ComplaintTrackResult | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleTrack(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    setResult(null);

    const response = await fetch(`/api/complaints/track?trackingId=${encodeURIComponent(trackingId.trim().toUpperCase())}`, {
      cache: "no-store"
    });
    const data = await response.json();

    if (!response.ok) {
      setStatus(data.error ?? "Tracking ID not found.");
      setLoading(false);
      return;
    }

    setResult(data);
    setLoading(false);
  }

  return (
    <div className="grid gap-6">
      <form className="rounded-[2rem] border border-[#d9dbe8] bg-white p-8 shadow-card" onSubmit={handleTrack}>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#63708b]">Track Your Complaint</p>
        <h2 className="mt-3 font-heading text-3xl font-semibold text-[#1f2940]">Enter your tracking ID</h2>
        <div className="mt-6 flex flex-col gap-4 md:flex-row">
          <input
            required
            className="flex-1 rounded-2xl border border-[#d9dbe8] px-4 py-3 text-lg uppercase tracking-[0.1em]"
            placeholder="CMP-XXXXXX"
            value={trackingId}
            onChange={(event) => setTrackingId(event.target.value)}
          />
          <button className="rounded-full bg-[#1f2940] px-6 py-3 font-semibold text-white" disabled={loading} type="submit">
            {loading ? "Checking..." : "Check Status"}
          </button>
        </div>
        {status ? <p className="mt-4 text-sm text-[#8a3b3b]">{status}</p> : null}
      </form>

      {result ? (
        <div className="rounded-[2rem] border border-[#d9dbe8] bg-white p-8 shadow-card">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#63708b]">{result.trackingId}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-[#f7f7fb] p-5">
              <p className="text-sm text-[#5e687d]">Category</p>
              <p className="mt-2 font-heading text-2xl font-semibold text-[#1f2940]">{formatLabel(result.category)}</p>
            </div>
            <div className="rounded-3xl bg-[#f7f7fb] p-5">
              <p className="text-sm text-[#5e687d]">Status</p>
              <p className="mt-2 font-heading text-2xl font-semibold text-[#1f2940]">{formatLabel(result.status)}</p>
            </div>
          </div>
          <div className="mt-5 rounded-3xl border border-[#e7e9f2] bg-[#fafafe] p-5">
            <p className="text-sm font-medium text-[#5e687d]">School Response</p>
            <p className="mt-2 leading-7 text-[#1f2940]">
              {result.adminResponse?.trim() || "No response has been posted yet. Please check again later."}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
