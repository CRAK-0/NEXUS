import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../services/projectService.ts";

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
};