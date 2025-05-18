import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../services/apiUser";

export const useDeleteUser = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess: (data, variables, context) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.removeQueries({ queryKey: ["user", variables] });

      // Call the onSuccess callback if provided
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};
