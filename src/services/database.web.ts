let memoryTasks: any[] = [];

function hasLocalStorage() {
  return typeof localStorage !== "undefined";
}

export function initializeDatabase() {
  return;
}

export function getTasks() {
  if (hasLocalStorage()) {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
  }

  return memoryTasks;
}

export function addTask(title: string, description: string, priority: string) {
  const tasks = getTasks();

  const newTask = {
    id: Date.now(),
    title,
    description,
    priority,
    completed: 0,
  };

  const updatedTasks = [...tasks, newTask];

  if (hasLocalStorage()) {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  } else {
    memoryTasks = updatedTasks;
  }
}

export function deleteTask(id: number) {
  const tasks = getTasks().filter((task: any) => task.id !== id);

  if (hasLocalStorage()) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    memoryTasks = tasks;
  }
}

export function toggleTask(id: number, completed: boolean) {
  const tasks = getTasks().map((task: any) =>
    task.id === id ? { ...task, completed: completed ? 1 : 0 } : task
  );

  if (hasLocalStorage()) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    memoryTasks = tasks;
  }
}
