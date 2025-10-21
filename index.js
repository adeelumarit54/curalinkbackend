import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import staffRoutes from "./routes/staffRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // ✅ ADD THIS

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect DB
connectDB();

// Base route
app.get("/", (req, res) => res.send("API is running..."));

// Routes
app.use("/api/auth", authRoutes); // ✅ ADD THIS
app.use("/api/staff", staffRoutes);

// Start server
const PORT =  5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
