import React, { useState } from "react";
import { View, Text, Button, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function StorageTest() {
  const [sqliteStatus, setSqliteStatus] = useState("Not tested");
  const [asyncStorageStatus, setAsyncStorageStatus] = useState("Not tested");
  const [secureStoreStatus, setSecureStoreStatus] = useState("Not tested");

  const testSQLite = async () => {
    setSqliteStatus("N/A (Web platform)");
  };

  const testAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem("test_key", "Hello AsyncStorage");
      const value = await AsyncStorage.getItem("test_key");

      setAsyncStorageStatus(
        value === "Hello AsyncStorage" ? "Working ✅" : "Failed ❌"
      );
    } catch (error: any) {
      setAsyncStorageStatus(`Error: ${error.message}`);
    }
  };

  const testSecureStore = async () => {
    try {
      if (Platform.OS === "web") {
        localStorage.setItem("test_secure", "Hello Secure");
        const value = localStorage.getItem("test_secure");

        setSecureStoreStatus(
          value === "Hello Secure" ? "Working (localStorage) ✅" : "Failed ❌"
        );
      }
    } catch (error: any) {
      setSecureStoreStatus(`Error: ${error.message}`);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
        Storage Technology Tests
      </Text>

      <View style={{ marginBottom: 15 }}>
        <Text>SQLite Status: {sqliteStatus}</Text>
        <Button title="Test SQLite" onPress={testSQLite} />
      </View>

      <View style={{ marginBottom: 15 }}>
        <Text>AsyncStorage Status: {asyncStorageStatus}</Text>
        <Button title="Test AsyncStorage" onPress={testAsyncStorage} />
      </View>

      <View style={{ marginBottom: 15 }}>
        <Text>Secure Store Status: {secureStoreStatus}</Text>
        <Button title="Test Secure Store" onPress={testSecureStore} />
      </View>

      <Button
        title="Test All Storage"
        onPress={() => {
          testSQLite();
          testAsyncStorage();
          testSecureStore();
        }}
      />
    </View>
  );
}
