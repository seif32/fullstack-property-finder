import { useQuery } from "@tanstack/react-query";
import { getCityNeighborhoods } from "../../services/apiLocation";

export const useGetCityNeighborhoods = (cityName, options = {}) =>
  useQuery({
    queryKey: ["locations", "city", cityName, "neighborhoods"],
    queryFn: () => getCityNeighborhoods(cityName),
    enabled: !!cityName,
    ...options,
  });
