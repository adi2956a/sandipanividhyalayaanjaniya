import { Schema, model, models } from "mongoose";

const ContactSubmissionSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false }
  },
  { timestamps: { createdAt: "submittedAt", updatedAt: true } }
);

export default models.ContactSubmission || model("ContactSubmission", ContactSubmissionSchema);

