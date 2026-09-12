import { ScrollView, StyleSheet } from "react-native";

import type { CartItem } from "@/store/slices/cartSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "../themed-text";
import { DeliveryAddressSection } from "./DeliveryAddressSection";
import { OrderSummarySection } from "./OrderSummarySection";
import { PaymentMethodSection } from "./PaymentMethodSection";
import { PlaceOrderButton } from "./PlaceOrderButton";

type Props = {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  selectedPayment: string;
  onPaymentChange: (method: string) => void;
  onPlaceOrder: () => void;
};

export function CheckoutTemplate({
  items,
  subtotal,
  deliveryFee,
  total,
  selectedPayment,
  onPaymentChange,
  onPlaceOrder,
}: Props) {
  return (
    <SafeAreaView style={styles.screen}>
      <ThemedText type="subtitle" style={styles.heading}>
        Checkout
      </ThemedText>
      <ScrollView contentContainerStyle={styles.content}>
        <DeliveryAddressSection />
        <PaymentMethodSection
          selected={selectedPayment}
          onSelect={onPaymentChange}
        />
        <OrderSummarySection
          items={items}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          total={total}
        />
        <PlaceOrderButton onPlaceOrder={onPlaceOrder} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16 },
  content: { gap: 12, paddingBottom: 32 },
  heading: { marginBottom: 16 },
});
