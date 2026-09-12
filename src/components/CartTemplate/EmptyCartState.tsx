import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export function EmptyCartState() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Your cart is empty</ThemedText>
      <ThemedText themeColor="textSecondary">
        Add products from Home to continue.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 24,
  },
});
