import type { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
};

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList> | undefined;
  ExploreTab: NavigatorScreenParams<ExploreStackParamList> | undefined;
  CartTab: NavigatorScreenParams<CartStackParamList> | undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  ProductDetails: { productId: number };
};

export type ExploreStackParamList = {
  Explore: undefined;
};

export type CartStackParamList = {
  Cart: undefined;
  Checkout: undefined;
  Tracking: { orderId: string };
};
