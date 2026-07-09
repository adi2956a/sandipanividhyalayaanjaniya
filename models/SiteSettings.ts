import { Schema, model, models } from "mongoose";

const SiteSettingsSchema = new Schema(
  {
    schoolName: String,
    schoolNameHi: String,
    address: String,
    phone: String,
    email: String,
    mapEmbedUrl: String,
    socialLinks: {
      facebook: String,
      youtube: String,
      instagram: String
    },
    officeTimings: String
  },
  { timestamps: true }
);

export default models.SiteSettings || model("SiteSettings", SiteSettingsSchema);

