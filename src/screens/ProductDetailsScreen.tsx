import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    Pressable,
    ScrollView,
    StyleSheet,
} from "react-native";

import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useProductQuery } from "@/queries/catalog/useProductQuery";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const productId = Number(id);
  const [quantity, setQuantity] = useState(1);
  const productQuery = useProductQuery(productId);

  if (productQuery.isPending) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator />
      </ThemedView>
    );
  }

  if (productQuery.isError || !productQuery.data) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText type="smallBold">Product unavailable</ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.errorMessage}>
          We could not load this product.
        </ThemedText>
      </ThemedView>
    );
  }

  const product = productQuery.data;
  const maxQuantity = Math.max(product.stock, 1);

  return (
    <ThemedView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Stack.Screen options={{ title: product.title }} />
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.gallery}
        >
          {product.images.map((image) => (
            <Image
              key={image}
              source={{ uri: image }}
              style={styles.image}
              contentFit="cover"
            />
          ))}
        </ScrollView>

        <ThemedText themeColor="textSecondary" style={styles.category}>
          {product.category}
        </ThemedText>
        <ThemedText type="subtitle" style={styles.title}>
          {product.title}
        </ThemedText>
        <ThemedText type="smallBold" style={styles.price}>
          ${product.price.toFixed(2)}
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.description}>
          {product.description}
        </ThemedText>

        <ThemedView style={styles.quantityRow}>
          <ThemedText type="smallBold">Quantity</ThemedText>
          <ThemedView type="backgroundElement" style={styles.stepper}>
            <Pressable
              accessibilityLabel="Decrease quantity"
              onPress={() => setQuantity((current) => Math.max(1, current - 1))}
              style={styles.stepperButton}
            >
              <ThemedText type="smallBold">-</ThemedText>
            </Pressable>
            <ThemedText type="smallBold" style={styles.quantity}>
              {quantity}
            </ThemedText>
            <Pressable
              accessibilityLabel="Increase quantity"
              onPress={() =>
                setQuantity((current) => Math.min(maxQuantity, current + 1))
              }
              style={styles.stepperButton}
            >
              <ThemedText type="smallBold">+</ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>

        <AddToCartButton quantity={quantity} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingBottom: 32 },
  gallery: { width: "100%", height: 320 },
  image: {
    width: Dimensions.get("window").width,
    height: 320,
  },
  category: {
    marginTop: 20,
    marginHorizontal: 20,
    textTransform: "uppercase",
  },
  title: {
    marginTop: 8,
    marginHorizontal: 20,
  },
  price: {
    marginTop: 12,
    marginHorizontal: 20,
  },
  description: {
    marginTop: 16,
    marginHorizontal: 20,
    lineHeight: 22,
  },
  quantityRow: {
    marginTop: 24,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
  },
  stepperButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  quantity: {
    minWidth: 32,
    textAlign: "center",
  },
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
  errorMessage: { marginTop: 8 },
});
