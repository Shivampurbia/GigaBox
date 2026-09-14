// src/components/HomeTemplate/skeleton.tsx
import { View } from "react-native";
import { BrowseCatalogSkeleton } from "./BrowseCatalog/skeleton";

export function HomeTemplateSkeleton() {
  return (
    <View style={{ flex: 1, paddingTop: 98 }}>
      <BrowseCatalogSkeleton />
    </View>
  );
}
