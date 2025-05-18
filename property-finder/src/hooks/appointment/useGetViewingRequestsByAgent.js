import { useQuery } from "@tanstack/react-query";
import { getViewingRequestsByAgent } from "../../services/apiAppointment";

export const useGetViewingRequestsByAgent = (agentId, options = {}) =>
  useQuery({
    queryKey: ["viewingRequests", "agent", agentId],
    queryFn: () => getViewingRequestsByAgent(agentId),
    enabled: !!agentId,
    ...options,
  });
