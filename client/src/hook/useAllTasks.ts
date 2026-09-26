import { useQuery } from "@tanstack/react-query";

import { getAllTasks } from "../services/taskService.ts";

export const useAllTasks = () => {
  return useQuery({
    queryKey: ["allTasks"],
    queryFn: getAllTasks,
  });
};