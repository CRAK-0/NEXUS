import { useQuery } from "@tanstack/react-query";
import {
  getProjects,
  type GetProjectsParams,
} from "../services/projectService";

export const useProjects = (params?: GetProjectsParams) => {
  return useQuery({
    queryKey: ["projects", params],
    queryFn: () => getProjects(params),
  });
};