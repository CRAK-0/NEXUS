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

export const getProjects = async (): Promise<ProjectsResponse> => {
  const response = await api.get("/projects");

  return response.data;
};