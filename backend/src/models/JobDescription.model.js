import mongoose from "mongoose";

const jdSchema = new mongoose.Schema({
  companyName: String,
  jobTitle: String,
  rawText: String,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  verified: { type: Boolean, default: false }
});

export default mongoose.model("JobDescription", jdSchema);
