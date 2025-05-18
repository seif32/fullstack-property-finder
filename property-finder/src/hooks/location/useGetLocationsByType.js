import { useQuery } from "@tanstack/react-query";
import { getLocationsByType } from "../../services/apiLocation";

export const useGetLocationsByType = (type, options = {}) =>
  useQuery({
    queryKey: ["locations", "type", type],
    queryFn: () => getLocationsByType(type),
    enabled: !!type,
    ...options,
  });
