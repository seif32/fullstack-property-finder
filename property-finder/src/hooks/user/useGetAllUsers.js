import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/apiUser";

export const useGetAllUsers = (options = {}) =>
  useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    ...options,
  });
