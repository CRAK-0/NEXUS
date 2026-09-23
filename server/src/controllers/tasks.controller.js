import {
  createTaskForUser,
  deleteTaskForUser,
  getAllTasksForUser,
  getTasksForProject,
  updateTaskForUser,
} from "../services/tasks.service.js";

export const createTask = async (req, res, next) => {
  try {
    const { projectId } = req.validated.params;
    const taskData = req.validated.body;

    const userId = req.user.id;

    const task = await createTaskForUser(userId, projectId, taskData);

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const { projectId } = req.validated.params;

    const userId = req.user.id;

    const tasks = await getTasksForProject(userId, projectId);

    res.json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  console.log("UPDATE TASK CONTROLLER HIT");
  try {
    const { id } = req.validated.params;
    const updateData = req.validated.body;

    const userId = req.user.id;

    const task = await updateTaskForUser(userId, id, updateData);

    res.json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.validated.params;

    const userId = req.user.id;

    const task = await deleteTaskForUser(userId, id);

    res.json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllTasks = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const tasks = await getAllTasksForUser(userId);

    res.json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};
