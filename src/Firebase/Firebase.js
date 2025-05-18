// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwVnu6g4aRfZSCDzy-1sFDypgE7aVFVf4",
  authDomain: "property-deal-2a6b2.firebaseapp.com",
  projectId: "property-deal-2a6b2",
  storageBucket: "property-deal-2a6b2.firebasestorage.app",
  messagingSenderId: "102987740297",
  appId: "1:102987740297:web:a53454c03c6e9faa6e4258",
  measurementId: "G-GZG46R9YHM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const messaging = getMessaging(firebaseApp);

export const requestPermissionAndGetToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: 'BODIi2D0fDXNP44GlA6evDZPky9w-lbXxx-Q1VLCBqWiRrcYF1veu0Ehd-KLQItCS4uHAt5Pu5e_907zF-EH7UQ'
      });
      console.log("FCM Token:", token);
      // Send token to backend here
      return token;
    } else {
      console.warn("Notification permission denied");
    }
  } catch (error) {
    console.error("Error getting token:", error);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
