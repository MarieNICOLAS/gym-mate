import AsyncStorage from "@react-native-async-storage/async-storage";
import { FirebaseError, getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";
import { firebaseConfig } from "../firebase/config";

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const mobileAuth = () => {
  try {
    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    if (
      !(error instanceof FirebaseError) ||
      error.code !== "auth/already-initialized"
    )
      throw error;
    return getAuth(app);
  }
};
export const auth = Platform.OS === "web" ? getAuth(app) : mobileAuth();
export const db = getFirestore(app);
