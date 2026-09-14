import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef } from "react";

import { ScreenState } from "@/components/ScreenState";
import { TrackingTemplate } from "@/components/TrackingTemplate";
import type { CartStackParamList } from "@/navigation/types";
import { mockDeliveryTrackingSource } from "@/services/delivery/MockDeliveryTrackingSource";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectTrackingByOrderId } from "@/store/selectors";
import { markOrderDelivered } from "@/store/slices/ordersSlice";
import { stopTracking, updateTracking } from "@/store/slices/trackingSlice";

type Props = NativeStackScreenProps<CartStackParamList, "Tracking">;

export default function TrackingScreen({ navigation, route }: Props) {
  const { orderId } = route.params;
  const dispatch = useAppDispatch();
  const tracking = useAppSelector(selectTrackingByOrderId(orderId));
  const trackingRef = useRef(tracking);
  const hasCompleted = useRef(false);

  useEffect(() => {
    trackingRef.current = tracking;
  }, [tracking]);

  useEffect(() => {
    const current = trackingRef.current;
    if (!current || current.status === "DELIVERED") {
      return;
    }

    return mockDeliveryTrackingSource.subscribe(current, (next) => {
      if (next.lastUpdatedAt !== trackingRef.current?.lastUpdatedAt) {
        dispatch(updateTracking(next));
      }

      if (next.status === "DELIVERED" && !hasCompleted.current) {
        hasCompleted.current = true;
        dispatch(markOrderDelivered(orderId));
        dispatch(stopTracking(orderId));
        navigation.reset({ index: 0, routes: [{ name: "Cart" }] });
      }
    });
  }, [dispatch, navigation, orderId, tracking?.startedAt]);

  if (!tracking) {
    return (
      <ScreenState
        title="Tracking unavailable"
        message="This delivery is no longer active."
        actionLabel="Return to cart"
        onAction={() =>
          navigation.reset({ index: 0, routes: [{ name: "Cart" }] })
        }
      />
    );
  }

  return <TrackingTemplate tracking={tracking} />;
}
