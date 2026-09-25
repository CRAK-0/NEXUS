import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  updateNote,
  type UpdateNoteData,
} from "../services/noteService";

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      noteId,
      data,
    }: {
      noteId: number;
      data: UpdateNoteData;
    }) => updateNote(noteId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });
};