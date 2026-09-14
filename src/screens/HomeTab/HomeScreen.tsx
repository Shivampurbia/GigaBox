import { useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { HomeTemplate } from "@/components/HomeTemplate";
import { SearchResults } from "@/components/HomeTemplate/SearchResults";
import { HomeTemplateSkeleton } from "@/components/HomeTemplate/skeleton";
import { ScreenState } from "@/components/ScreenState";
import { ThemedView } from "@/components/themed-view";
import { useConnectivity } from "@/connectivity/ConnectivityProvider";
import { useTheme } from "@/hooks/use-theme";
import { useCatalogInfiniteQuery } from "@/queries/catalog/useCatalogInfiniteQuery";
import { useCategoriesQuery } from "@/queries/catalog/useCategoriesQuery";
import { useProductSearchQuery } from "@/queries/catalog/useProductSearchQuery";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCategory } from "@/store/slices/filtersSlice";

export default function HomeScreen() {
  const theme = useTheme();
  const { isOnline } = useConnectivity();
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector(
    (state) => state.filters.activeCategory,
  );
  const catalogQuery = useCatalogInfiniteQuery(activeCategory);
  const categoriesQuery = useCategoriesQuery();
  const searchQuery = useProductSearchQuery(searchTerm);

  const products = useMemo(
    () => catalogQuery.data?.pages.flatMap((page) => page.products) ?? [],
    [catalogQuery.data],
  );

  if (catalogQuery.isPending || categoriesQuery.isPending) {
    if (!isOnline) {
      return (
        <ScreenState
          title="Catalog unavailable offline"
          message="Connect once to save products for offline browsing."
        />
      );
    }

    return (
      <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
        <HomeTemplateSkeleton />
      </SafeAreaView>
    );
  }

  if (catalogQuery.isError || categoriesQuery.isError) {
    return (
      <ScreenState
        title={
          isOnline
            ? "Could not load the catalog"
            : "Catalog unavailable offline"
        }
        message={
          isOnline
            ? "Check your connection and try again."
            : "Reconnect to refresh the catalog."
        }
        actionLabel={isOnline ? "Try again" : undefined}
        onAction={
          isOnline
            ? () => {
                void catalogQuery.refetch();
                void categoriesQuery.refetch();
              }
            : undefined
        }
      />
    );
  }
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <ThemedView type="backgroundElement" style={styles.searchContainer}>
        <TextInput
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Search products"
          placeholderTextColor={theme.textSecondary}
          returnKeyType="search"
          style={[styles.searchInput, { color: theme.text }]}
        />
      </ThemedView>
      {searchTerm.trim().length > 0 ? (
        <SearchResults
          products={searchQuery.data}
          isPending={searchQuery.isPending}
          isError={searchQuery.isError}
          isOnline={isOnline}
          onRetry={() => void searchQuery.refetch()}
        />
      ) : (
        <HomeTemplate
          products={products}
          categories={categoriesQuery.data}
          activeCategory={activeCategory}
          onSelectCategory={(category) => dispatch(setCategory(category))}
          onEndReached={() => {
            if (
              catalogQuery.hasNextPage &&
              !catalogQuery.isFetchingNextPage &&
              !catalogQuery.isFetching
            ) {
              void catalogQuery.fetchNextPage();
            }
          }}
          refetch={catalogQuery.refetch}
          isRefetching={
            catalogQuery.isFetching && !catalogQuery.isFetchingNextPage
          }
          isFetchingNextPage={catalogQuery.isFetchingNextPage}
        />
      )}
      {catalogQuery.isFetching && !catalogQuery.isFetchingNextPage && (
        <ThemedView type="backgroundElement" style={styles.filterLoading}>
          <ActivityIndicator />
        </ThemedView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    marginHorizontal: 12,
    marginBottom: 8,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  searchInput: {
    height: 42,
    fontSize: 16,
  },
  filterLoading: {
    position: "absolute",
    top: 12,
    right: 12,
    borderRadius: 12,
    padding: 4,
  },
});
