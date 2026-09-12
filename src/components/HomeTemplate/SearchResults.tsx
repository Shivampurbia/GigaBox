import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { Product } from "@/api/types/product.types";
import { ProductCard } from "@/components/HomeTemplate/BrowseCatalog/ProductCard";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

interface Props {
  products: Product[] | undefined;
  isPending: boolean;
  isError: boolean;
}

export function SearchResults({ products, isPending, isError }: Props) {
  if (isPending) {
    return (
      <ThemedView style={styles.state}>
        <ActivityIndicator />
        <ThemedText themeColor="textSecondary">Searching...</ThemedText>
      </ThemedView>
    );
  }

  if (isError) {
    return (
      <ThemedView style={styles.state}>
        <ThemedText type="smallBold">Search failed</ThemedText>
        <ThemedText themeColor="textSecondary">
          Check your connection and try again.
        </ThemedText>
      </ThemedView>
    );
  }

  if (!products?.length) {
    return (
      <ThemedView style={styles.state}>
        <ThemedText type="smallBold">No products found</ThemedText>
        <ThemedText themeColor="textSecondary">
          Try a different search.
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <View style={styles.listContainer}>
      <FlashList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: { flex: 1 },
  state: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 24,
  },
});
