// src/queries/catalog/useCatalogInfiniteQuery.ts
import NetInfo from "@react-native-community/netinfo";
import {
  type InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import { getCatalogPage } from "../../api/endpoints/catalog.api";
import { type CatalogPage } from "../../api/types/product.types";
import { queryKeys } from "../keys";

function isOnlineState(state: {
  isConnected: boolean | null;
  isInternetReachable: boolean | null;
}) {
  return state.isConnected === true && state.isInternetReachable !== false;
}

export function useCatalogInfiniteQuery(category: string | null) {
  const client = useQueryClient();
  const wasOnline = useRef(false);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [onlineSessionId, setOnlineSessionId] = useState<string | null>(null);

  useEffect(() => {
    const updateConnection = (online: boolean) => {
      setIsOnline(online);
      if (online && !wasOnline.current) {
        setOnlineSessionId(String(Date.now()));
      }
      wasOnline.current = online;
    };

    void NetInfo.fetch().then((state) => {
      updateConnection(isOnlineState(state));
    });

    return NetInfo.addEventListener((state) => {
      updateConnection(isOnlineState(state));
    });
  }, []);

  const queryKey =
    isOnline === true && onlineSessionId
      ? queryKeys.catalogOnline(category, onlineSessionId)
      : queryKeys.catalog(category);

  const catalogQuery = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam, signal }) =>
      getCatalogPage(pageParam, category, signal),
    enabled:
      isOnline !== null && (isOnline === false || onlineSessionId !== null),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
  });

  useEffect(() => {
    if (isOnline !== true || !catalogQuery.data) {
      return;
    }

    client.setQueryData<InfiniteData<CatalogPage>>(
      queryKeys.catalog(category),
      catalogQuery.data,
    );
  }, [category, catalogQuery.data, client, isOnline]);

  return catalogQuery;
}
