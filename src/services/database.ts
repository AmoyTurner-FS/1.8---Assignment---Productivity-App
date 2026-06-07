import { Platform } from "react-native";

let service: any = null;

async function getService() {
  if (service) {
    return service;
  }

  if (Platform.OS === "web") {
    service = await import("./database.web");
  } else {
    service = await import("./database.native");
  }

  return service;
}

export async function initializeDatabase() {
  const database = await getService();
  return database.initializeDatabase();
}

export async function getTasks() {
  const database = await getService();
  return database.getTasks();
}

export async function addTask(
  title: string,
  description: string,
  priority: string
) {
  const database = await getService();
  return database.addTask(title, description, priority);
}

export async function deleteTask(id: number) {
  const database = await getService();
  return database.deleteTask(id);
}

export async function toggleTask(id: number, completed: boolean) {
  const database = await getService();
  return database.toggleTask(id, completed);
}
