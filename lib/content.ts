import { sampleDownloads, sampleGallery, sampleHomepage, sampleNotices, sampleSettings } from "@/lib/sample-data";
import { connectToDatabase } from "@/lib/mongodb";
import Download from "@/models/Download";
import GalleryItem from "@/models/GalleryItem";
import HomepageContentModel from "@/models/HomepageContent";
import Notice from "@/models/Notice";
import SiteSettingsModel from "@/models/SiteSettings";

export async function getHomepageContent() {
  const db = await connectToDatabase();
  if (!db) return sampleHomepage;

  const content = await HomepageContentModel.findOne().lean();
  return content ?? sampleHomepage;
}

export async function getSiteSettings() {
  const db = await connectToDatabase();
  if (!db) return sampleSettings;

  const settings = await SiteSettingsModel.findOne().lean();
  return settings ?? sampleSettings;
}

export async function getNotices() {
  const db = await connectToDatabase();
  if (!db) return sampleNotices;

  const notices = await Notice.find().sort({ isPinned: -1, createdAt: -1 }).lean();
  return notices.length ? notices : sampleNotices;
}

export async function getGalleryItems() {
  const db = await connectToDatabase();
  if (!db) return sampleGallery;

  const items = await GalleryItem.find().sort({ createdAt: -1 }).lean();
  return items.length ? items : sampleGallery;
}

export async function getDownloads() {
  const db = await connectToDatabase();
  if (!db) return sampleDownloads;

  const downloads = await Download.find().sort({ uploadedAt: -1 }).lean();
  return downloads.length ? downloads : sampleDownloads;
}

