import { useQuery } from "@tanstack/react-query";

import { getProject } from "../services/projectService";

export const useProject = (projectId: number) => {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProject(projectId),
    enabled: projectId > 0,
  });
};