import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { searchProducts } from "@/api/endpoints/catalog.api";
import { queryKeys } from "@/queries/keys";

const SEARCH_DEBOUNCE_MS = 300;

export function useProductSearchQuery(searchTerm: string) {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return useQuery({
    queryKey: queryKeys.search(debouncedSearchTerm),
    queryFn: ({ signal }) => searchProducts(debouncedSearchTerm, signal),
    enabled: debouncedSearchTerm.length > 0,
    staleTime: 0,
    networkMode: "online",
  });
}
