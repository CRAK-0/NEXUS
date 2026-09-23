import api from "./api.ts";

export interface Task {
  id: number;
  project_id: number;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "complete";
  priority: "low" | "medium" | "high";
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

interface TasksResponse {
  success: boolean;
  tasks: Task[];
}
export const getTasks = async ():Promise<TasksResponse> => {
    const respose = await api.get("/tasks");

    return respose.data;
}