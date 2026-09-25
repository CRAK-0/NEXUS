import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createNote,
  type CreateNoteData,
} from "../services/noteService";

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNoteData) =>
      createNote(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });
};