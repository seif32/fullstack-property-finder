import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLocation } from "../../services/apiLocation";

export const useCreateLocation = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (locationData) => createLocation(locationData),
    onSuccess: (data, variables, context) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["locations"] });

      if (variables.type) {
        queryClient.invalidateQueries({
          queryKey: ["locations", "type", variables.type],
        });
      }

      if (variables.parentLocationId) {
        queryClient.invalidateQueries({
          queryKey: ["locations", "parent", variables.parentLocationId],
        });
      } else {
        queryClient.invalidateQueries({ queryKey: ["locations", "root"] });
      }

      // Call the onSuccess callback if provided
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};
