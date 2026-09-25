import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteTask } from "../services/taskService";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: number) => deleteTask(taskId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};