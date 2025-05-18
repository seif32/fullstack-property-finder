import { useQuery } from "@tanstack/react-query";
import { getNonPrimaryImages } from "../../services/apiPropertyImage";

export const useGetNonPrimaryImages = (propertyId, options = {}) =>
  useQuery({
    queryKey: ["propertyImages", propertyId, "nonPrimary"],
    queryFn: () => getNonPrimaryImages(propertyId),
    enabled: !!propertyId,
    ...options,
  });
