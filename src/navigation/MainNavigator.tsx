import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

import CartNavigator from "./CartNavigator";
import ExploreNavigator from "./ExploreNavigator";
import HomeNavigator from "./HomeNavigator";
import type { MainTabParamList } from "./types";

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("@/assets/images/tabIcons/home.png")}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ExploreTab"
        component={ExploreNavigator}
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("@/assets/images/tabIcons/explore.png")}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartNavigator}
        options={{ title: "Cart" }}
      />
    </Tab.Navigator>
  );
}
