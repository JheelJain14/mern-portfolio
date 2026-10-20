import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contact.js";
import cvRoutes from "./routes/cv.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/portfolio_db";

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }
      return callback(null, true); // Dev-friendly fallback
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/api/health", (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMap = {
    0: "Disconnected",
    1: "Connected",
    2: "Connecting",
    3: "Disconnecting",
  };

  res.status(200).json({
    status: "ok",
    service: "Jheel Jain Portfolio API",
    timestamp: new Date().toISOString(),
    database: {
      status: statusMap[dbStatus] || "Unknown",
      readyState: dbStatus,
      connected: dbStatus === 1,
    },
  });
});

// Mount Routes
app.use("/api/contact", contactRoutes);
app.use("/api/cv", cvRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Jheel Jain's Portfolio Backend API",
    endpoints: {
      health: "/api/health",
      contact: "POST /api/contact",
      cvInfo: "/api/cv/info",
      downloadPdf: "/api/cv/download/pdf",
      downloadDocx: "/api/cv/download/docx",
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB at:", MONGODB_URI.replace(/:[^:]*@/, ":****@"));
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s if Mongo is not running
    });
    console.log("✅ Successfully connected to MongoDB");
  } catch (err) {
    console.warn("⚠️ Warning: Could not connect to MongoDB initially.");
    console.warn("👉 Server will continue running, but contact submissions require MongoDB.");
    console.warn("👉 To enable MongoDB, ensure local MongoDB service is running, or set MONGODB_URI in server/.env (e.g. MongoDB Atlas).");
  }
};

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Portfolio server is running on http://localhost:${PORT}`);
  connectDB();
});

export default app;
