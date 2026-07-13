import {
  sampleComplaints,
  sampleDownloads,
  sampleGallery,
  sampleHomepage,
  sampleNotices,
  samplePreviousPapers,
  sampleSettings,
  sampleStudentResources
} from "@/lib/sample-data";
import { connectToDatabase } from "@/lib/mongodb";
import type {
  ComplaintItem,
  ComplaintTrackResult,
  DownloadItem,
  GalleryItem as GalleryItemType,
  HomepageContent,
  NoticeItem,
  PreviousYearPaperItem,
  SiteSettings,
  StudentResourceItem
} from "@/lib/types";
import { normalizeTextValue } from "@/lib/utils";
import Complaint from "@/models/Complaint";
import Download from "@/models/Download";
import GalleryItem from "@/models/GalleryItem";
import HomepageContentModel from "@/models/HomepageContent";
import Notice from "@/models/Notice";
import PreviousYearPaper from "@/models/PreviousYearPaper";
import SiteSettingsModel from "@/models/SiteSettings";
import StudentResource from "@/models/StudentResource";

export async function getHomepageContent(): Promise<HomepageContent> {
  const db = await connectToDatabase();
  if (!db) return normalizeTextValue(sampleHomepage);

  const content = await HomepageContentModel.findOne().lean();
  return normalizeTextValue((content as unknown as HomepageContent | null) ?? sampleHomepage);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const db = await connectToDatabase();
  if (!db) return normalizeTextValue(sampleSettings);

  const settings = await SiteSettingsModel.findOne().lean();
  return normalizeTextValue((settings as unknown as SiteSettings | null) ?? sampleSettings);
}

export async function getNotices(): Promise<NoticeItem[]> {
  const db = await connectToDatabase();
  if (!db) return normalizeTextValue(sampleNotices);

  const notices = await Notice.find().sort({ isPinned: -1, createdAt: -1 }).lean();
  return normalizeTextValue(notices as unknown as NoticeItem[]);
}

export async function getGalleryItems(): Promise<GalleryItemType[]> {
  const db = await connectToDatabase();
  if (!db) return normalizeTextValue(sampleGallery);

  const items = await GalleryItem.find().sort({ createdAt: -1 }).lean();
  return normalizeTextValue(items as unknown as GalleryItemType[]);
}

export async function getDownloads(): Promise<DownloadItem[]> {
  const db = await connectToDatabase();
  if (!db) return normalizeTextValue(sampleDownloads);

  const downloads = await Download.find().sort({ uploadedAt: -1 }).lean();
  return normalizeTextValue(downloads as unknown as DownloadItem[]);
}

export async function getStudentResources(filters?: {
  class?: number;
  stream?: string;
  subject?: string;
}): Promise<StudentResourceItem[]> {
  const db = await connectToDatabase();
  if (!db) {
    return normalizeTextValue(sampleStudentResources.filter((item) => {
      if (filters?.class && item.class !== filters.class) return false;
      if (filters?.subject && item.subject !== filters.subject) return false;
      if (filters?.stream && item.stream !== filters.stream && item.stream !== "common") return false;
      return true;
    }));
  }

  const query: Record<string, unknown> = {};

  if (filters?.class) query.class = filters.class;
  if (filters?.subject) query.subject = filters.subject;
  if (filters?.stream) query.stream = { $in: [filters.stream, "common"] };

  const resources = await StudentResource.find(query).sort({ chapterOrder: 1, createdAt: 1 }).lean();
  return normalizeTextValue(resources as unknown as StudentResourceItem[]);
}

export async function getPreviousYearPapers(filters?: {
  class?: number;
  subject?: string;
  year?: number;
}): Promise<PreviousYearPaperItem[]> {
  const db = await connectToDatabase();
  if (!db) {
    return normalizeTextValue(samplePreviousPapers.filter((item) => {
      if (filters?.class && item.class !== filters.class) return false;
      if (filters?.subject && item.subject !== filters.subject) return false;
      if (filters?.year && item.year !== filters.year) return false;
      return true;
    }));
  }

  const query: Record<string, unknown> = {};

  if (filters?.class) query.class = filters.class;
  if (filters?.subject) query.subject = filters.subject;
  if (filters?.year) query.year = filters.year;

  const papers = await PreviousYearPaper.find(query).sort({ year: -1, uploadedAt: -1 }).lean();
  return normalizeTextValue(papers as unknown as PreviousYearPaperItem[]);
}

export async function getComplaints(filters?: {
  category?: string;
  status?: string;
  submittedBy?: string;
}): Promise<ComplaintItem[]> {
  const db = await connectToDatabase();
  if (!db) return normalizeTextValue(sampleComplaints);

  const query: Record<string, unknown> = {};
  if (filters?.category) query.category = filters.category;
  if (filters?.status) query.status = filters.status;
  if (filters?.submittedBy) query.submittedBy = filters.submittedBy;

  const complaints = await Complaint.find(query).sort({ isUrgent: -1, createdAt: -1 }).lean();
  return normalizeTextValue(complaints as unknown as ComplaintItem[]);
}

export async function getComplaintTrackResult(trackingId: string): Promise<ComplaintTrackResult | null> {
  const db = await connectToDatabase();
  if (!db) return null;

  const complaint = (await Complaint.findOne({ trackingId }).lean()) as
    | {
        trackingId: string;
        category: ComplaintTrackResult["category"];
        submittedBy: ComplaintTrackResult["submittedBy"];
        classSection?: string;
        message: string;
        status: ComplaintTrackResult["status"];
        adminResponse?: string;
        createdAt: string;
        updatedAt?: string;
        resolvedAt?: string;
      }
    | null;
  if (!complaint) return null;

  return normalizeTextValue({
    trackingId: complaint.trackingId,
    category: complaint.category,
    submittedBy: complaint.submittedBy,
    classSection: complaint.classSection ?? "",
    message: complaint.message,
    status: complaint.status,
    adminResponse: complaint.adminResponse ?? "",
    createdAt: complaint.createdAt,
    updatedAt: complaint.updatedAt,
    resolvedAt: complaint.resolvedAt
  });
}
