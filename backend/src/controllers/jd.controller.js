import fs from "fs";
import pdf from "pdf-parse";
import JobDescription from "../models/JobDescription.model.js";

export const uploadJD = async (req, res) => {
  try {
    let text = "";

    if (req.file.mimetype === "application/pdf") {
      const data = await pdf(fs.readFileSync(req.file.path));
      text = data.text;
    } else {
      text = fs.readFileSync(req.file.path, "utf-8");
    }

    const jd = await JobDescription.create({
      companyName: req.body.companyName,
      jobTitle: req.body.jobTitle,
      rawText: text,
      uploadedBy: req.user.id
    });

    res.json(jd);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
