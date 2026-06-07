import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { addTask } from "../services/database.web";
import { getTheme } from "../services/settings";

export default function AddTaskScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    async function loadTheme() {
      const storedTheme = await getTheme();
      if (storedTheme) {
        setTheme(storedTheme);
      }
    }

    loadTheme();
  }, []);

  function handleSave() {
    if (!title.trim()) {
      return;
    }

    addTask(title, description, priority);
    router.push("/" as any);
  }

  const isDark = theme === "dark";

  return (
    <View style={[styles.container, isDark && styles.darkContainer]}>
      <Text style={[styles.title, isDark && styles.darkTitle]}>Add Task</Text>

      <Text style={[styles.label, isDark && styles.darkText]}>Title</Text>
      <TextInput
        style={[styles.input, isDark && styles.darkInput]}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
        placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
      />

      <Text style={[styles.label, isDark && styles.darkText]}>Description</Text>
      <TextInput
        style={[styles.textArea, isDark && styles.darkInput]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter task description"
        placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
        multiline
      />

      <Text style={[styles.label, isDark && styles.darkText]}>Priority</Text>
      <View style={styles.priorityRow}>
        {["High", "Medium", "Low"].map((item) => (
          <Pressable
            key={item}
            style={[
              styles.priorityButton,
              isDark && styles.darkPriorityButton,
              priority === item && styles.activePriority,
            ]}
            onPress={() => setPriority(item)}
          >
            <Text style={isDark && styles.darkText}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save Task</Text>
      </Pressable>

      <Pressable
        style={[styles.cancelButton, isDark && styles.darkCancelButton]}
        onPress={() => {
          window.location.href = "/";
        }}
      >
        <Text style={styles.cancelText}>Cancel</Text>
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
  darkTitle: {
    color: "#ffffff",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  darkText: {
    color: "#ffffff",
  },
  input: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  darkInput: {
    backgroundColor: "#1f2937",
    borderColor: "#374151",
    color: "#ffffff",
  },
  textArea: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 10,
    height: 100,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  priorityRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  priorityButton: {
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  darkPriorityButton: {
    backgroundColor: "#1f2937",
    borderColor: "#374151",
  },
  activePriority: {
    backgroundColor: "#bfdbfe",
    borderColor: "#2563eb",
  },
  saveButton: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  saveText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2563eb",
  },
  darkCancelButton: {
    backgroundColor: "#111827",
  },
  cancelText: {
    color: "#2563eb",
    fontWeight: "bold",
  },
});
