import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllPropertyImages } from "../../services/apiPropertyImage";

export const useDeleteAllPropertyImages = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (propertyId) => deleteAllPropertyImages(propertyId),
    onSuccess: (data, variables, context) => {
      // Remove property images queries from cache
      queryClient.removeQueries({
        queryKey: ["propertyImages", variables],
      });

      // Call the onSuccess callback if provided
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};
