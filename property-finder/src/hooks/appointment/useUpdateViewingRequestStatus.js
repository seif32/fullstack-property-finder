import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateViewingRequestStatus } from "../../services/apiAppointment";

export const useUpdateViewingRequestStatus = (agentId, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ requestId, status }) =>
      updateViewingRequestStatus({ requestId, status }),

    // Optimistic update
    onMutate: async ({ requestId, status }) => {
      await queryClient.cancelQueries({
        queryKey: ["viewingRequests", "agent", agentId],
      });

      const previousRequests = queryClient.getQueryData([
        "viewingRequests",
        "agent",
        agentId,
      ]);

      // Optimistically update the status
      queryClient.setQueryData(
        ["viewingRequests", "agent", agentId],
        (old = []) =>
          old.map((req) => (req.id === requestId ? { ...req, status } : req))
      );

      // Return context to rollback if needed
      return { previousRequests };
    },

    // If error, rollback
    onError: (err, variables, context) => {
      if (context?.previousRequests) {
        queryClient.setQueryData(
          ["viewingRequests", "agent", agentId],
          context.previousRequests
        );
      }
    },

    // Always refetch after success
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["viewingRequests", "agent", agentId],
      });
    },

    ...options,
  });
};
