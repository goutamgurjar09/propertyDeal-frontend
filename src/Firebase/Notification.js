import { messaging } from './firebase-config';
import { getToken } from 'firebase/messaging';

export const requestForToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "YOUR_PUBLIC_VAPID_KEY" // From Firebase Console
    });

    if (token) {
      console.log("FCM Token:", token);
      // ✅ Send this token to your backend API and save in DB
    } else {
      console.log("No registration token available.");
    }
  } catch (error) {
    console.error("Error getting token:", error);
  }
};
