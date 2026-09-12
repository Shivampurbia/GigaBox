import { QueryClientProvider } from "@tanstack/react-query";
import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";
import { Provider } from "react-redux";

import { AuthProvider } from "@/auth/AuthProvider";
import { AnimatedSplashOverlay } from "@/components/animated-icon";
import RootNavigator from "@/navigation/RootNavigator";
import { queryClient } from "@/queries/queryClient";
import { store } from "@/store";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <Provider store={store}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <AnimatedSplashOverlay />
            <RootNavigator />
          </ThemeProvider>
        </QueryClientProvider>
      </AuthProvider>
    </Provider>
  );
}
