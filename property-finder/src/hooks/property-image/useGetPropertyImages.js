import { useQuery } from "@tanstack/react-query";
import { getPropertyImages } from "../../services/apiPropertyImage";

export const useGetPropertyImages = (propertyId, options = {}) =>
  useQuery({
    queryKey: ["propertyImages", propertyId],
    queryFn: () => getPropertyImages(propertyId),
    enabled: !!propertyId,
    ...options,
  });
