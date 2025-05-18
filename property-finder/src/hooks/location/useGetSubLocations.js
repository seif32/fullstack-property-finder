import { useQuery } from "@tanstack/react-query";
import { getSubLocations } from "../../services/apiLocation";

export const useGetSubLocations = (parentLocationId, options = {}) =>
  useQuery({
    queryKey: ["locations", "parent", parentLocationId],
    queryFn: () => getSubLocations(parentLocationId),
    enabled: !!parentLocationId,
    ...options,
  });
