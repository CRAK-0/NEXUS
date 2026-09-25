import { useQuery } from "@tanstack/react-query";
import { getActivities } from "../services/activityService";

export const useActivities = () => {
  return useQuery({
    queryKey: ["activities"],
    queryFn: getActivities,
  });
};