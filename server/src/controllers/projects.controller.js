import {
  createProjectForUser,
  deleteProjectForUser,
  getProjectsForUser,
  updateProjectForUser,
} from "../services/projects.service.js";

export const getProjects = async (req, res) => {
  try {
    const { status, search, page, limit, sort, order } = req.validated;

    const normalizedSearch = search ? `%${search}%` : null;

    const projects = await getProjectsForUser(
      1,
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
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const { name, description, status } = req.validated;

    const project = await createProjectForUser(1, name, description, status);

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create project",
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.validated.params;
    const updateData = req.validated.body;

    const updatedProject = await updateProjectForUser(1, id, updateData);

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
    res.status(500).json({
      success: false,
      message: "Failed to update project",
    });
  }
};
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.validated.params;
    const userId = 1;

    const deleteValue = await deleteProjectForUser(userId, id);

    if (!deleteValue) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    res.json({
      success: true,
      project: deleteValue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
    });
  }
};
