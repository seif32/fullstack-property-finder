import { useQuery } from "@tanstack/react-query";
import { searchLocations } from "../../services/apiLocation";

export const useSearchLocations = (name, options = {}) =>
  useQuery({
    queryKey: ["locations", "search", name],
    queryFn: () => searchLocations(name),
    enabled: !!name,
    ...options,
  });
