import type AsyncStorage from "@react-native-async-storage/async-storage";
import type { Persistence } from "firebase/auth";
import "firebase/auth";

// Firebase's public types omit this export from its React Native entry point.
declare module "firebase/auth" {
  export function getReactNativePersistence(
    storage: Pick<typeof AsyncStorage, "getItem" | "setItem" | "removeItem">,
  ): Persistence;
}
