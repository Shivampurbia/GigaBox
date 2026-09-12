import { useQuery } from "@tanstack/react-query";

import { getProduct } from "@/api/endpoints/catalog.api";
import { queryKeys } from "@/queries/keys";

export function useProductQuery(productId: number) {
  return useQuery({
    queryKey: queryKeys.product(productId),
    queryFn: ({ signal }) => getProduct(productId, signal),
    enabled: Number.isInteger(productId) && productId > 0,
  });
}
