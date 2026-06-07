import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import {
  getTheme,
  getUserName,
  saveTheme,
  saveUserName,
} from "../services/settings";

export default function SettingsScreen() {
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("light");
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    async function loadSettings() {
      const storedName = await getUserName();
      const storedTheme = await getTheme();

      if (storedName) {
        setName(storedName);
      }

      if (storedTheme) {
        setTheme(storedTheme);
      }
    }

    loadSettings();
  }, []);

  async function handleSave() {
    await saveUserName(name);
    await saveTheme(theme);
    setSavedMessage("Settings saved successfully.");
  }

  return (
    <View style={[styles.container, theme === "dark" && styles.darkContainer]}>
      <Text style={[styles.title, theme === "dark" && styles.darkText]}>
        Settings
      </Text>

      <Text style={[styles.label, theme === "dark" && styles.darkText]}>
        User Name
      </Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      <Text style={[styles.label, theme === "dark" && styles.darkText]}>
        Theme Preference
      </Text>

      <View style={styles.themeRow}>
        <Pressable
          style={[styles.themeButton, theme === "light" && styles.activeTheme]}
          onPress={() => setTheme("light")}
        >
          <Text>Light</Text>
        </Pressable>

        <Pressable
          style={[styles.themeButton, theme === "dark" && styles.activeTheme]}
          onPress={() => setTheme("dark")}
        >
          <Text>Dark</Text>
        </Pressable>
      </View>

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save Settings</Text>
      </Pressable>

      {savedMessage ? (
        <Text style={styles.savedMessage}>{savedMessage}</Text>
      ) : null}

      <Pressable
        style={styles.backButton}
        onPress={() => router.push("/" as any)}
      >
        <Text style={styles.backText}>Back to Tasks</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f3f4f6",
  },
  darkContainer: {
    backgroundColor: "#111827",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1d4ed8",
  },
  darkText: {
    color: "#ffffff",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  themeRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  themeButton: {
    padding: 12,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    flex: 1,
    alignItems: "center",
  },
  activeTheme: {
    backgroundColor: "#bfdbfe",
    borderColor: "#2563eb",
  },
  saveButton: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  saveText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  savedMessage: {
    marginTop: 12,
    color: "#16a34a",
    fontWeight: "600",
  },
  backButton: {
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2563eb",
    marginTop: 16,
  },
  backText: {
    color: "#2563eb",
    fontWeight: "bold",
  },
});
