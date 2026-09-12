// src/queries/catalog/useCategoriesQuery.ts
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api/endpoints/catalog.api";
import { queryKeys } from "../keys";

export function useCategoriesQuery() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: ({ signal }) => getCategories(signal),
    staleTime: 1000 * 60 * 60, // categories barely change
    refetchOnMount: "always",
  });
}
