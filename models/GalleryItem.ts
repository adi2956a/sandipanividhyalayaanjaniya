import { Schema, model, models } from "mongoose";

const GalleryItemSchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["photo", "video"], required: true },
    imageUrl: String,
    youtubeId: String,
    category: { type: String, required: true }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export default models.GalleryItem || model("GalleryItem", GalleryItemSchema);

