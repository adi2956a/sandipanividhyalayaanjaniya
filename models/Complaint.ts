import { Schema, model, models } from "mongoose";

const ComplaintSchema = new Schema(
  {
    trackingId: { type: String, unique: true, required: true, index: true },
    category: {
      type: String,
      enum: ["bullying", "teacher-conduct", "infrastructure", "academic", "safety", "fee-related", "other"],
      required: true
    },
    submittedBy: { type: String, enum: ["student", "parent"], required: true },
    classSection: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
    optionalContact: { type: String, trim: true },
    status: { type: String, enum: ["submitted", "under-review", "resolved"], default: "submitted" },
    adminResponse: { type: String, trim: true },
    isUrgent: { type: Boolean, default: false },
    resolvedAt: Date
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export default models.Complaint || model("Complaint", ComplaintSchema);
