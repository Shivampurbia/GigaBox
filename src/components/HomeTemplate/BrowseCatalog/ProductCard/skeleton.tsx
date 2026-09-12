// src/components/HomeTemplate/BrowseCatalog/ProductCard/skeleton.tsx
import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";

export function ProductCardSkeleton() {
  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <ThemedView type="backgroundElement" style={styles.image} />
      <ThemedView type="backgroundSelected" style={styles.line} />
      <ThemedView
        type="backgroundSelected"
        style={[styles.line, { width: "40%" }]}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: { width: "100%", aspectRatio: 1 },
  line: { height: 10, margin: 6, borderRadius: 4 },
});
