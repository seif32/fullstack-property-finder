import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePropertyImage } from "../../services/apiPropertyImage";

export const useDeletePropertyImage = (propertyId, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (imageId) => deletePropertyImage(imageId),
    onSuccess: (data, variables, context) => {
      // Invalidate property images queries
      queryClient.invalidateQueries({
        queryKey: ["propertyImages", propertyId],
      });

      // Call the onSuccess callback if provided
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};
