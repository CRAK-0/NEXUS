import { validate } from "../middlewares/validate.js";
import {
  taskBodySchema,
  taskIdSchema,
  taskProjectIdSchema,
  taskUpdateSchema,
} from "../validators/tasks.validator.js";
import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/tasks.controller.js";

const router = Router();

router.post(
  "/:projectId/tasks",
  validate(taskProjectIdSchema, "params"),
  validate(taskBodySchema, "body"),
  createTask,
);

router.get(
  "/:projectId/tasks",
  validate(taskProjectIdSchema, "params"),
  getTasks,
);

router.patch(
  "/:id",
  validate(taskIdSchema, "params"),
  validate(taskUpdateSchema, "body"),
  updateTask,
);

router.delete("/:id", validate(taskIdSchema, "params"), deleteTask);

export default router;
