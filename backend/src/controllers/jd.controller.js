import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import JobDescription from "../models/JobDescription.model.js";
import { analyzeJD } from "../utils/jdAnalyzer.js";

export const uploadJD = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let text = "";

    // PDF handling
    if (req.file.mimetype === "application/pdf") {
      const buffer = new Uint8Array(
        fs.readFileSync(req.file.path)
      );

      const loadingTask = pdfjsLib.getDocument({ data: buffer });
      const pdf = await loadingTask.promise;

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item) => item.str).join(" ") + " ";
      }
    } 
    // TXT handling
    else {
      text = fs.readFileSync(req.file.path, "utf-8");
    }

    // 🔥 ANALYZE JD
    const analysis = analyzeJD(text);

    // Save to DB
    const jd = await JobDescription.create({
      companyName: req.body.companyName,
      jobTitle: req.body.jobTitle,
      rawText: text,
      analysis,
      uploadedBy: req.user.id
    });

    res.status(201).json(jd);
  } catch (err) {
    console.error("JD PARSE ERROR 👉", err);
    res.status(500).json({ message: err.message });
  }
};
