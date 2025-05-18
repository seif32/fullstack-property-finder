import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "../../services/apiReview";

export const useDeleteReview = (propertyId, userId, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteReview(id),
    onSuccess: (data, variables, context) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.removeQueries({ queryKey: ["review", variables] });

      if (propertyId) {
        queryClient.invalidateQueries({
          queryKey: ["reviews", "property", propertyId],
        });
        queryClient.invalidateQueries({
          queryKey: ["reviews", "property", propertyId, "stats"],
        });
      }

      if (userId) {
        queryClient.invalidateQueries({
          queryKey: ["reviews", "user", userId],
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
