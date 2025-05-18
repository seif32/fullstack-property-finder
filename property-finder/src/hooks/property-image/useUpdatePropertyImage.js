import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePropertyImage } from "../../services/apiPropertyImage";

export const useUpdatePropertyImage = (propertyId, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ imageId, imageData }) =>
      updatePropertyImage(imageId, imageData),
    onSuccess: (data, variables, context) => {
      // Invalidate property images queries
      if (variables.imageData.propertyId) {
        queryClient.invalidateQueries(["propertyImages", propertyId]);
      }

      // Call the onSuccess callback if provided
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};
