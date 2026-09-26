import api from "./api";

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

export interface GetTasksParams {
  status?: "todo" | "in_progress" | "complete";
  priority?: "low" | "medium" | "high";
  page?: number;
  limit?: number;
  sort?: "title" | "created_at" | "updated_at" | "due_date";
  order?: "asc" | "desc";
}

interface TasksResponse {
  success: boolean;
  tasks: Task[];
}

export const getTasks = async (
  projectId: number,
  params?: GetTasksParams,
): Promise<TasksResponse> => {
  const response = await api.get(
    `/projects/${projectId}/tasks`,
    {
      params,
    },
  );

  return response.data;
};

export interface CreateTaskData {
  title: string;
  description?: string;
  status?: "todo" | "in_progress" | "complete";
  priority?: "low" | "medium" | "high";
  due_date?: string | null;
}

export const createTask = async (
  projectId: number,
  data: CreateTaskData,
): Promise<Task> => {
  const response = await api.post(
    `/projects/${projectId}/tasks`,
    data,
  );

  return response.data.task;
};

export interface UpdateTaskData {
  title: string;
  description?: string;
  status?: "todo" | "in_progress" | "complete";
  priority?: "low" | "medium" | "high";
  due_date?: string | null;
}

export const updateTask = async (
  taskId: number,
  data: UpdateTaskData,
): Promise<Task> => {
  const response = await api.patch(
    `/projects/tasks/${taskId}`,
    data,
  );

  return response.data.task;
};

export const deleteTask = async (
  taskId: number,
): Promise<void> => {
  await api.delete(`/projects/tasks/${taskId}`);
};

export const getAllTasks = async (): Promise<TasksResponse> => {
  const response = await api.get("/tasks");

  return response.data;
};