// src/hooks/viewing/useCreateViewingRequest.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createViewingRequest } from "../../services/apiAppointment";

export const useCreateViewingRequest = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createViewingRequest,

    onSuccess: (data, variables, context) => {
      // Invalidate only relevant queries
      queryClient.invalidateQueries({ queryKey: ["viewingRequests"] });

      // Optional callback
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },

    onError: (error, variables, context) => {
      if (options.onError) {
        options.onError(error, variables, context);
      }
    },

    ...options,
  });
};
