import { Schema, model, models } from "mongoose";

const HomepageContentSchema = new Schema(
  {
    heroSlides: [{ imageUrl: String, caption: String }],
    principalMessage: {
      text: String,
      photoUrl: String,
      name: String,
      designation: String
    },
    aboutSummary: String,
    achievements: [{ title: String, description: String, imageUrl: String, date: Date }],
    whyChooseUs: [{ icon: String, title: String, description: String }]
  },
  { timestamps: true }
);

export default models.HomepageContent || model("HomepageContent", HomepageContentSchema);

