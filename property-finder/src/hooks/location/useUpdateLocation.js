import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLocation } from "../../services/apiLocation";

export const useUpdateLocation = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, locationData }) => updateLocation(id, locationData),
    onSuccess: (data, variables, context) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      queryClient.invalidateQueries({ queryKey: ["location", variables.id] });

      if (variables.locationData.type) {
        queryClient.invalidateQueries({
          queryKey: ["locations", "type", variables.locationData.type],
        });
      }

      if (variables.locationData.parentLocationId) {
        queryClient.invalidateQueries({
          queryKey: [
            "locations",
            "parent",
            variables.locationData.parentLocationId,
          ],
        });
      }

      // Call the onSuccess callback if provided
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};
