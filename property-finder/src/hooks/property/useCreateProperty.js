import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProperty } from "../../services/apiProperty";

export const useCreateProperty = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (propertyData) => createProperty(propertyData),
    onSuccess: (data, variables, context) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["properties"] });

      // If there's a specific owner, invalidate that query too
      if (variables.ownerId) {
        queryClient.invalidateQueries({
          queryKey: ["properties", "owner", variables.ownerId],
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
