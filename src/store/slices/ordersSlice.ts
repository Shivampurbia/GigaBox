import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { CartItem } from "@/store/slices/cartSlice";

export interface LocalOrder {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: string;
  status: "PLACED" | "PACKED" | "OUT_FOR_DELIVERY" | "DELIVERED";
}

interface OrdersState {
  orders: LocalOrder[];
  activeOrderId: string | null;
}

const initialState: OrdersState = { orders: [], activeOrderId: null };

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    createOrder(state, action: PayloadAction<LocalOrder>) {
      state.orders.unshift(action.payload);
      state.activeOrderId = action.payload.id;
    },
  },
});

export const { createOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
