import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReview } from "../../services/apiReview";

export const useUpdateReview = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reviewData }) => updateReview(id, reviewData),
    onSuccess: (data, variables, context) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["review", variables.id] });

      if (variables.reviewData.propertyId) {
        queryClient.invalidateQueries({
          queryKey: ["reviews", "property", variables.reviewData.propertyId],
        });
        queryClient.invalidateQueries({
          queryKey: [
            "reviews",
            "property",
            variables.reviewData.propertyId,
            "stats",
          ],
        });
      }

      if (variables.reviewData.userId) {
        queryClient.invalidateQueries({
          queryKey: ["reviews", "user", variables.reviewData.userId],
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
