import { Schema, model, models } from "mongoose";

const NoticeSchema = new Schema(
  {
    title: { type: String, required: true },
    titleHi: String,
    type: {
      type: String,
      enum: ["news", "circular", "holiday", "event"],
      required: true
    },
    description: { type: String, required: true },
    fileUrl: String,
    eventDate: Date,
    isPinned: { type: Boolean, default: false }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export default models.Notice || model("Notice", NoticeSchema);

