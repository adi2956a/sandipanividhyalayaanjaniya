import { Schema, model, models } from "mongoose";

const StudentResourceSchema = new Schema(
  {
    class: { type: Number, enum: [9, 10, 11, 12], required: true },
    stream: { type: String, enum: ["science", "commerce", "arts", "common"], default: "common" },
    subject: { type: String, required: true, trim: true },
    chapter: { type: String, required: true, trim: true },
    chapterOrder: { type: Number, default: 0 },
    youtubeLinks: [
      {
        title: { type: String, trim: true },
        youtubeId: { type: String, required: true, trim: true }
      }
    ],
    notesPdfUrl: { type: String, trim: true }
  },
  { timestamps: true }
);

export default models.StudentResource || model("StudentResource", StudentResourceSchema);
