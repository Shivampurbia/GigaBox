import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useConnectivity } from "@/connectivity/ConnectivityProvider";

export function OfflineBanner() {
  const { isOnline } = useConnectivity();
  console.log("isOnline:", isOnline);
  if (isOnline) {
    return null;
  }

  return (
    <ThemedView type="backgroundSelected" style={styles.banner}>
      <ThemedText type="smallBold">
        You are offline. Showing saved data.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  banner: {
    alignItems: "center",
    paddingVertical: 8,
  },
});
