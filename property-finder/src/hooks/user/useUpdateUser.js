import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiUser";

export const useUpdateUser = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, userData }) => updateUser(userId, userData),
    onSuccess: (data, variables, context) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] });

      // Call the onSuccess callback if provided
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};
