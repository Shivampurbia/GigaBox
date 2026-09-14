import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { isValidTrackingUpdate } from "@/services/delivery/deliveryStateMachine";

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export type DeliveryStatus =
  | "PLACED"
  | "PACKED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED";

export interface TrackingState {
  orderId: string;
  status: DeliveryStatus;
  courierLocation: Coordinate;
  destination: Coordinate;
  startedAt: string;
  lastUpdatedAt: string;
  completedAt?: string;
}

interface TrackingStoreState {
  byOrderId: Record<string, TrackingState>;
}

const initialState: TrackingStoreState = { byOrderId: {} };

const trackingSlice = createSlice({
  name: "tracking",
  initialState,
  reducers: {
    startTracking(state, action: PayloadAction<TrackingState>) {
      state.byOrderId[action.payload.orderId] = action.payload;
    },
    updateTracking(state, action: PayloadAction<TrackingState>) {
      const current = state.byOrderId[action.payload.orderId];
      if (isValidTrackingUpdate(current, action.payload)) {
        state.byOrderId[action.payload.orderId] = action.payload;
      }
    },
    stopTracking(state, action: PayloadAction<string>) {
      delete state.byOrderId[action.payload];
    },
  },
});

export const { startTracking, stopTracking, updateTracking } =
  trackingSlice.actions;
export default trackingSlice.reducer;
