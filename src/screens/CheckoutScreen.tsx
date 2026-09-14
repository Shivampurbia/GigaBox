import { router } from "expo-router";
import { useMemo, useState } from "react";

import { CheckoutTemplate } from "@/components/CheckoutTemplate";
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from "@/constants/cart";
import { createInitialTracking } from "@/services/delivery/deliverySimulation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartItems } from "@/store/selectors";
import { clearCart } from "@/store/slices/cartSlice";
import { createOrder } from "@/store/slices/ordersSlice";
import { startTracking } from "@/store/slices/trackingSlice";

export default function CheckoutScreen() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const [selectedPayment, setSelectedPayment] = useState("Cash on Delivery");
  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  const onPlaceOrder = () => {
    if (!items.length) return;

    const orderId = `order-${Date.now()}`;
    dispatch(
      createOrder({
        id: orderId,
        items,
        subtotal,
        deliveryFee,
        total,
        createdAt: new Date().toISOString(),
        status: "PLACED",
      }),
    );
    dispatch(startTracking(createInitialTracking(orderId)));
    dispatch(clearCart());
    router.replace(`/cart/tracking/${orderId}`);
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
