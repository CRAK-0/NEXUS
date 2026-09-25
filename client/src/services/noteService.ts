import api from "./api.ts";

export interface Note {
  id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

interface NotesResponse {
  success: boolean;
  notes: Note[];
}

export const getNotes = async (): Promise<NotesResponse> => {
  const response = await api.get("/notes");

  return response.data;
};