import { useQuery } from "@tanstack/react-query";
import { getUserBookmarks } from "../../services/apiBookmark";

export const useGetUserBookmarks = (userId, options = {}) =>
  useQuery({
    queryKey: ["bookmarks", "user", userId],
    queryFn: () => getUserBookmarks(userId),
    enabled: !!userId,
    ...options,
  });
