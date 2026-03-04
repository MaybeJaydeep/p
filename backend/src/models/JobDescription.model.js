import mongoose from "mongoose";

const jobDescriptionSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },

    rawText: {
      type: String,
      required: true,
    },

    analysis: {
      role: { type: String },
      skills: { type: mongoose.Schema.Types.Mixed },
      roadmap: { type: Array },
      summary: { type: String },
    },

    companyInfo: {
      description: { type: String, default: null },
      summary: { type: String, default: null },
      thumbnail: { type: String, default: null },
      wikiUrl: { type: String, default: null },
      source: { type: String, default: "fallback" },
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const JobDescription = mongoose.model(
  "JobDescription",
  jobDescriptionSchema
);

export default JobDescription;
