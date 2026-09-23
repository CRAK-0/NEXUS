import express from "express";
import dotenv from "dotenv";
import projectsRouter from "./routes/projects.routes.js";
import taskRouter from "./routes/tasks.routes.js";
import notesRouter from "./routes/notes.routes.js";
import authRouter from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import { authenticate } from "./middlewares/auth.js";
import activitiesRouter from "./routes/activities.routes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "NEXUS API is running",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/projects", authenticate, projectsRouter);
app.use("/api/projects", authenticate, taskRouter);
app.use("/api/tasks", authenticate, taskRouter);
app.use("/api/notes", authenticate, notesRouter);
app.use("/api/activities", authenticate, activitiesRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`NEXUS server running on port ${PORT}`);
});
