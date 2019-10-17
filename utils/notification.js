import { Constants, Notifications } from "expo";
import * as Permissions from "expo-permissions";

askPermissions = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  if (existingStatus !== granted) {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== granted) {
    return false;
  }
  return true;
};

sendNotificationImmediately = async () => {
  let notificationId = await Notifications.presentLocalNotificationAsync({
    title: "study time!",
    body: "Don't forget to make your flashcards."
  });
  console.log(notificationId); // can be saved in AsyncStorage or send to server
};

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

export const scheduleNotification = async () => {
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(20);
  tomorrow.setMinutes(0);

  let notificationId = Notifications.scheduleLocalNotificationAsync(
    {
      title: "Study time!",
      body: "Don't forget to make your flashcards."
    },
    {
      repeat: "day",
      time: tomorrow
    }
  );
  console.log(notificationId);
};
