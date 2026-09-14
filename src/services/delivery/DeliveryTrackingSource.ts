import type { TrackingState } from "@/store/slices/trackingSlice";

export type TrackingUpdateListener = (tracking: TrackingState) => void;

export interface DeliveryTrackingSource {
  subscribe(
    tracking: TrackingState,
    onUpdate: TrackingUpdateListener,
  ): () => void;
}
