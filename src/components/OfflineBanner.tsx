import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useConnectivity } from "@/connectivity/ConnectivityProvider";
import { StyleSheet } from "react-native";

export function OfflineBanner() {
  const { isOnline } = useConnectivity();

  console.log("isOnline:", isOnline);
  if (isOnline) {
    return null;
  }

  return (
    <ThemedView
      type="backgroundSelected"
      style={{ ...styles.banner, paddingTop: 54, paddingBottom: 12 }}
    >
      <ThemedText type="smallBold">You are offline.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  banner: {
    alignItems: "center",
    paddingVertical: 8,
  },
});
