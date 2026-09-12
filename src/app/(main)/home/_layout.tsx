import { useTheme } from "@/hooks/use-theme";
import { Stack } from "expo-router";

export default function HomeLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.text,
        headerTitleStyle: { color: theme.text, fontWeight: "700" },
        headerShadowVisible: false,
        headerBackTitle: "Back",
        animation: "none",
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="product/[id]"
        options={{ title: "Product details" }}
      />
    </Stack>
  );
}
