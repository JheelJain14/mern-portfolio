import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Determine paths to CV files
const clientCvDir = path.resolve(__dirname, "../../client/public/cv");
const serverCvDir = path.resolve(__dirname, "../public/cv");

const getFilePath = (filename) => {
  const inClient = path.join(clientCvDir, filename);
  if (fs.existsSync(inClient)) return inClient;

  const inServer = path.join(serverCvDir, filename);
  if (fs.existsSync(inServer)) return inServer;

  return null;
};

// GET /api/cv/info - Information about available CV files
router.get("/info", (req, res) => {
  const pdfExists = fs.existsSync(path.join(clientCvDir, "Jheel_Jain_Resume.pdf"));
  const docxExists = fs.existsSync(path.join(clientCvDir, "Jheel_Jain_Resume.docx"));

  res.json({
    name: "Jheel Jain",
    formats: [
      {
        type: "pdf",
        filename: "Jheel_Jain_Resume.pdf",
        available: pdfExists,
        downloadUrl: "/api/cv/download/pdf",
        directUrl: "/cv/Jheel_Jain_Resume.pdf",
      },
      {
        type: "docx",
        filename: "Jheel_Jain_Resume.docx",
        available: docxExists,
        downloadUrl: "/api/cv/download/docx",
        directUrl: "/cv/Jheel_Jain_Resume.docx",
      },
    ],
    note: "Place your updated resume files in client/public/cv/ as Jheel_Jain_Resume.pdf and Jheel_Jain_Resume.docx",
  });
});

// GET /api/cv/download/:format - Download CV as PDF or DOCX
router.get("/download/:format", (req, res) => {
  const format = req.params.format.toLowerCase();
  let filename = "";

  if (format === "pdf") {
    filename = "Jheel_Jain_Resume.pdf";
  } else if (format === "docx" || format === "doc") {
    filename = "Jheel_Jain_Resume.docx";
  } else {
    return res.status(400).json({
      error: "Invalid format requested. Supported formats are 'pdf' and 'docx'.",
    });
  }

  const filePath = getFilePath(filename);

  if (!filePath) {
    return res.status(404).json({
      error: `Resume file '${filename}' not found. Please ensure it is placed in 'client/public/cv/${filename}'.`,
    });
  }

  res.download(filePath, filename, (err) => {
    if (err) {
      console.error("Error downloading CV file:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to download resume file." });
      }
    }
  });
});

export default router;
