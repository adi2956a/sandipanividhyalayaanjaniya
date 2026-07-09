"use client";

import Image from "next/image";
import Link from "next/link";
import { LocalizedText } from "@/components/site/localized-text";
import { useSitePreferences } from "@/components/site/site-preferences";
import { DownloadItem, GalleryItem, NoticeItem } from "@/lib/types";
import { formatDate, repairMojibakeText } from "@/lib/utils";

export function NoticeCard({ notice }: { notice: NoticeItem }) {
  const { language } = useSitePreferences();
  const locale = language === "hi" ? "hi-IN" : "en-IN";

  return (
    <article className="rounded-3xl border border-border bg-white p-6 shadow-card">
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          <LocalizedText
            en={notice.type}
            hi={{ news: "समाचार", circular: "परिपत्र", holiday: "अवकाश", event: "कार्यक्रम" }[notice.type]}
          />
        </span>
        <span className="text-sm text-muted">{formatDate(notice.eventDate ?? notice.createdAt, locale)}</span>
      </div>
      <h3 className="mt-4 font-heading text-xl font-semibold text-ink">
        {repairMojibakeText(language === "hi" ? notice.titleHi || notice.title : notice.title)}
      </h3>
      <p className="mt-3 text-sm leading-6 text-muted">{notice.description}</p>
      {notice.fileUrl ? (
        <Link className="mt-5 inline-flex text-sm font-semibold text-accent" href={notice.fileUrl} target="_blank">
          <LocalizedText en="Open document" hi="दस्तावेज़ खोलें" />
        </Link>
      ) : null}
    </article>
  );
}

export function DownloadCard({ item }: { item: DownloadItem }) {
  const { language } = useSitePreferences();

  return (
    <article className="rounded-3xl border border-border bg-white p-6 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
        <LocalizedText
          en={item.category}
          hi={
            {
              "admission-form": "प्रवेश फॉर्म",
              calendar: "कैलेंडर",
              prospectus: "प्रॉस्पेक्टस",
              circular: "परिपत्र",
              "govt-order": "शासन आदेश"
            }[item.category]
          }
        />
      </p>
      <h3 className="mt-3 font-heading text-xl font-semibold text-ink">{repairMojibakeText(item.title)}</h3>
      <p className="mt-2 text-sm text-muted">
        <LocalizedText en="Uploaded on" hi="अपलोड तिथि" /> {formatDate(item.uploadedAt, language === "hi" ? "hi-IN" : "en-IN")}
      </p>
      <Link className="mt-5 inline-flex rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary" href={item.fileUrl} target="_blank">
        <LocalizedText en="Download / View" hi="डाउनलोड / देखें" />
      </Link>
    </article>
  );
}

export function GalleryCard({ item }: { item: GalleryItem }) {
  if (item.type === "video" && item.youtubeId) {
    return (
      <article className="overflow-hidden rounded-3xl border border-border bg-white shadow-card">
        <iframe
          className="aspect-video w-full"
          src={`https://www.youtube.com/embed/${item.youtubeId}`}
          title={repairMojibakeText(item.title)}
          loading="lazy"
          allowFullScreen
        />
        <div className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">{repairMojibakeText(item.category)}</p>
          <h3 className="mt-2 font-heading text-lg font-semibold text-ink">{repairMojibakeText(item.title)}</h3>
        </div>
      </article>
    );
  }

  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-white shadow-card">
      <div className="relative aspect-[4/3]">
        <Image alt={repairMojibakeText(item.title)} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" src={item.imageUrl ?? ""} />
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-secondary">{repairMojibakeText(item.category)}</p>
        <h3 className="mt-2 font-heading text-lg font-semibold text-ink">{repairMojibakeText(item.title)}</h3>
      </div>
    </article>
  );
}
