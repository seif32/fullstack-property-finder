import { useQuery } from "@tanstack/react-query";
import { getBookmarkById } from "../../services/apiBookmark";

export const useGetBookmarkById = (id, options = {}) =>
  useQuery({
    queryKey: ["bookmark", id],
    queryFn: () => getBookmarkById(id),
    enabled: !!id,
    ...options,
  });
