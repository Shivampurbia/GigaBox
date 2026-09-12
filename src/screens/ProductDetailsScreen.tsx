import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { useProductQuery } from "@/queries/catalog/useProductQuery";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const productId = Number(id);
  const [quantity, setQuantity] = useState(1);
  const productQuery = useProductQuery(productId);

  if (productQuery.isPending) {
    return <ActivityIndicator style={styles.centered} />;
  }

  if (productQuery.isError || !productQuery.data) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorTitle}>Product unavailable</Text>
        <Text style={styles.errorMessage}>We could not load this product.</Text>
      </View>
    );
  }

  const product = productQuery.data;
  const maxQuantity = Math.max(product.stock, 1);

  return (
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

      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.quantityRow}>
        <Text style={styles.quantityLabel}>Quantity</Text>
        <View style={styles.stepper}>
          <Pressable
            accessibilityLabel="Decrease quantity"
            onPress={() => setQuantity((current) => Math.max(1, current - 1))}
            style={styles.stepperButton}
          >
            <Text style={styles.stepperText}>-</Text>
          </Pressable>
          <Text style={styles.quantity}>{quantity}</Text>
          <Pressable
            accessibilityLabel="Increase quantity"
            onPress={() =>
              setQuantity((current) => Math.min(maxQuantity, current + 1))
            }
            style={styles.stepperButton}
          >
            <Text style={styles.stepperText}>+</Text>
          </Pressable>
        </View>
      </View>

      <Pressable style={styles.cartButton} onPress={() => {}}>
        <Text style={styles.cartButtonText}>Add {quantity} to cart</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 32 },
  gallery: { width: "100%", height: 320 },
  image: { width: 390, height: 320, backgroundColor: "#f2f2f2" },
  category: {
    marginTop: 20,
    marginHorizontal: 20,
    color: "#666",
    textTransform: "uppercase",
  },
  title: {
    marginTop: 8,
    marginHorizontal: 20,
    fontSize: 26,
    fontWeight: "700",
    color: "#111",
  },
  price: {
    marginTop: 12,
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },
  description: {
    marginTop: 16,
    marginHorizontal: 20,
    lineHeight: 22,
    color: "#555",
  },
  quantityRow: {
    marginTop: 24,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityLabel: { fontSize: 16, fontWeight: "600", color: "#111" },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  stepperButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  stepperText: { fontSize: 22, color: "#111" },
  quantity: {
    minWidth: 32,
    textAlign: "center",
    fontWeight: "600",
    color: "#111",
  },
  cartButton: {
    marginTop: 28,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#111",
  },
  cartButtonText: { color: "#fff", fontWeight: "700" },
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
  errorTitle: { fontSize: 18, fontWeight: "700", color: "#111" },
  errorMessage: { marginTop: 8, color: "#666" },
});
