import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProperty } from "../../services/apiProperty";

export const useUpdateProperty = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, propertyData }) => updateProperty(id, propertyData),
    onSuccess: (data, variables, context) => {
      // Invalidate and refetch the specific property
      queryClient.invalidateQueries({ queryKey: ["property", variables.id] });

      // Invalidate the properties list
      queryClient.invalidateQueries({ queryKey: ["properties"] });

      // If there's a specific owner, invalidate that query too
      if (variables.propertyData.ownerId) {
        queryClient.invalidateQueries({
          queryKey: ["properties", "owner", variables.propertyData.ownerId],
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
