import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiUser";

export const useCurrentUser = (token) =>
  useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(token),
    enabled: !!token, // Only run if token exists
  });
