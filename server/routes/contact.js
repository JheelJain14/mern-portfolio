import express from "express";
import mongoose from "mongoose";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST /api/contact - Receive new contact form message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: "Please provide your name.",
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        error: "Please provide your email address.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address.",
      });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: "Please provide a message.",
      });
    }

    // Check if MongoDB is connected
    const isDbConnected = mongoose.connection.readyState === 1;

    if (!isDbConnected) {
      console.warn("⚠️ Warning: Contact received but MongoDB is not connected yet:", {
        name: name.trim(),
        email: email.trim(),
        messageSnippet: message.trim().slice(0, 50),
      });

      return res.status(503).json({
        success: false,
        error: "Database is not connected yet. Please ensure MongoDB is running or add your MongoDB Atlas URI in server/.env.",
      });
    }

    // Create and save to MongoDB
    const newContact = new Contact({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    const savedContact = await newContact.save();

    return res.status(201).json({
      success: true,
      message: "Thank you! Your message has been sent successfully.",
      data: {
        id: savedContact._id,
        name: savedContact.name,
        email: savedContact.email,
        createdAt: savedContact.createdAt,
      },
    });
  } catch (error) {
    console.error("Error processing contact form:", error);

    // Mongoose validation error handling
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        error: messages.join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      error: "An unexpected error occurred while saving your message. Please try again later.",
    });
  }
});

// GET /api/contact - List contact messages (for review/diagnostics)
router.get("/", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        error: "Database not connected",
      });
    }

    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .select("-__v");

    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch contact submissions",
    });
  }
});

export default router;
