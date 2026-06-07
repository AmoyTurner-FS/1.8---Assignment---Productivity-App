import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export async function saveUserName(name: string) {
  if (Platform.OS === "web") {
    localStorage.setItem("userName", name);
    return;
  }

  await SecureStore.setItemAsync("userName", name);
}

export async function getUserName() {
  if (Platform.OS === "web") {
    return localStorage.getItem("userName");
  }

  return await SecureStore.getItemAsync("userName");
}

export async function saveTheme(theme: string) {
  if (Platform.OS === "web") {
    localStorage.setItem("theme", theme);
    return;
  }

  await SecureStore.setItemAsync("theme", theme);
}

export async function getTheme() {
  if (Platform.OS === "web") {
    return localStorage.getItem("theme");
  }

  return await SecureStore.getItemAsync("theme");
}
