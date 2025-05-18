import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../../services/apiUser";

export const useCreateUser = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData) => createUser(userData),
    onSuccess: (data, variables, context) => {
      // Invalidate users query
      queryClient.invalidateQueries({ queryKey: ["users"] });

      // Call the onSuccess callback if provided
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};
