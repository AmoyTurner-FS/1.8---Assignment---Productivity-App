import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  deleteTask,
  getTasks,
  initializeDatabase,
  toggleTask,
} from "../services/database.web";
import { getTheme } from "../services/settings";

type Task = {
  id: number;
  title: string;
  description: string;
  priority: string;
  completed: number;
};

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("All");
  const [theme, setTheme] = useState("light");

  function loadTasks() {
    const data = getTasks() as Task[];
    setTasks(data);
  }

  useEffect(() => {
    initializeDatabase();
    loadTasks();

    async function loadTheme() {
      const storedTheme = await getTheme();
      if (storedTheme) {
        setTheme(storedTheme);
      }
    }

    loadTheme();
  }, []);

  const completedCount = tasks.filter((task) => task.completed === 1).length;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed === 1;
    if (filter === "Incomplete") return task.completed === 0;
    return true;
  });

  function handleDelete(id: number) {
    if (Platform.OS === "web") {
      const confirmed = window.confirm(
        "Are you sure you want to delete this task?"
      );

      if (confirmed) {
        deleteTask(id);
        loadTasks();
      }

      return;
    }

    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => {
          deleteTask(id);
          loadTasks();
        },
      },
    ]);
  }

  function priorityStyle(priority: string) {
    if (priority === "High") return styles.high;
    if (priority === "Medium") return styles.medium;
    return styles.low;
  }

  const isDark = theme === "dark";

  return (
    <ScrollView style={[styles.container, isDark && styles.darkContainer]}>
      <Text style={[styles.title, isDark && styles.darkTitle]}>
        Productivity App
      </Text>

      <View style={[styles.statsBox, isDark && styles.darkCard]}>
        <Text style={[styles.statsText, isDark && styles.darkText]}>
          Total Tasks: {tasks.length}
        </Text>
        <Text style={[styles.statsText, isDark && styles.darkText]}>
          Completed: {completedCount}
        </Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/add-task" as any)}
      >
        <Text style={styles.buttonText}>Add Task</Text>
      </Pressable>

      <Pressable
        style={[styles.secondaryButton, isDark && styles.darkSecondaryButton]}
        onPress={() => router.push("/settings" as any)}
      >
        <Text style={styles.secondaryButtonText}>Settings</Text>
      </Pressable>

      <View style={styles.filterRow}>
        {["All", "Completed", "Incomplete"].map((item) => (
          <Pressable
            key={item}
            style={[
              styles.filterButton,
              isDark && styles.darkFilterButton,
              filter === item && styles.activeFilter,
            ]}
            onPress={() => setFilter(item)}
          >
            <Text style={isDark && styles.darkText}>{item}</Text>
          </Pressable>
        ))}
      </View>

      {filteredTasks.map((task) => (
        <View
          key={task.id}
          style={[styles.taskCard, isDark && styles.darkCard]}
        >
          <View style={styles.taskHeader}>
            <Text style={[styles.taskTitle, isDark && styles.darkText]}>
              {task.title}
            </Text>
            <Text style={[styles.priority, priorityStyle(task.priority)]}>
              {task.priority}
            </Text>
          </View>

          <Text style={[styles.description, isDark && styles.darkDescription]}>
            {task.description}
          </Text>

          <Text style={[styles.status, isDark && styles.darkText]}>
            Status: {task.completed === 1 ? "Complete" : "Incomplete"}
          </Text>

          <View style={styles.actionRow}>
            <Pressable
              style={styles.completeButton}
              onPress={() => {
                toggleTask(task.id, task.completed === 0);
                loadTasks();
              }}
            >
              <Text style={styles.buttonText}>
                {task.completed === 1 ? "Mark Incomplete" : "Mark Complete"}
              </Text>
            </Pressable>

            <Pressable
              style={styles.deleteButton}
              onPress={() => handleDelete(task.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
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
    marginBottom: 16,
    color: "#1d4ed8",
  },
  darkTitle: {
    color: "#ffffff",
  },
  statsBox: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  statsText: {
    fontSize: 16,
    fontWeight: "600",
  },
  darkText: {
    color: "#ffffff",
  },
  darkCard: {
    backgroundColor: "#1f2937",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2563eb",
    marginTop: 8,
  },
  darkSecondaryButton: {
    backgroundColor: "#111827",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  secondaryButtonText: {
    color: "#2563eb",
    fontWeight: "bold",
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    marginTop: 16,
  },
  filterButton: {
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  darkFilterButton: {
    backgroundColor: "#374151",
  },
  activeFilter: {
    backgroundColor: "#bfdbfe",
  },
  taskCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  priority: {
    fontWeight: "bold",
  },
  high: {
    color: "#dc2626",
  },
  medium: {
    color: "#d97706",
  },
  low: {
    color: "#16a34a",
  },
  description: {
    marginTop: 8,
    color: "#4b5563",
  },
  darkDescription: {
    color: "#d1d5db",
  },
  status: {
    marginTop: 8,
    fontWeight: "600",
  },
  actionRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  completeButton: {
    backgroundColor: "#16a34a",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#dc2626",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
});
