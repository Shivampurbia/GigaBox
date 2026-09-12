import { useMemo, useState } from "react";

import { CheckoutTemplate } from "@/components/CheckoutTemplate";
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from "@/constants/cart";
import { useAppSelector } from "@/store/hooks";
import { selectCartItems } from "@/store/selectors";

export default function CheckoutScreen() {
  const items = useAppSelector(selectCartItems);
  const [selectedPayment, setSelectedPayment] = useState("Cash on Delivery");
  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  const onPlaceOrder = () => {
    // Placeholder until the order-creation mutation is connected.
  };

  return (
    <CheckoutTemplate
      items={items}
      subtotal={subtotal}
      deliveryFee={deliveryFee}
      total={total}
      selectedPayment={selectedPayment}
      onPaymentChange={setSelectedPayment}
      onPlaceOrder={onPlaceOrder}
    />
  );
}
