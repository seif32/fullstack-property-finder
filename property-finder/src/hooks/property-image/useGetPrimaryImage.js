import { useQuery } from "@tanstack/react-query";
import { getPrimaryImage } from "../../services/apiPropertyImage";

export const useGetPrimaryImage = (propertyId, options = {}) =>
  useQuery({
    queryKey: ["propertyImages", propertyId, "primary"],
    queryFn: () => getPrimaryImage(propertyId),
    enabled: !!propertyId,
    ...options,
  });
