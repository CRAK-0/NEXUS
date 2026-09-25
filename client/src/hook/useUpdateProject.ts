import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateProject,
  type UpdateProjectData,
} from "../services/projectService.ts";

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateProjectData;
    }) => updateProject(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
};