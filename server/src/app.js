import express from "express";
import dotenv from "dotenv";
import pool from "./db/index.js";
import projectsRouter from "./routes/projects.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "NEXUS API is running",
  });
});

app.use("/api/projects", projectsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`NEXUS server running on port ${PORT}`);
});
