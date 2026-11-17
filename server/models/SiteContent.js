import mongoose from "mongoose";

const siteContentSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      enum: ["home", "about", "quality", "contact"],
      unique: true,
      required: true,
    },
    content: { type: String, required: true },
    lastUpdatedBy: String,
  },
  { timestamps: true }
);

export default mongoose.model("SiteContent", siteContentSchema);
