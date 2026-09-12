import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import type { CartItem } from "@/store/slices/cartSlice";

type Props = {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
};

export function OrderSummarySection({
  items,
  subtotal,
  deliveryFee,
  total,
}: Props) {
  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <ThemedText type="smallBold">Order summary</ThemedText>
      {items.map((item) => (
        <View key={item.id} style={styles.line}>
          <ThemedText type="small" numberOfLines={1} style={styles.itemName}>
            {item.title} x{item.quantity}
          </ThemedText>
          <ThemedText type="small">
            ${(item.price * item.quantity).toFixed(2)}
          </ThemedText>
        </View>
      ))}
      <ThemedView style={styles.divider} />
      <SummaryRow label="Subtotal" value={subtotal} />
      <SummaryRow
        label={deliveryFee === 0 ? "Delivery (free)" : "Delivery"}
        value={deliveryFee}
      />
      <SummaryRow label="Total" value={total} emphasized />
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
    <View style={styles.line}>
      <ThemedText type={emphasized ? "smallBold" : "small"}>{label}</ThemedText>
      <ThemedText type={emphasized ? "smallBold" : "small"}>
        ${value.toFixed(2)}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: 10, gap: 10 },
  line: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  itemName: { flex: 1 },
  divider: { height: 1, backgroundColor: "rgba(128,128,128,0.3)" },
});
