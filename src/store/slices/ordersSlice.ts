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
    markOrderDelivered(state, action: PayloadAction<string>) {
      const order = state.orders.find((entry) => entry.id === action.payload);
      if (order) {
        order.status = "DELIVERED";
      }
      if (state.activeOrderId === action.payload) {
        state.activeOrderId = null;
      }
    },
  },
});

export const { createOrder, markOrderDelivered } = ordersSlice.actions;
export default ordersSlice.reducer;
