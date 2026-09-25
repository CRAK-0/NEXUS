import api from "./api";

export interface SearchProject {
  id: number;
  name: string;
  description: string;
  status: "pending" | "complete";
}

export interface SearchTask {
  id: number;
  project_id: number;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "complete";
  priority: "low" | "medium" | "high";
}

export interface SearchNote {
  id: number;
  title: string;
  content: string;
}

export interface SearchResponse {
  success: boolean;
  query: string;
  results: {
    projects: SearchProject[];
    tasks: SearchTask[];
    notes: SearchNote[];
  };
}

export const search = async (
  query: string,
): Promise<SearchResponse> => {
  const response = await api.get("/search", {
    params: {
      q: query,
    },
  });

  return response.data;
};

