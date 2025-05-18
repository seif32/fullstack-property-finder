import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProperty } from "../../services/apiProperty";

export const useDeleteProperty = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteProperty(id),
    onSuccess: (data, variables, context) => {
      // Invalidate and remove the specific property from cache
      queryClient.removeQueries({ queryKey: ["property", variables] });

      // Invalidate the properties list
      queryClient.invalidateQueries({ queryKey: ["properties"] });

      // Call the onSuccess callback if provided
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};
