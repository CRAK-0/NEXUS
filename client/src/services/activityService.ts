import api from "./api.ts";

export interface Activity {
  id: number;
  user_id: number;
  action: string;
  entity_type: string;
  entity_id: number;
  created_at: string;
}

interface ActivitiesResponse {
  success: boolean;
  activities: Activity[];
}

export const getActivities = async (): Promise<ActivitiesResponse> => {
  const response = await api.get("/activities");

  return response.data;
};