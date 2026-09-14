// src/queries/catalog/useCatalogInfiniteQuery.ts
import { useInfiniteQuery } from "@tanstack/react-query";

import { getCatalogPage } from "../../api/endpoints/catalog.api";
import { queryKeys } from "../keys";

export function useCatalogInfiniteQuery(category: string | null) {
  const queryKey = queryKeys.catalog(category);

  const catalogQuery = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam, signal }) =>
      getCatalogPage(pageParam, category, signal),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
    refetchOnReconnect: "always",
  });

  return catalogQuery;
}
