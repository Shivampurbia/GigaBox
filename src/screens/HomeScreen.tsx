import { useMemo } from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { HomeTemplate } from "@/components/HomeTemplate";
import { HomeTemplateSkeleton } from "@/components/HomeTemplate/skeleton";
import { useCatalogInfiniteQuery } from "@/queries/catalog/useCatalogInfiniteQuery";
import { useCategoriesQuery } from "@/queries/catalog/useCategoriesQuery";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCategory } from "@/store/slices/filtersSlice";

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector(
    (state) => state.filters.activeCategory,
  );
  const catalogQuery = useCatalogInfiniteQuery(activeCategory);
  const categoriesQuery = useCategoriesQuery();

  const products = useMemo(
    () => catalogQuery.data?.pages.flatMap((page) => page.products) ?? [],
    [catalogQuery.data],
  );

  if (catalogQuery.isPending || categoriesQuery.isPending) {
    return <HomeTemplateSkeleton />;
  }

  if (catalogQuery.isError || categoriesQuery.isError) {
    return (
      <SafeAreaView style={styles.stateContainer}>
        <Text style={styles.stateTitle}>Could not load the catalog</Text>
        <Text style={styles.stateMessage}>
          Check your connection and try again.
        </Text>
        <Pressable
          style={styles.retryButton}
          onPress={() => {
            void catalogQuery.refetch();
            void categoriesQuery.refetch();
          }}
        >
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
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
        isFetchingNextPage={catalogQuery.isFetchingNextPage}
      />
      {catalogQuery.isFetching && !catalogQuery.isFetchingNextPage && (
        <View style={styles.filterLoading}>
          <ActivityIndicator />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  stateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  stateTitle: { fontSize: 18, fontWeight: "600", color: "#111111" },
  stateMessage: { marginTop: 8, color: "#666666" },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#111111",
  },
  retryText: { color: "#ffffff", fontWeight: "600" },
  filterLoading: { position: "absolute", top: 12, right: 12 },
});
