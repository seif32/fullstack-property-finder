import { useQuery } from "@tanstack/react-query";
import { getAllProperties } from "../../services/apiProperty";

export const useGetAllProperties = (
  page = 1,
  limit = 10,
  sort = "newest",
  options = {}
) =>
  useQuery({
    queryKey: ["properties", { page, limit, sort }],
    queryFn: () => getAllProperties(page, limit, sort),
    ...options,
  });
