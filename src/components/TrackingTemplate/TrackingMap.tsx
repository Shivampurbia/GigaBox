import MapView, { Marker, Polyline } from "react-native-maps";

import type { TrackingState } from "@/store/slices/trackingSlice";

type Props = { tracking: TrackingState };

export function TrackingMap({ tracking }: Props) {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        ...tracking.destination,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      }}
    >
      <Marker coordinate={tracking.courierLocation} title="Courier" />
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
