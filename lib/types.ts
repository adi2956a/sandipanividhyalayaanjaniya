export type NoticeType = "news" | "circular" | "holiday" | "event";
export type GalleryType = "photo" | "video";
export type DownloadCategory =
  | "admission-form"
  | "calendar"
  | "prospectus"
  | "circular"
  | "govt-order";
export type ResourceStream = "science" | "commerce" | "arts" | "common";
export type ComplaintCategory =
  | "bullying"
  | "teacher-conduct"
  | "infrastructure"
  | "academic"
  | "safety"
  | "fee-related"
  | "other";
export type ComplaintRole = "student" | "parent";
export type ComplaintStatus = "submitted" | "under-review" | "resolved";
export type PreviousPaperExamType = "annual" | "half-yearly" | "pre-board" | "unit-test";

export interface NoticeItem {
  _id?: string;
  title: string;
  titleHi?: string;
  type: NoticeType;
  description: string;
  fileUrl?: string;
  eventDate?: string;
  isPinned?: boolean;
  createdAt: string;
}

export interface GalleryItem {
  _id?: string;
  title: string;
  type: GalleryType;
  imageUrl?: string;
  youtubeId?: string;
  category: string;
  createdAt: string;
}

export interface DownloadItem {
  _id?: string;
  title: string;
  category: DownloadCategory;
  fileUrl: string;
  uploadedAt: string;
}

export interface StudentResourceVideo {
  title: string;
  youtubeId: string;
}

export interface StudentResourceItem {
  _id?: string;
  class: number;
  stream: ResourceStream;
  subject: string;
  chapter: string;
  chapterOrder: number;
  youtubeLinks: StudentResourceVideo[];
  notesPdfUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PreviousYearPaperItem {
  _id?: string;
  class: number;
  subject: string;
  year: number;
  examType: PreviousPaperExamType;
  fileUrl: string;
  uploadedAt: string;
}

export interface ComplaintItem {
  _id?: string;
  trackingId: string;
  category: ComplaintCategory;
  submittedBy: ComplaintRole;
  classSection?: string;
  message: string;
  optionalContact?: string;
  status: ComplaintStatus;
  adminResponse?: string;
  isUrgent: boolean;
  createdAt: string;
  resolvedAt?: string;
}

export interface ComplaintTrackResult {
  trackingId: string;
  category: ComplaintCategory;
  status: ComplaintStatus;
  adminResponse?: string;
}

export interface HomepageContent {
  heroSlides: { imageUrl: string; caption: string }[];
  principalMessage: {
    text: string;
    photoUrl: string;
    name: string;
    designation: string;
  };
  aboutSummary: string;
  achievements: {
    title: string;
    description: string;
    imageUrl: string;
    date: string;
  }[];
  whyChooseUs: {
    icon: string;
    title: string;
    description: string;
  }[];
}

export interface SiteSettings {
  schoolName: string;
  schoolNameHi: string;
  address: string;
  phone: string;
  email: string;
  mapEmbedUrl: string;
  socialLinks: {
    facebook?: string;
    youtube?: string;
    instagram?: string;
  };
  officeTimings: string;
}
