import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useTheme } from "@/hooks/use-theme";
import ExploreScreen from "@/screens/ExploreScreen";
import type { ExploreStackParamList } from "./types";

const Stack = createNativeStackNavigator<ExploreStackParamList>();

export default function ExploreNavigator() {
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
        name="Explore"
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
