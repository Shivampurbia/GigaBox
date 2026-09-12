import { Pressable, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

type Props = {
  subtotal: number;
  deliveryFee: number;
  total: number;
  onCheckout: () => void;
};

export function CartSummary({
  subtotal,
  deliveryFee,
  total,
  onCheckout,
}: Props) {
  return (
    <ThemedView type="backgroundElement" style={styles.summary}>
      <SummaryRow label="Subtotal" value={subtotal} />
      <SummaryRow
        label={deliveryFee === 0 ? "Delivery (free)" : "Delivery"}
        value={deliveryFee}
      />
      <SummaryRow label="Total" value={total} emphasized />
      <Pressable onPress={onCheckout}>
        <ThemedView type="backgroundSelected" style={styles.checkoutButton}>
          <ThemedText type="smallBold">Checkout</ThemedText>
        </ThemedView>
      </Pressable>
    </ThemedView>
  );
}

function SummaryRow({
  label,
  value,
  emphasized = false,
}: {
  label: string;
  value: number;
  emphasized?: boolean;
}) {
  return (
    <ThemedView style={styles.row}>
      <ThemedText type={emphasized ? "smallBold" : "small"}>{label}</ThemedText>
      <ThemedText type={emphasized ? "smallBold" : "small"}>
        ${value.toFixed(2)}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  summary: { marginTop: "auto", padding: 16, borderRadius: 10, gap: 10 },
  row: {
    padding: 3,
    borderRadius: 4,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkoutButton: {
    alignItems: "center",
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
  },
});
