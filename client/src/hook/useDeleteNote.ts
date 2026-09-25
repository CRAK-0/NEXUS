import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteNote } from "../services/noteService";

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noteId: number) =>
      deleteNote(noteId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });
};