import {
  createProjectForUser,
  getProjectsForUser,
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
    const { name, description, status } = req.validated.body;

    console.log(id, name, description, status);

    res.json({
      success: true,
      message: "Update data received",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update project",
    });
  }
};
