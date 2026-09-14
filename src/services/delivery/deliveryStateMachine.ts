import type {
    DeliveryStatus,
    TrackingState,
} from "@/store/slices/trackingSlice";

const statuses: DeliveryStatus[] = [
  "PLACED",
  "PACKED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

export function isValidTrackingUpdate(
  current: TrackingState | undefined,
  next: TrackingState,
) {
  if (!current || current.orderId !== next.orderId) {
    return true;
  }

  return statuses.indexOf(next.status) >= statuses.indexOf(current.status);
}
