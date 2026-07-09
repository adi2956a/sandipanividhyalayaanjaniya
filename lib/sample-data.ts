import { DownloadItem, GalleryItem, HomepageContent, NoticeItem, SiteSettings } from "@/lib/types";

export const sampleSettings: SiteSettings = {
  schoolName: "Sandipani Vidyalaya, Anjaniya, Mandla",
  schoolNameHi: "संदीपनि विद्यालय, अंजनिया, मंडला",
  address: "Anjaniya, Mandla District, Madhya Pradesh 481998",
  phone: "+91 00000 00000",
  email: "sandipani.anjaniya@school.edu.in",
  mapEmbedUrl: "https://www.google.com/maps?q=Anjaniya%20Mandla&output=embed",
  socialLinks: {
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    instagram: "https://instagram.com"
  },
  officeTimings: "Monday to Saturday, 10:00 AM to 4:00 PM"
};

export const sampleHomepage: HomepageContent = {
  heroSlides: [
    {
      imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80",
      caption: "A model school committed to equitable, quality education."
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
      caption: "Learning spaces that nurture curiosity, confidence, and discipline."
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80",
      caption: "Guiding students toward academic achievement and civic responsibility."
    }
  ],
  principalMessage: {
    text: "Our mission is to ensure that every child from Anjaniya and nearby communities has access to a safe, dignified, and future-ready learning environment.",
    photoUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=500&q=80",
    name: "Dr. Meena Sharma",
    designation: "Principal"
  },
  aboutSummary: "Sandipani Vidyalaya, Anjaniya is a Government of Madhya Pradesh model school focused on inclusive education, strong foundational learning, and holistic student development.",
  achievements: [
    {
      title: "District Science Recognition",
      description: "Students represented the school in district-level science exhibition activities.",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
      date: "2026-01-12"
    },
    {
      title: "Sports Participation Milestone",
      description: "A growing number of students are participating in athletics and team sports.",
      imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
      date: "2026-02-18"
    },
    {
      title: "Library Enrichment Drive",
      description: "The school expanded reading resources to support multilingual learning.",
      imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80",
      date: "2026-03-22"
    }
  ],
  whyChooseUs: [
    { icon: "🏫", title: "Model School Campus", description: "A clean, structured campus designed for focused learning." },
    { icon: "👩‍🏫", title: "Qualified Staff", description: "Committed teachers supporting academic and personal growth." },
    { icon: "📚", title: "Holistic Curriculum", description: "Balanced attention to academics, co-curriculars, and values." },
    { icon: "🚌", title: "Student Support", description: "Government-linked schemes and support systems for learners." }
  ]
};

export const sampleNotices: NoticeItem[] = [
  {
    _id: "1",
    title: "Admissions Open for Session 2026-27",
    titleHi: "सत्र 2026-27 के लिए प्रवेश प्रारंभ",
    type: "news",
    description: "Application forms and eligibility details are available on the admissions page.",
    fileUrl: "https://drive.google.com",
    isPinned: true,
    createdAt: "2026-06-28"
  },
  {
    _id: "2",
    title: "Parent-Teacher Meeting on 15 July 2026",
    type: "event",
    description: "Parents are requested to attend the meeting to review academic progress and student well-being.",
    eventDate: "2026-07-15",
    createdAt: "2026-07-01"
  },
  {
    _id: "3",
    title: "Monsoon Safety Advisory",
    type: "circular",
    description: "Students should carry rain protection and follow transport instructions during heavy rainfall.",
    createdAt: "2026-07-03"
  },
  {
    _id: "4",
    title: "Holiday on Guru Purnima",
    type: "holiday",
    description: "School will remain closed on account of Guru Purnima.",
    eventDate: "2026-07-29",
    createdAt: "2026-07-05"
  }
];

export const sampleGallery: GalleryItem[] = [
  {
    _id: "1",
    title: "Morning Assembly",
    type: "photo",
    imageUrl: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=900&q=80",
    category: "Campus Life",
    createdAt: "2026-05-10"
  },
  {
    _id: "2",
    title: "Library Session",
    type: "photo",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    category: "Academics",
    createdAt: "2026-05-11"
  },
  {
    _id: "3",
    title: "Annual Day Highlights",
    type: "video",
    youtubeId: "dQw4w9WgXcQ",
    category: "Events",
    createdAt: "2026-05-12"
  }
];

export const sampleDownloads: DownloadItem[] = [
  {
    _id: "1",
    title: "Admission Form 2026-27",
    category: "admission-form",
    fileUrl: "https://drive.google.com",
    uploadedAt: "2026-06-21"
  },
  {
    _id: "2",
    title: "Academic Calendar",
    category: "calendar",
    fileUrl: "https://drive.google.com",
    uploadedAt: "2026-06-16"
  },
  {
    _id: "3",
    title: "Department Circular",
    category: "circular",
    fileUrl: "https://drive.google.com",
    uploadedAt: "2026-07-02"
  }
];

