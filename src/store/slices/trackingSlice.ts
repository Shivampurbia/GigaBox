import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
      state.byOrderId[action.payload.orderId] = action.payload;
    },
  },
});

export const { startTracking, updateTracking } = trackingSlice.actions;
export default trackingSlice.reducer;
