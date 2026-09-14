import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function configureDeliveryChannel() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("delivery-updates", {
      name: "Delivery updates",
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
}

export async function prepareDeliveryNotifications() {
  await configureDeliveryChannel();

  const permissions = await Notifications.getPermissionsAsync();
  if (permissions.granted) {
    return true;
  }

  const requestedPermissions = await Notifications.requestPermissionsAsync();
  return requestedPermissions.status === "granted";
}

export async function scheduleDeliveryCompletedNotification(
  orderId: string,
  deliveryCompletedAt: Date,
) {
  const permissions = await Notifications.getPermissionsAsync();

  if (!permissions.granted) {
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Order delivered",
      body: `Your order ${orderId} has arrived.`,
      data: { orderId },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: deliveryCompletedAt,
      ...(Platform.OS === "android" ? { channelId: "delivery-updates" } : {}),
    },
  });
}
