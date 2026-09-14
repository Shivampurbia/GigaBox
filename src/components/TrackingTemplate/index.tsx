import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import type { TrackingState } from "@/store/slices/trackingSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { TrackingMap } from "./TrackingMap";
import { TrackingStatus } from "./TrackingStatus";

type Props = { tracking: TrackingState };

export function TrackingTemplate({ tracking }: Props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.screen}>
        <ThemedText type="subtitle">Track your order</ThemedText>
        <ThemedView style={styles.mapContainer}>
          <TrackingMap tracking={tracking} />
        </ThemedView>
        <TrackingStatus status={tracking.status} />
        <ThemedText themeColor="textSecondary">
          Last updated {new Date(tracking.lastUpdatedAt).toLocaleTimeString()}
        </ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, gap: 12 },
  mapContainer: {
    flex: 1,
    minHeight: 320,
    overflow: "hidden",
    borderRadius: 12,
  },
});
