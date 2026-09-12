import { SymbolView } from "expo-symbols";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import type { CartItem } from "@/store/slices/cartSlice";

type Props = {
  item: CartItem;
  onDecrement: () => void;
  onIncrement: () => void;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
};

export function CartItemRow({
  item,
  onDecrement,
  onIncrement,
  onQuantityChange,
  onRemove,
}: Props) {
  const [quantityDraft, setQuantityDraft] = useState(String(item.quantity));

  useEffect(() => {
    setQuantityDraft(String(item.quantity));
  }, [item.quantity]);

  const commitQuantity = () => {
    const quantity = Number(quantityDraft);
    if (Number.isFinite(quantity) && quantity > 0) {
      onQuantityChange(quantity);
      return;
    }

    setQuantityDraft(String(item.quantity));
  };

  return (
    <ThemedView type="backgroundElement" style={styles.item}>
      <ThemedText type="smallBold" numberOfLines={1} style={styles.title}>
        {item.title}
      </ThemedText>
      <ThemedText themeColor="textSecondary">
        ${item.price.toFixed(2)} each
      </ThemedText>
      <ThemedView style={styles.actions}>
        <ThemedView type="backgroundSelected" style={styles.quantityControls}>
          <Pressable
            onPress={onDecrement}
            accessibilityLabel="Decrease quantity"
          >
            <ThemedText type="smallBold" style={styles.action}>
              -
            </ThemedText>
          </Pressable>
          <TextInput
            value={quantityDraft}
            keyboardType="number-pad"
            returnKeyType="done"
            onChangeText={setQuantityDraft}
            onSubmitEditing={commitQuantity}
            onBlur={commitQuantity}
            style={styles.quantityInput}
          />
          <Pressable
            onPress={onIncrement}
            accessibilityLabel="Increase quantity"
          >
            <ThemedText type="smallBold" style={styles.action}>
              +
            </ThemedText>
          </Pressable>
        </ThemedView>
        <Pressable style={styles.removeButton} onPress={onRemove}>
          <SymbolView
            accessibilityLabel="Remove item"
            name={{ ios: "trash", android: "delete", web: "delete" }}
            tintColor="#D92D20"
            size={20}
          />
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  item: { padding: 14, borderRadius: 10, marginBottom: 10 },
  title: { flex: 1 },
  actions: {
    borderRadius: 10,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    justifyContent: "space-between",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 4,
  },
  action: { fontSize: 20, minWidth: 32, textAlign: "center" },
  quantityInput: {
    width: 36,
    paddingVertical: 5,
    textAlign: "center",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#999",
  },
  removeButton: {
    paddingRight: 4,
  },
});
