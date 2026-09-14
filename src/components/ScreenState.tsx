import { ActivityIndicator, Pressable, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

type Props = {
  title: string;
  message?: string;
  loading?: boolean;
  actionLabel?: string;
  onAction?: () => void;
};

export function ScreenState({
  title,
  message,
  loading = false,
  actionLabel,
  onAction,
}: Props) {
  return (
    <ThemedView style={styles.container}>
      {loading && <ActivityIndicator />}
      <ThemedText type="smallBold">{title}</ThemedText>
      {message && <ThemedText themeColor="textSecondary">{message}</ThemedText>}
      {actionLabel && onAction && (
        <Pressable onPress={onAction}>
          <ThemedView type="backgroundElement" style={styles.action}>
            <ThemedText type="smallBold">{actionLabel}</ThemedText>
          </ThemedView>
        </Pressable>
      )}
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
  action: {
    marginTop: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
});
