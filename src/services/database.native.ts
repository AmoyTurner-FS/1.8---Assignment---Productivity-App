import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("tasks.db");

export function initializeDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      priority TEXT,
      completed INTEGER DEFAULT 0
    );
  `);
}

export function getTasks() {
  return db.getAllSync("SELECT * FROM tasks");
}

export function addTask(title: string, description: string, priority: string) {
  db.runSync(
    "INSERT INTO tasks (title, description, priority, completed) VALUES (?, ?, ?, 0)",
    [title, description, priority]
  );
}

export function deleteTask(id: number) {
  db.runSync("DELETE FROM tasks WHERE id = ?", [id]);
}

export function toggleTask(id: number, completed: boolean) {
  db.runSync("UPDATE tasks SET completed = ? WHERE id = ?", [
    completed ? 1 : 0,
    id,
  ]);
}
