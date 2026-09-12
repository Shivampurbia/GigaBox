import { Stack } from "expo-router";

import { useTheme } from "@/hooks/use-theme";

export default function CartLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.text,
        headerTitleStyle: { color: theme.text, fontWeight: "700" },
        headerShadowVisible: false,
        animation: "none",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Cart" }} />
      <Stack.Screen name="checkout" options={{ title: "Checkout" }} />
    </Stack>
  );
}
