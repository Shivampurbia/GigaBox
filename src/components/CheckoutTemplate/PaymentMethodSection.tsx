import { Pressable, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

const PAYMENT_OPTIONS = ["Cash on Delivery", "Credit/Debit Card", "UPI"];

type Props = { selected: string; onSelect: (method: string) => void };

export function PaymentMethodSection({ selected, onSelect }: Props) {
  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <ThemedText type="smallBold">Payment method</ThemedText>
      {PAYMENT_OPTIONS.map((option) => {
        const isSelected = option === selected;
        return (
          <Pressable
            key={option}
            onPress={() => onSelect(option)}
            style={styles.option}
          >
            <ThemedView
              type={isSelected ? "backgroundSelected" : "background"}
              style={styles.radio}
            >
              {isSelected && (
                <ThemedView type="backgroundSelected" style={styles.radioDot} />
              )}
            </ThemedView>
            <ThemedText type="small">{option}</ThemedText>
          </Pressable>
        );
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: 10, gap: 12 },
  option: { flexDirection: "row", alignItems: "center", gap: 10 },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  radioDot: { width: 10, height: 10, borderRadius: 5 },
});
