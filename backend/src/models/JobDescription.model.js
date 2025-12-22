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
      technologies: [
        {
          type: String
        }
      ],
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
