import type { RootState } from "./index";

import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from "@/constants/cart";

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartItemById = (productId: number) => (state: RootState) =>
  state.cart.items.find((item) => item.id === productId);
export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartSubtotal = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
export const selectCartDeliveryFee = (state: RootState) =>
  selectCartSubtotal(state) >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
export const selectCartTotal = (state: RootState) =>
  selectCartSubtotal(state) + selectCartDeliveryFee(state);
export const selectTrackingByOrderId =
  (orderId: string) => (state: RootState) =>
    state.tracking.byOrderId[orderId];
