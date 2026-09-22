import {
  createProjectForUser,
  deleteProjectForUser,
  getProjectsForUser,
  updateProjectForUser,
} from "../services/projects.service.js";

export const getProjects = async (req, res, next) => {
  try {
    const { status, search, page, limit, sort, order } = req.validated.query;

    const normalizedSearch = search ? `%${search}%` : null;

    const projects = await getProjectsForUser(
      req.user.id,
      status,
      normalizedSearch,
      page,
      limit,
      sort,
      order,
    );
    res.json({
      success: true,
      filters: {
        status,
        search,
      },
      projects,
    });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const { name, description, status } = req.validated.body;

    const project = await createProjectForUser(
      req.user.id,
      name,
      description,
      status,
    );

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.validated.params;
    const updateData = req.validated.body;

    const updatedProject = await updateProjectForUser(
      req.user.id,
      id,
      updateData,
    );

    // Put it HERE
    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      project: updatedProject,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.validated.params;
    const userId = req.user.id;

    const deleteValue = await deleteProjectForUser(userId, id);

    res.json({
      success: true,
      project: deleteValue,
    });
  } catch (error) {
    next(error);
  }
};
