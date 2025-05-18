import { useQuery } from "@tanstack/react-query";
import { getPropertiesByOwner } from "../../services/apiProperty";

export const useGetPropertiesByOwner = (ownerId, options = {}) =>
  useQuery({
    queryKey: ["properties", "owner", ownerId],
    queryFn: () => getPropertiesByOwner(ownerId),
    enabled: !!ownerId,
    ...options,
  });
