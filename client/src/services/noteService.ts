import api from "./api";

export interface Note {
  id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface GetNotesParams {
  search?: string;
  page?: number;
  limit?: number;
  sort?: "title" | "created_at" | "updated_at";
  order?: "asc" | "desc";
}

interface NotesResponse {
  success: boolean;
  notes: Note[];
}
export const getNotes = async (): Promise<NotesResponse> => {
  const response = await api.get("/notes");

  return response.data;
};

export interface CreateNoteData {
  title: string;
  content: string;
}

export const createNote = async (
  data: CreateNoteData,
): Promise<Note> => {
  const response = await api.post("/notes", data);

  return response.data.note;
};

export interface UpdateNoteData {
  title: string;
  content: string;
}

export const updateNote = async (
  noteId: number,
  data: UpdateNoteData,
): Promise<Note> => {
  const response = await api.patch(
    `/notes/${noteId}`,
    data,
  );

  return response.data.note;
};

export const deleteNote = async (
  noteId: number,
): Promise<void> => {
  await api.delete(`/notes/${noteId}`);
};