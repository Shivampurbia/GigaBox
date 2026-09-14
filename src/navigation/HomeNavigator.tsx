import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useTheme } from "@/hooks/use-theme";
import HomeScreen from "@/screens/HomeTab/HomeScreen";
import ProductDetailsScreen from "@/screens/HomeTab/ProductDetailsScreen";
import type { HomeStackParamList } from "./types";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeNavigator() {
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
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ title: "Product details" }}
      />
    </Stack.Navigator>
  );
}
