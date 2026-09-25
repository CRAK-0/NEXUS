import { useQuery } from "@tanstack/react-query";

import {
  search,
} from "../services/searchService";

export const useSearch = (query: string) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => search(query),
    enabled: query.trim().length > 0,
  });
};
