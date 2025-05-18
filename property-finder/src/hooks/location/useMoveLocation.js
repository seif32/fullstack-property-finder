import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moveLocation } from "../../services/apiLocation";

export const useMoveLocation = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, newParentId }) => moveLocation(id, newParentId),
    onSuccess: (data, variables, context) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      queryClient.invalidateQueries({ queryKey: ["location", variables.id] });

      // Invalidate old parent's sub-locations (we don't know the old parent ID here)
      // So we invalidate all parent queries
      queryClient.invalidateQueries({ queryKey: ["locations", "parent"] });

      // Invalidate new parent's sub-locations
      queryClient.invalidateQueries({
        queryKey: ["locations", "parent", variables.newParentId],
      });

      // Invalidate root locations (in case the location was moved to/from root)
      queryClient.invalidateQueries({ queryKey: ["locations", "root"] });

      // Call the onSuccess callback if provided
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};
