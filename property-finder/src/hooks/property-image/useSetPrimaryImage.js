import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setPrimaryImage } from "../../services/apiPropertyImage";

export const useSetPrimaryImage = (propertyId, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (imageId) => setPrimaryImage(imageId),
    onSuccess: (data, variables, context) => {
      // Invalidate all property images queries
      queryClient.invalidateQueries({
        queryKey: ["propertyImages", propertyId],
      });

      // Specifically invalidate primary image query
      queryClient.invalidateQueries({
        queryKey: ["propertyImages", propertyId, "primary"],
      });

      // Call the onSuccess callback if provided
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};
