import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { AppState } from "react-native";

import { TrackingTemplate } from "@/components/TrackingTemplate";
import {
    advanceTracking,
    DELIVERY_TICK_MS,
} from "@/services/delivery/deliverySimulation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectTrackingByOrderId } from "@/store/selectors";
import { updateTracking } from "@/store/slices/trackingSlice";

export default function TrackingScreen() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const dispatch = useAppDispatch();
  const tracking = useAppSelector(selectTrackingByOrderId(orderId));
  const trackingRef = useRef(tracking);

  useEffect(() => {
    trackingRef.current = tracking;
  }, [tracking]);

  useEffect(() => {
    if (!trackingRef.current || trackingRef.current.status === "DELIVERED") {
      return;
    }

    const sync = () => {
      const current = trackingRef.current;
      if (!current || current.status === "DELIVERED") return;

      const next = advanceTracking(current, Date.now());
      if (
        next.status !== current.status ||
        next.lastUpdatedAt !== current.lastUpdatedAt
      ) {
        dispatch(updateTracking(next));
      }
    };

    sync();
    const intervalId = setInterval(sync, DELIVERY_TICK_MS);
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") sync();
    });

    return () => {
      clearInterval(intervalId);
      subscription.remove();
    };
  }, [dispatch, orderId]);

  if (!tracking) return null;

  return (
    <>
      <Stack.Screen options={{ title: "Order tracking" }} />
      <TrackingTemplate tracking={tracking} />
    </>
  );
}
