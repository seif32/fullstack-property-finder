import { useQuery } from "@tanstack/react-query";
import { getReviewById } from "../../services/apiReview";

export const useGetReviewById = (id, options = {}) =>
  useQuery({
    queryKey: ["review", id],
    queryFn: () => getReviewById(id),
    enabled: !!id,
    ...options,
  });
