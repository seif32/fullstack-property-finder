import { useMutation, useQueryClient } from "@tanstack/react-query";
import { promoteUserToAgent } from "../../services/apiUser";

export function usePromoteAgent() {
  const queryClient = useQueryClient();

  const { mutate: promoteToAgent, isPending } = useMutation({
    mutationFn: (id) => promoteUserToAgent(id),
    onSuccess: (data, variables) => {
      // Optionally invalidate or update users list if you're caching it
      queryClient.invalidateQueries({ queryKey: ["users"] });
      console.log(`User ID ${variables.id} promoted to AGENT`);
    },
    onError: (err) => {
      console.error("Failed to promote user:", err);
    },
  });

  return {
    promoteToAgent,
    isPending,
  };
}
