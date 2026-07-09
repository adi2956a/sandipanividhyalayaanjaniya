import { Schema, model, models } from "mongoose";

const DownloadSchema = new Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["admission-form", "calendar", "prospectus", "circular", "govt-order"],
      required: true
    },
    fileUrl: { type: String, required: true }
  },
  { timestamps: { createdAt: "uploadedAt", updatedAt: true } }
);

export default models.Download || model("Download", DownloadSchema);

