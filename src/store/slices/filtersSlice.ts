// src/store/slices/filtersSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  activeCategory: string | null;
}

const initialState: FiltersState = { activeCategory: null };

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string | null>) {
      state.activeCategory = action.payload;
    },
  },
});

export const { setCategory } = filtersSlice.actions;
export default filtersSlice.reducer;
