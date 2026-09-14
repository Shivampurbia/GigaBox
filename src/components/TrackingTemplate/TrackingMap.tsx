import { useEffect, useState } from "react";
import MapView, {
    AnimatedRegion,
    Marker,
    Polyline,
    type LatLng,
} from "react-native-maps";

import type { TrackingState } from "@/store/slices/trackingSlice";

type Props = { tracking: TrackingState };

export function TrackingMap({ tracking }: Props) {
  const [courierCoordinate] = useState(
    () =>
      new AnimatedRegion({
        ...tracking.courierLocation,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
  );

  useEffect(() => {
    courierCoordinate
      .timing({
        ...tracking.courierLocation,
        latitudeDelta: 0,
        longitudeDelta: 0,
        duration: 3000,
        useNativeDriver: false,
        toValue: 0,
      })
      .start();
  }, [courierCoordinate, tracking.courierLocation]);

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        ...tracking.destination,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      }}
    >
      <Marker.Animated
        coordinate={courierCoordinate as unknown as LatLng}
        title="Courier"
      />
      <Marker
        coordinate={tracking.destination}
        title="Delivery address"
        pinColor="green"
      />
      <Polyline
        coordinates={[tracking.courierLocation, tracking.destination]}
        strokeWidth={3}
        strokeColor="#3c87f7"
      />
    </MapView>
  );
}
