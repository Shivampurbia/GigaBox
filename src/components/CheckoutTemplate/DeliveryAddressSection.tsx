import { Pressable, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export function DeliveryAddressSection() {
  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <ThemedView style={styles.header}>
        <ThemedText type="smallBold">Delivery address</ThemedText>
        <Pressable onPress={() => {}}>
          <ThemedText type="linkPrimary">Change</ThemedText>
        </Pressable>
      </ThemedView>
      <ThemedText type="smallBold">Alex Johnson</ThemedText>
      <ThemedText themeColor="textSecondary">42 Market Street</ThemedText>
      <ThemedText themeColor="textSecondary">
        San Francisco, CA 94105
      </ThemedText>
      <ThemedText themeColor="textSecondary">+1 415 555 0142</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: 10, gap: 4 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
  },
});
