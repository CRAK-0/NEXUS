import api from "./api";

export interface Project {
  id: number;
  user_id: number;
  name: string;
  description: string;
  status: "pending" | "complete";
  created_at: string;
  updated_at: string;
}
export interface GetProjectsParams {
  status?: "pending" | "complete";
  search?: string;
  page?: number;
  limit?: number;
  sort?: "name" | "created_at" | "updated_at";
  order?: "asc" | "desc";
}

interface ProjectsData {
  projects: Project[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface ProjectsResponse {
  success: boolean;
  filters: {
    status: string | null;
    search: string | null;
  };
  projects: ProjectsData;
}

export const getProjects = async (
  params?: GetProjectsParams,
): Promise<ProjectsResponse> => {
  const response = await api.get("/projects", {
    params,
  });

  return response.data;
};

export interface CreateProjectData {
  name: string;
  description: string;
}
export const createProject = async (
  data: CreateProjectData,
): Promise<Project> => {
  const response = await api.post("/projects", data);

  return response.data.project;
};

export interface UpdateProjectData {
  name: string;
  description: string;
}

export const updateProject = async (
  id: number,
  data: UpdateProjectData,
): Promise<Project> => {
  const response = await api.patch(`/projects/${id}`, data);

  return response.data.project;
};