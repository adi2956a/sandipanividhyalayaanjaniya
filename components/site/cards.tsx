import Image from "next/image";
import Link from "next/link";
import { DownloadItem, GalleryItem, NoticeItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function NoticeCard({ notice }: { notice: NoticeItem }) {
  return (
    <article className="rounded-3xl border border-border bg-white p-6 shadow-card">
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          {notice.type}
        </span>
        <span className="text-sm text-muted">{formatDate(notice.eventDate ?? notice.createdAt)}</span>
      </div>
      <h3 className="mt-4 font-heading text-xl font-semibold text-ink">{notice.title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{notice.description}</p>
      {notice.fileUrl ? (
        <Link className="mt-5 inline-flex text-sm font-semibold text-accent" href={notice.fileUrl} target="_blank">
          Open document
        </Link>
      ) : null}
    </article>
  );
}

export function DownloadCard({ item }: { item: DownloadItem }) {
  return (
    <article className="rounded-3xl border border-border bg-white p-6 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-wide text-secondary">{item.category}</p>
      <h3 className="mt-3 font-heading text-xl font-semibold text-ink">{item.title}</h3>
      <p className="mt-2 text-sm text-muted">Uploaded on {formatDate(item.uploadedAt)}</p>
      <Link className="mt-5 inline-flex rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary" href={item.fileUrl} target="_blank">
        Download / View
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
          title={item.title}
          loading="lazy"
          allowFullScreen
        />
        <div className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">{item.category}</p>
          <h3 className="mt-2 font-heading text-lg font-semibold text-ink">{item.title}</h3>
        </div>
      </article>
    );
  }

  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-white shadow-card">
      <div className="relative aspect-[4/3]">
        <Image alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" src={item.imageUrl ?? ""} />
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-secondary">{item.category}</p>
        <h3 className="mt-2 font-heading text-lg font-semibold text-ink">{item.title}</h3>
      </div>
    </article>
  );
}

