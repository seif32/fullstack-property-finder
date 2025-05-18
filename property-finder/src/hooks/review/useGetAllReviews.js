import { useQuery } from "@tanstack/react-query";
import { getAllReviews } from "../../services/apiReview";

export const useGetAllReviews = (options = {}) =>
  useQuery({
    queryKey: ["reviews"],
    queryFn: getAllReviews,
    ...options,
  });
