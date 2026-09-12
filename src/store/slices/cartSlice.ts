import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { Product } from "@/api/types/product.types";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  stock: number;
  quantity: number;
}

type AddToCartPayload = {
  product: Product;
  quantity: number;
};

interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<AddToCartPayload>) {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      const nextQuantity = Math.min(
        (existingItem?.quantity ?? 0) + quantity,
        Math.max(product.stock, 1),
      );

      if (existingItem) {
        existingItem.quantity = nextQuantity;
        return;
      }

      state.items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        stock: product.stock,
        quantity: Math.min(quantity, Math.max(product.stock, 1)),
      });
    },
    incrementQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((entry) => entry.id === action.payload);
      if (item)
        item.quantity = Math.min(item.quantity + 1, Math.max(item.stock, 1));
    },
    decrementQuantity(state, action: PayloadAction<number>) {
      const itemIndex = state.items.findIndex(
        (entry) => entry.id === action.payload,
      );
      if (itemIndex === -1) return;

      const item = state.items[itemIndex];
      if (item.quantity <= 1) {
        state.items.splice(itemIndex, 1);
        return;
      }

      item.quantity -= 1;
    },
    setQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) {
      const item = state.items.find((entry) => entry.id === action.payload.id);
      if (item) {
        item.quantity = Math.min(
          Math.max(action.payload.quantity, 1),
          Math.max(item.stock, 1),
        );
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  setQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
