// src/components/HomeTemplate/BrowseCatalog/ProductCard/index.ts
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { Product } from "../../../../api/types/product.types";

export function ProductCard({ product }: { product: Product }) {
  console.log("Rendering ProductCard for product:", product.title);
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={() =>
        router.push({
          pathname: "/home/product/[id]",
          params: { id: String(product.id) },
        })
      }
    >
      <Image
        source={{ uri: product.thumbnail }}
        style={styles.image}
        cachePolicy={"memory-disk"}
        transition={150}
        recyclingKey={String(product.id)}
      />
      <Text numberOfLines={1} style={styles.title}>
        {product.title}
      </Text>
      <Text style={styles.price}>${product.price}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  pressed: { opacity: 0.75 },
  image: { width: "100%", aspectRatio: 1, backgroundColor: "#f2f2f2" },
  title: { fontSize: 13, marginTop: 4, marginHorizontal: 6 },
  price: {
    fontSize: 14,
    fontWeight: "600",
    marginHorizontal: 6,
    marginBottom: 8,
  },
});
