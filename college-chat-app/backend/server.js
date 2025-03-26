require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection (Replace <your_mongo_uri> with your actual MongoDB URI)
mongoose
  .connect("mongodb://127.0.0.1:27017/college-chat-app", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("College Chat App API is running...");
});

// Choose Port from .env file or default to 5001
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

const messages = [];

app.post("/chat", (req, res) => {
  const { text, anonymous } = req.body;
  messages.push({ text, anonymous });
  res.status(200).json({ success: true });
});