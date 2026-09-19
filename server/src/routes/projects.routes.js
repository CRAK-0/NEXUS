import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../controllers/projects.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  projectBodySchema,
  projectIdSchema,
  projectQuerySchema,
  projectUpdateSchema,
} from "../validators/projects.validator.js";

const router = Router();

router.get("/", validate(projectQuerySchema, "query"), getProjects);
router.post("/", validate(projectBodySchema, "body"), createProject);
router.patch(
  "/:id",
  validate(projectIdSchema, "params"),
  validate(projectUpdateSchema, "body"),
  updateProject,
);
router.delete("/:id", validate(projectIdSchema, "params"), deleteProject);
export default router;
