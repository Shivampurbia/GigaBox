import { router } from "expo-router";
import { useMemo } from "react";

import { CartTemplate } from "@/components/CartTemplate";
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from "@/constants/cart";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartItems } from "@/store/selectors";
import {
    decrementQuantity,
    incrementQuantity,
    removeFromCart,
    setQuantity,
} from "@/store/slices/cartSlice";

export default function CartScreen() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  const checkout = () => {
    if (items.length) router.push("/cart/checkout");
  };

  return (
    <CartTemplate
      items={items}
      subtotal={subtotal}
      deliveryFee={deliveryFee}
      total={total}
      onDecrement={(id) => dispatch(decrementQuantity(id))}
      onIncrement={(id) => dispatch(incrementQuantity(id))}
      onQuantityChange={(id, quantity) =>
        dispatch(setQuantity({ id, quantity }))
      }
      onRemove={(id) => dispatch(removeFromCart(id))}
      onCheckout={checkout}
    />
  );
}
