export type NoticeType = "news" | "circular" | "holiday" | "event";
export type GalleryType = "photo" | "video";
export type DownloadCategory =
  | "admission-form"
  | "calendar"
  | "prospectus"
  | "circular"
  | "govt-order";

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

