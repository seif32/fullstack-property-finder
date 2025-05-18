import { useQuery } from "@tanstack/react-query";
import { getPropertyReviewStats } from "../../services/apiReview";

export const useGetPropertyReviewStats = (propertyId, options = {}) =>
  useQuery({
    queryKey: ["reviews", "property", propertyId, "stats"],
    queryFn: () => getPropertyReviewStats(propertyId),
    enabled: !!propertyId,
    ...options,
  });
