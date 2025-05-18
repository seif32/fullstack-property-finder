import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLocation } from "../../services/apiLocation";

export const useDeleteLocation = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteLocation(id),
    onSuccess: (data, variables, context) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      queryClient.removeQueries({ queryKey: ["location", variables] });

      // We don't know the parent ID or type, so invalidate all related queries
      queryClient.invalidateQueries({ queryKey: ["locations", "parent"] });
      queryClient.invalidateQueries({ queryKey: ["locations", "type"] });
      queryClient.invalidateQueries({ queryKey: ["locations", "root"] });

      // Call the onSuccess callback if provided
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};
