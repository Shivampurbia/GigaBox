import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { Provider } from "react-redux";

import { AuthProvider } from "@/auth/AuthProvider";
import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { OfflineBanner } from "@/components/OfflineBanner";
import { ConnectivityProvider } from "@/connectivity/ConnectivityProvider";
import { Colors } from "@/constants/theme";

import RootNavigator from "@/navigation/RootNavigator";
import { queryClient } from "@/queries/queryClient";
import { prepareDeliveryNotifications } from "@/services/delivery/deliveryNotification";
import { store } from "@/store";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === "dark" ? "dark" : "light"];

  useEffect(() => {
    prepareDeliveryNotifications();
  }, []);

  return (
    <Provider store={store}>
      <ConnectivityProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer
              theme={{
                ...DefaultTheme,
                colors: {
                  ...DefaultTheme.colors,
                  background: colors.background,
                  card: colors.background,
                  text: colors.text,
                  border: colors.backgroundElement,
                  primary: colors.text,
                },
              }}
            >
              <OfflineBanner />
              <AnimatedSplashOverlay />
              <RootNavigator />
            </NavigationContainer>
          </QueryClientProvider>
        </AuthProvider>
      </ConnectivityProvider>
    </Provider>
  );
}
