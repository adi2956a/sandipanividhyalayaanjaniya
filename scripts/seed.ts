import { connectToDatabase } from "@/lib/mongodb";
import { sampleDownloads, sampleGallery, sampleHomepage, sampleNotices, sampleSettings } from "@/lib/sample-data";
import Download from "@/models/Download";
import GalleryItem from "@/models/GalleryItem";
import HomepageContentModel from "@/models/HomepageContent";
import Notice from "@/models/Notice";
import SiteSettingsModel from "@/models/SiteSettings";

async function seed() {
  const db = await connectToDatabase();

  if (!db) {
    throw new Error("MONGODB_URI is required to run the seed script.");
  }

  await Promise.all([
    Notice.deleteMany({}),
    GalleryItem.deleteMany({}),
    Download.deleteMany({}),
    HomepageContentModel.deleteMany({}),
    SiteSettingsModel.deleteMany({})
  ]);

  await Notice.insertMany(sampleNotices);
  await GalleryItem.insertMany(sampleGallery);
  await Download.insertMany(sampleDownloads);
  await HomepageContentModel.create(sampleHomepage);
  await SiteSettingsModel.create(sampleSettings);

  console.log("Seed completed.");
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => process.exit(0));
