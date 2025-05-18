import { useQuery } from "@tanstack/react-query";
import { getLocationById } from "../../services/apiLocation";

export const useGetLocationById = (id, options = {}) =>
  useQuery({
    queryKey: ["location", id],
    queryFn: () => getLocationById(id),
    enabled: !!id,
    ...options,
  });
