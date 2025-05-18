import { useQuery } from "@tanstack/react-query";
import { getAllBookmarks } from "../../services/apiBookmark";

export const useGetAllBookmarks = (options = {}) =>
  useQuery({
    queryKey: ["bookmarks"],
    queryFn: getAllBookmarks,
    ...options,
  });
