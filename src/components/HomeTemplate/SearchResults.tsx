import { FlashList } from "@shopify/flash-list";
import { StyleSheet, View } from "react-native";

import { Product } from "@/api/types/product.types";
import { ProductCard } from "@/components/HomeTemplate/BrowseCatalog/ProductCard";
import { ScreenState } from "@/components/ScreenState";

interface Props {
  products: Product[] | undefined;
  isPending: boolean;
  isError: boolean;
  isOnline: boolean;
  onRetry: () => void;
}

export function SearchResults({
  products,
  isPending,
  isError,
  isOnline,
  onRetry,
}: Props) {
  if (isPending) {
    return <ScreenState title="Searching products" loading />;
  }

  if (isError) {
    return (
      <ScreenState
        title="Search failed"
        message="Check your connection and try again."
        actionLabel={isOnline ? "Try again" : undefined}
        onAction={isOnline ? onRetry : undefined}
      />
    );
  }

  if (!products?.length) {
    return (
      <ScreenState
        title={isOnline ? "No products found" : "Search unavailable offline"}
        message={
          isOnline
            ? "Try a different search."
            : "Reconnect to search the catalog."
        }
      />
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
});
