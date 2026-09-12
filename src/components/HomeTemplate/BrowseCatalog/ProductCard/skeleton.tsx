// src/components/HomeTemplate/BrowseCatalog/ProductCard/skeleton.tsx
import { StyleSheet, View } from "react-native";

export function ProductCardSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.image} />
      <View style={styles.line} />
      <View style={[styles.line, { width: "40%" }]} />
    </View>
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
  image: { width: "100%", aspectRatio: 1, backgroundColor: "#e8e8e8" },
  line: { height: 10, backgroundColor: "#e8e8e8", margin: 6, borderRadius: 4 },
});
