import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import JobDescription from "../models/JobDescription.model.js";
import analyzeJD from "../utils/jdAnalyzer.js";

/**
 * GET /api/jd/:id
 * Get single JD with analysis
 */
export const getJDById = async (req, res) => {
  try {
    const jd = await JobDescription.findById(req.params.id);

    if (!jd) {
      return res.status(404).json({ message: "Job Description not found" });
    }

    res.json({
      _id: jd._id,
      companyName: jd.companyName,
      jobTitle: jd.jobTitle,
      createdAt: jd.createdAt,
      analysis: {
        role: jd.analysis?.role,
        skills: jd.analysis?.skills,
        roadmap: jd.analysis?.roadmap,
        summary: jd.analysis?.summary,
      },
    });
  } catch (error) {
    console.error("GET JD BY ID ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /api/jd/upload
 * Upload JD file (PDF / TXT), extract text, analyze, store
 */

export const uploadJD = async (req, res) => {
  try {
    console.log("USER:", req.user);
    console.log("FILE:", req.file);
    const { companyName, jobTitle } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "JD file is required",
      });
    }

    let rawText = "";

    // ---------- PDF ----------
    if (req.file.mimetype === "application/pdf") {
      const buffer = new Uint8Array(fs.readFileSync(req.file.path));

      const loadingTask = pdfjsLib.getDocument({ data: buffer });
      const pdf = await loadingTask.promise;

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        rawText += content.items.map((item) => item.str).join(" ") + " ";
      }
    }
    // ---------- TXT ----------
    else if (req.file.mimetype === "text/plain") {
      rawText = fs.readFileSync(req.file.path, "utf-8");
    } else {
      return res.status(400).json({
        message: "Unsupported file type",
      });
    }

    // ---------- NLP / ANALYSIS ----------
    const analysis = await analyzeJD({
      text: rawText,
      companyName,
    });

    // ---------- SAVE ----------
    const jd = await JobDescription.create({
      companyName,
      jobTitle,
      rawText,
      analysis,
      uploadedBy: req.user.id,
    });

    res.status(201).json({
      _id: jd._id,
      companyName: jd.companyName,
      jobTitle: jd.jobTitle,
      analysis: {
        role: jd.analysis?.role,
        skills: jd.analysis?.skills,
        roadmap: jd.analysis?.roadmap,
        summary: jd.analysis?.summary,
      },
      createdAt: jd.createdAt,
    });
  } catch (error) {
    console.error("UPLOAD JD ERROR:", error);
    res.status(500).json({
      message: "JD upload failed",
    });
  }
};

/**
 * GET /api/jd/my
 * Get all JDs uploaded by logged-in user
 */
export const getMyJDs = async (req, res) => {
  try {
    const jds = await JobDescription.find({
      uploadedBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(
      jds.map((jd) => ({
        _id: jd._id,
        companyName: jd.companyName,
        jobTitle: jd.jobTitle,
        role: jd.analysis?.role,
        skills: jd.analysis?.skills,
        createdAt: jd.createdAt,
      }))
    );
  } catch (error) {
    console.error("GET MY JDS ERROR:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
