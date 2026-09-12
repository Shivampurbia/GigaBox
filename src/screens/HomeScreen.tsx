import { useMemo, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { HomeTemplate } from "@/components/HomeTemplate";
import { SearchResults } from "@/components/HomeTemplate/SearchResults";
import { HomeTemplateSkeleton } from "@/components/HomeTemplate/skeleton";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { useCatalogInfiniteQuery } from "@/queries/catalog/useCatalogInfiniteQuery";
import { useCategoriesQuery } from "@/queries/catalog/useCategoriesQuery";
import { useProductSearchQuery } from "@/queries/catalog/useProductSearchQuery";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCategory } from "@/store/slices/filtersSlice";

export default function HomeScreen() {
  const theme = useTheme();
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
    return (
      <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
        <HomeTemplateSkeleton />
      </SafeAreaView>
    );
  }

  if (catalogQuery.isError || categoriesQuery.isError) {
    return (
      <ThemedView style={styles.stateContainer}>
        <ThemedText type="smallBold">Could not load the catalog</ThemedText>
        <ThemedText themeColor="textSecondary">
          Check your connection and try again.
        </ThemedText>
        <Pressable
          style={styles.retryButton}
          onPress={() => {
            void catalogQuery.refetch();
            void categoriesQuery.refetch();
          }}
        >
          <ThemedView type="backgroundElement" style={styles.retrySurface}>
            <ThemedText type="smallBold">Try again</ThemedText>
          </ThemedView>
        </Pressable>
      </ThemedView>
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
  stateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  stateMessage: { marginTop: 8 },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  retrySurface: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 8 },
  filterLoading: {
    position: "absolute",
    top: 12,
    right: 12,
    borderRadius: 12,
    padding: 4,
  },
});
