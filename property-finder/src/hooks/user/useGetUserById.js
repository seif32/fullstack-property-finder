import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../services/apiUser";

export const useGetUserById = (id, options = {}) =>
  useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
    ...options,
  });
