import { useQuery } from "@tanstack/react-query";
import { searchProperties } from "../../services/apiProperty";

export const useSearchProperties = (filters = {}, options = {}) =>
  useQuery({
    queryKey: ["properties", "search", filters],
    queryFn: () => searchProperties(filters),
    ...options,
  });
