import { useQuery } from "@tanstack/react-query";
import { getPropertyBookmarks } from "../../services/apiBookmark";

export const useGetPropertyBookmarks = (propertyId, options = {}) =>
  useQuery({
    queryKey: ["bookmarks", "property", propertyId],
    queryFn: () => getPropertyBookmarks(propertyId),
    enabled: !!propertyId,
    ...options,
  });
