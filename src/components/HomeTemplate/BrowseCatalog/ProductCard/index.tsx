// src/components/HomeTemplate/BrowseCatalog/ProductCard/index.tsx
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import type { HomeStackParamList } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { memo } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Product } from "../../../../api/types/product.types";

export const ProductCard = memo(function ProductCard({
  product,
}: {
  product: Product;
}) {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={() =>
        navigation.navigate("ProductDetails", { productId: product.id })
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
});

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
