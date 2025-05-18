import { useQuery } from "@tanstack/react-query";
import { getUserReviews } from "../../services/apiReview";

export const useGetUserReviews = (userId, options = {}) =>
  useQuery({
    queryKey: ["reviews", "user", userId],
    queryFn: () => getUserReviews(userId),
    enabled: !!userId,
    ...options,
  });
