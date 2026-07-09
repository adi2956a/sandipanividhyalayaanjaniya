import { Schema, model, models } from "mongoose";

const AdminSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["superadmin", "editor"], default: "editor" }
  },
  { timestamps: true }
);

export default models.Admin || model("Admin", AdminSchema);
