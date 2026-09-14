import type {
    Coordinate,
    DeliveryStatus,
    TrackingState,
} from "@/store/slices/trackingSlice";

export const DELIVERY_TICK_MS = 3000;
const STATUS_DURATION_MS = 15000;

export const COURIER_START: Coordinate = {
  latitude: 37.8044,
  longitude: -122.4156,
};

export const DELIVERY_DESTINATION: Coordinate = {
  latitude: 37.7658,
  longitude: -122.435,
};

const STATUS_SEQUENCE: DeliveryStatus[] = [
  "PLACED",
  "PACKED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

const WAYPOINTS: Coordinate[] = [
  COURIER_START,
  { latitude: 37.7927, longitude: -122.4204 },
  { latitude: 37.7791, longitude: -122.4288 },
  DELIVERY_DESTINATION,
];

export function createInitialTracking(
  orderId: string,
  now = Date.now(),
): TrackingState {
  return {
    orderId,
    status: "PLACED",
    courierLocation: COURIER_START,
    destination: DELIVERY_DESTINATION,
    startedAt: new Date(now).toISOString(),
    lastUpdatedAt: new Date(now).toISOString(),
  };
}

export function advanceTracking(
  tracking: TrackingState,
  now = Date.now(),
): TrackingState {
  const elapsedMs = Math.max(0, now - Date.parse(tracking.startedAt));
  const statusIndex = Math.min(
    Math.floor(elapsedMs / STATUS_DURATION_MS),
    STATUS_SEQUENCE.length - 1,
  );
  const routeProgress = Math.min(
    elapsedMs / STATUS_DURATION_MS,
    WAYPOINTS.length - 1,
  );
  const segmentIndex = Math.min(
    Math.floor(routeProgress),
    WAYPOINTS.length - 2,
  );
  const segmentProgress = routeProgress - segmentIndex;
  const start = WAYPOINTS[segmentIndex];
  const end = WAYPOINTS[segmentIndex + 1];
  const waypoint: Coordinate = {
    latitude:
      start.latitude + (end.latitude - start.latitude) * segmentProgress,
    longitude:
      start.longitude + (end.longitude - start.longitude) * segmentProgress,
  };
  const status = STATUS_SEQUENCE[statusIndex];

  return {
    ...tracking,
    status,
    courierLocation: waypoint,
    lastUpdatedAt: new Date(now).toISOString(),
    completedAt:
      status === "DELIVERED" ? new Date(now).toISOString() : undefined,
  };
}
