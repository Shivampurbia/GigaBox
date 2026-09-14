import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import type { DeliveryStatus } from "@/store/slices/trackingSlice";

const statuses: DeliveryStatus[] = [
  "PLACED",
  "PACKED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

export function TrackingStatus({ status }: { status: DeliveryStatus }) {
  return (
    <ThemedView type="backgroundElement" style={styles.container}>
      <ThemedText type="smallBold">{status.replaceAll("_", " ")}</ThemedText>
      {statuses.map((entry) => (
        <ThemedText
          key={entry}
          type={
            statuses.indexOf(entry) <= statuses.indexOf(status)
              ? "smallBold"
              : "small"
          }
          style={{
            color:
              statuses.indexOf(entry) <= statuses.indexOf(status)
                ? "green"
                : "gray",
          }}
        >
          {entry.replaceAll("_", " ")}
        </ThemedText>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    gap: 10,
  },
  timeline: { gap: 6 },
});
