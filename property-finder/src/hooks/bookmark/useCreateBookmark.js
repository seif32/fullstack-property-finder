import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookmark } from "../../services/apiBookmark";

export const useCreateBookmark = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookmarkData) => createBookmark(bookmarkData),
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

        // Also invalidate the check bookmark query
        if (variables.userId) {
          queryClient.invalidateQueries({
            queryKey: [
              "bookmark",
              "check",
              variables.userId,
              variables.propertyId,
            ],
          });
        }
      }

      // Call the onSuccess callback if provided
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};
