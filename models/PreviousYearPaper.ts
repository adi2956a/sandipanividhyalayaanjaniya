import { Schema, model, models } from "mongoose";

const PreviousYearPaperSchema = new Schema(
  {
    class: { type: Number, enum: [9, 10, 11, 12], required: true },
    subject: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    examType: {
      type: String,
      enum: ["annual", "half-yearly", "pre-board", "unit-test"],
      required: true
    },
    fileUrl: { type: String, required: true, trim: true }
  },
  { timestamps: { createdAt: "uploadedAt", updatedAt: true } }
);

export default models.PreviousYearPaper || model("PreviousYearPaper", PreviousYearPaperSchema);
