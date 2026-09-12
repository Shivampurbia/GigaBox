import { Pressable, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export function PlaceOrderButton({
  onPlaceOrder,
}: {
  onPlaceOrder: () => void;
}) {
  return (
    <Pressable onPress={onPlaceOrder}>
      <ThemedView type="backgroundSelected" style={styles.button}>
        <ThemedText type="smallBold">Place Order</ThemedText>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { padding: 16, borderRadius: 10, alignItems: "center" },
});
