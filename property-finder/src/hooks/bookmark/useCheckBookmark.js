import { useQuery } from "@tanstack/react-query";
import { checkBookmark } from "../../services/apiBookmark";

export const useCheckBookmark = (userId, propertyId, options = {}) =>
  useQuery({
    queryKey: ["bookmark", "check", userId, propertyId],
    queryFn: () => checkBookmark(userId, propertyId),
    enabled: !!(userId && propertyId),
    ...options,
  });
