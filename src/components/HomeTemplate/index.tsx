// src/components/HomeTemplate/index.ts
import { View } from "react-native";
import { Product } from "../../api/types/product.types";
import { BrowseCatalog } from "./BrowseCatalog";

interface Props {
  products: Product[];
  categories: string[];
  activeCategory: string | null;
  onSelectCategory: (c: string | null) => void;
  onEndReached: () => void;
  isFetchingNextPage: boolean;
}

export function HomeTemplate(props: Props) {
  return (
    <View style={{ flex: 1 }}>
      <BrowseCatalog {...props} />
    </View>
  );
}
