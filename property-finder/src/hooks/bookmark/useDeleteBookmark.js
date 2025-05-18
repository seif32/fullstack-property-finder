import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookmark } from "../../services/apiBookmark";

export const useDeleteBookmark = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteBookmark(id),
    onSuccess: (data, variables, context) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.removeQueries({ queryKey: ["bookmark", variables] });

      // Call the onSuccess callback if provided
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};
