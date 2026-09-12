// src/components/HomeTemplate/BrowseCatalog/skeleton.tsx
import { View } from "react-native";
import { ProductCardSkeleton } from "./ProductCard/skeleton";

export function BrowseCatalogSkeleton() {
  return (
    <View>
      {Array.from({ length: 3 }).map((_, row) => (
        <View key={row} style={{ flexDirection: "row" }}>
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </View>
      ))}
    </View>
  );
}
