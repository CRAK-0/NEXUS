import { useQuery } from "@tanstack/react-query";

import {
  getTasks,
  type GetTasksParams,
} from "../services/taskService";

export const useTasks = (
  projectId: number,
  params?: GetTasksParams,
) => {
  return useQuery({
    queryKey: ["tasks", projectId, params],

    queryFn: async () => {
  const data = await getTasks(projectId, params);

  return data;
},
    enabled: projectId > 0,
  });
};