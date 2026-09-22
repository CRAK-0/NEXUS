import express from "express";
import dotenv from "dotenv";
import projectsRouter from "./routes/projects.routes.js";
import taskRouter from "./routes/tasks.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

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
app.use("/api/projects", taskRouter);
app.use("/api/tasks", taskRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`NEXUS server running on port ${PORT}`);
});
