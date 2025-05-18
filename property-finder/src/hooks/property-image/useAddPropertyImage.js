// useAddPropertyImage.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPropertyImage } from "../../services/apiPropertyImage";

export function useAddPropertyImage(propertyId) {
  const queryClient = useQueryClient();
  const { mutate: addImage, isPending } = useMutation({
    mutationFn: (image) => addPropertyImage(image),
    onSuccess: () =>
      queryClient.invalidateQueries(["propertyImages", propertyId]),
  });
  return { addImage, isPending };
}
