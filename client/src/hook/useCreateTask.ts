import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createTask,
  type CreateTaskData,
} from "../services/taskService";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      data,
    }: {
      projectId: number;
      data: CreateTaskData;
    }) => createTask(projectId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.projectId],
      });
    },
  });
};