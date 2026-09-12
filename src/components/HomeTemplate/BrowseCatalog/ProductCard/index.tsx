// src/components/HomeTemplate/BrowseCatalog/ProductCard/index.ts
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { Product } from "../../../../api/types/product.types";

export function ProductCard({ product }: { product: Product }) {
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
      <ThemedView type="backgroundElement" style={styles.surface}>
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.image}
          cachePolicy={"memory-disk"}
          transition={150}
          recyclingKey={String(product.id)}
        />
        <ThemedText numberOfLines={1} style={styles.title}>
          {product.title}
        </ThemedText>
        <ThemedText style={styles.price}>${product.price}</ThemedText>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 12,
    overflow: "hidden",
  },
  surface: { flex: 1 },
  pressed: { opacity: 0.75 },
  image: { width: "100%", aspectRatio: 1 },
  title: { fontSize: 13, marginTop: 4, marginHorizontal: 6 },
  price: {
    fontSize: 14,
    fontWeight: "600",
    marginHorizontal: 6,
    marginBottom: 8,
  },
});
