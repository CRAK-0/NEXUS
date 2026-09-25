import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  updateTask,
  type UpdateTaskData,
} from "../services/taskService";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      data,
    }: {
      taskId: number;
      data: UpdateTaskData;
    }) => updateTask(taskId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};