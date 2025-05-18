import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "../../services/apiReview";

export const useCreateReview = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewData) => createReview(reviewData),
    onSuccess: (data, variables, context) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["reviews"] });

      if (variables.propertyId) {
        queryClient.invalidateQueries({
          queryKey: ["reviews", "property", variables.propertyId],
        });
        queryClient.invalidateQueries({
          queryKey: ["reviews", "property", variables.propertyId, "stats"],
        });
      }

      if (variables.userId) {
        queryClient.invalidateQueries({
          queryKey: ["reviews", "user", variables.userId],
        });
      }

      queryClient.invalidateQueries({ queryKey: ["reviews", "recent"] });

      // Call the onSuccess callback if provided
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};
