import { useQuery } from "@tanstack/react-query";
import { getPropertyById } from "../../services/apiProperty";

export const useGetPropertyById = (id, options = {}) =>
  useQuery({
    queryKey: ["property", id],
    queryFn: () => getPropertyById(id),
    enabled: !!id,
    ...options,
  });
