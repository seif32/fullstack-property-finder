import { useQuery } from "@tanstack/react-query";
import { getRootLocations } from "../../services/apiLocation";

export const useGetRootLocations = (options = {}) =>
  useQuery({
    queryKey: ["locations", "root"],
    queryFn: getRootLocations,
    ...options,
  });
