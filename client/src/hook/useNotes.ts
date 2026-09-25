import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../services/noteService";

export const useNotes = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });
};