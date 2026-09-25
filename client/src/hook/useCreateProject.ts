import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProject,
  type CreateProjectData,
} from "../services/projectService.ts";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectData) => createProject(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
};