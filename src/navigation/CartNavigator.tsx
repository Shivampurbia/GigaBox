import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useTheme } from "@/hooks/use-theme";
import CartScreen from "@/screens/CartTab/CartScreen";
import CheckoutScreen from "@/screens/CartTab/CheckoutScreen";
import TrackingScreen from "@/screens/CartTab/TrackingScreen";
import type { CartStackParamList } from "./types";

const Stack = createNativeStackNavigator<CartStackParamList>();

export default function CartNavigator() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.text,
        headerTitleStyle: { color: theme.text, fontWeight: "700" },
        headerShadowVisible: false,
        animation: "none",
      }}
    >
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Checkout"
        options={{
          headerTitle: "",
        }}
        component={CheckoutScreen}
      />
      <Stack.Screen
        name="Tracking"
        component={TrackingScreen}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
