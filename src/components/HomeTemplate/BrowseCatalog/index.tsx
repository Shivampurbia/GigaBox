// src/components/HomeTemplate/BrowseCatalog/index.ts
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { Product } from "../../../api/types/product.types";
import { CategoryChips } from "./CategoryChips";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCard/skeleton";

interface Props {
  products: Product[];
  categories: string[];
  activeCategory: string | null;
  onSelectCategory: (c: string | null) => void;
  onEndReached: () => void;
  isFetchingNextPage: boolean;
}

export function BrowseCatalog({
  products,
  categories,
  activeCategory,
  onSelectCategory,
  onEndReached,
  isFetchingNextPage,
}: Props) {
  return (
    <View style={{ flex: 1 }}>
      <CategoryChips
        categories={categories}
        active={activeCategory}
        onSelect={onSelectCategory}
      />
      <FlashList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        numColumns={2}
        onEndReachedThreshold={0.2}
        onEndReached={onEndReached}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View style={{ flexDirection: "row" }}>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </View>
          ) : null
        }
      />
    </View>
  );
}
