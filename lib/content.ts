import { sampleDownloads, sampleGallery, sampleHomepage, sampleNotices, sampleSettings } from "@/lib/sample-data";
import { connectToDatabase } from "@/lib/mongodb";
import type { DownloadItem, GalleryItem as GalleryItemType, HomepageContent, NoticeItem, SiteSettings } from "@/lib/types";
import Download from "@/models/Download";
import GalleryItem from "@/models/GalleryItem";
import HomepageContentModel from "@/models/HomepageContent";
import Notice from "@/models/Notice";
import SiteSettingsModel from "@/models/SiteSettings";

export async function getHomepageContent(): Promise<HomepageContent> {
  const db = await connectToDatabase();
  if (!db) return sampleHomepage;

  const content = await HomepageContentModel.findOne().lean();
  return (content as unknown as HomepageContent | null) ?? sampleHomepage;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const db = await connectToDatabase();
  if (!db) return sampleSettings;

  const settings = await SiteSettingsModel.findOne().lean();
  return (settings as unknown as SiteSettings | null) ?? sampleSettings;
}

export async function getNotices(): Promise<NoticeItem[]> {
  const db = await connectToDatabase();
  if (!db) return sampleNotices;

  const notices = await Notice.find().sort({ isPinned: -1, createdAt: -1 }).lean();
  return notices.length ? (notices as unknown as NoticeItem[]) : sampleNotices;
}

export async function getGalleryItems(): Promise<GalleryItemType[]> {
  const db = await connectToDatabase();
  if (!db) return sampleGallery;

  const items = await GalleryItem.find().sort({ createdAt: -1 }).lean();
  return items.length ? (items as unknown as GalleryItemType[]) : sampleGallery;
}

export async function getDownloads(): Promise<DownloadItem[]> {
  const db = await connectToDatabase();
  if (!db) return sampleDownloads;

  const downloads = await Download.find().sort({ uploadedAt: -1 }).lean();
  return downloads.length ? (downloads as unknown as DownloadItem[]) : sampleDownloads;
}
