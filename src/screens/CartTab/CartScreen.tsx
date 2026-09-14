import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useMemo } from "react";

import { CartTemplate } from "@/components/CartTemplate";
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from "@/constants/cart";
import type { CartStackParamList } from "@/navigation/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectActiveOrderId, selectCartItems } from "@/store/selectors";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  setQuantity,
} from "@/store/slices/cartSlice";

type Props = NativeStackScreenProps<CartStackParamList, "Cart">;

export default function CartScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const activeOrderId = useAppSelector(selectActiveOrderId);
  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    if (activeOrderId) {
      navigation.navigate("Tracking", { orderId: activeOrderId });
    }
  }, [activeOrderId, navigation]);

  const checkout = () => {
    if (items.length) navigation.navigate("Checkout");
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
