import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import type { CartItem } from "@/store/slices/cartSlice";
import { CartItemRow } from "./CartItemRow";
import { CartSummary } from "./CartSummary";
import { EmptyCartState } from "./EmptyCartState";

type Props = {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  onDecrement: (id: number) => void;
  onIncrement: (id: number) => void;
  onQuantityChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
};

export function CartTemplate({
  items,
  subtotal,
  deliveryFee,
  total,
  onDecrement,
  onIncrement,
  onQuantityChange,
  onRemove,
  onCheckout,
}: Props) {
  if (!items.length) {
    return <EmptyCartState />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ThemedText type="subtitle" style={styles.heading}>
        Cart
      </ThemedText>
      {items.map((item) => (
        <CartItemRow
          key={item.id}
          item={item}
          onDecrement={() => onDecrement(item.id)}
          onIncrement={() => onIncrement(item.id)}
          onQuantityChange={(quantity) => onQuantityChange(item.id, quantity)}
          onRemove={() => onRemove(item.id)}
        />
      ))}
      <CartSummary
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        total={total}
        onCheckout={onCheckout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16 },
  heading: { marginBottom: 16 },
});
