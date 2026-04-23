const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// 🔥 DEBUG LINE (important)
console.log("Auth Route:", require("./routes/authRoutes"));
console.log("MY SERVER FILE RUNNING");

// routes
const authRoutes = require("./routes/authRoutes");
const grievanceRoutes = require("./routes/grievanceRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/grievances", grievanceRoutes);

// root test
app.get("/", (req, res) => {
  res.send("Server working");
});

// server start
app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);