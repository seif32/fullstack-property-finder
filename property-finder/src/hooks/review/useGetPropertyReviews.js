import { useQuery } from "@tanstack/react-query";
import { getPropertyReviews } from "../../services/apiReview";

export const useGetPropertyReviews = (propertyId, options = {}) =>
  useQuery({
    queryKey: ["reviews", "property", propertyId],
    queryFn: () => getPropertyReviews(propertyId),
    enabled: !!propertyId,
    ...options,
  });
