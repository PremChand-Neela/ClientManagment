const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const clientRoutes = require("./routes/clientRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Global middlewares
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Client Management API is running");
});

// Mount all client APIs under /api/clients
app.use("/api/clients", clientRoutes);

// Fallback error handler
app.use((err, _req, res, _next) => {
  res.status(500).json({
    success: false,
    message: "Something went wrong",
    error: err.message,
  });
});

const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
