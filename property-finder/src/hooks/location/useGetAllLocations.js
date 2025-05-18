import { useQuery } from "@tanstack/react-query";
import { getAllLocations } from "../../services/apiLocation";

export const useGetAllLocations = (options = {}) =>
  useQuery({
    queryKey: ["locations"],
    queryFn: getAllLocations,
    ...options,
  });
