import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookmarkByUserAndProperty } from "../../services/apiBookmark";

export const useDeleteBookmarkByUserAndProperty = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, propertyId }) =>
      deleteBookmarkByUserAndProperty(userId, propertyId),
    onSuccess: (data, variables, context) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });

      if (variables.userId) {
        queryClient.invalidateQueries({
          queryKey: ["bookmarks", "user", variables.userId],
        });
      }

      if (variables.propertyId) {
        queryClient.invalidateQueries({
          queryKey: ["bookmarks", "property", variables.propertyId],
        });
      }

      // Also invalidate the check bookmark query
      queryClient.invalidateQueries({
        queryKey: ["bookmark", "check", variables.userId, variables.propertyId],
      });

      // Call the onSuccess callback if provided
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};
