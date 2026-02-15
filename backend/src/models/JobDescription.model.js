import mongoose from "mongoose";

const jobDescriptionSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true
    },

    rawText: {
      type: String,
      required: true
    },

    analysis: {
      role: {
        type: String
      },
      // `skills` will store categorized skills (object) produced by the analyzer
      skills: {
        type: mongoose.Schema.Types.Mixed
      },
      roadmap: {
        type: Array
      },
      summary: {
        type: String
      }
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const JobDescription = mongoose.model(
  "JobDescription",
  jobDescriptionSchema
);

export default JobDescription;
