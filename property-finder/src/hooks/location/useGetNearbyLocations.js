import { useQuery } from "@tanstack/react-query";
import { getNearbyLocations } from "../../services/apiLocation";

export const useGetNearbyLocations = (
  latitude,
  longitude,
  radiusInKm = 5,
  options = {}
) =>
  useQuery({
    queryKey: ["locations", "nearby", { latitude, longitude, radiusInKm }],
    queryFn: () => getNearbyLocations(latitude, longitude, radiusInKm),
    enabled: !!(latitude && longitude),
    ...options,
  });
