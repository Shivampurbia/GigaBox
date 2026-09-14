import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";

import { CheckoutTemplate } from "@/components/CheckoutTemplate";
import { ScreenState } from "@/components/ScreenState";
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from "@/constants/cart";
import type { CartStackParamList } from "@/navigation/types";
import { scheduleDeliveryCompletedNotification } from "@/services/delivery/deliveryNotification";
import {
  createInitialTracking,
  ESTIMATED_DELIVERY_DURATION_MS,
} from "@/services/delivery/deliverySimulation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartItems } from "@/store/selectors";
import { clearCart } from "@/store/slices/cartSlice";
import { createOrder } from "@/store/slices/ordersSlice";
import { startTracking } from "@/store/slices/trackingSlice";

type Props = NativeStackScreenProps<CartStackParamList, "Checkout">;

export default function CheckoutScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const [selectedPayment, setSelectedPayment] = useState("Cash on Delivery");
  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  if (!items.length) {
    return (
      <ScreenState
        title="Your cart is empty"
        message="Add products before checking out."
        actionLabel="Return to cart"
        onAction={() => navigation.goBack()}
      />
    );
  }

  const onPlaceOrder = () => {
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
    void scheduleDeliveryCompletedNotification(
      orderId,
      new Date(Date.now() + ESTIMATED_DELIVERY_DURATION_MS),
    );
    dispatch(clearCart());
    navigation.replace("Tracking", { orderId });
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
