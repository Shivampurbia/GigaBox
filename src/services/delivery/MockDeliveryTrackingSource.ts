import { AppState } from "react-native";

import type { DeliveryTrackingSource } from "./DeliveryTrackingSource";
import { advanceTracking, DELIVERY_TICK_MS } from "./deliverySimulation";

export const mockDeliveryTrackingSource: DeliveryTrackingSource = {
  subscribe(tracking, onUpdate) {
    const sync = () => {
      const next = advanceTracking(tracking, Date.now());
      onUpdate(next);
      return next.status === "DELIVERED";
    };

    if (sync()) {
      return () => {};
    }

    const intervalId = setInterval(() => {
      if (sync()) {
        clearInterval(intervalId);
      }
    }, DELIVERY_TICK_MS);
    const appStateSubscription = AppState.addEventListener(
      "change",
      (state) => {
        if (state === "active") {
          sync();
        }
      },
    );

    return () => {
      clearInterval(intervalId);
      appStateSubscription.remove();
    };
  },
};
