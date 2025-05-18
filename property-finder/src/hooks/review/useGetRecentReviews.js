import { useQuery } from "@tanstack/react-query";
import { getRecentReviews } from "../../services/apiReview";

export const useGetRecentReviews = (limit = 10, options = {}) =>
  useQuery({
    queryKey: ["reviews", "recent", limit],
    queryFn: () => getRecentReviews(limit),
    ...options,
  });
