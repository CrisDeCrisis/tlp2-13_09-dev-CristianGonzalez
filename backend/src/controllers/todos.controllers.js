import { database } from "../db/database.js";

export const getAllTodosCtrl = (req, res) => {
  try {
    const todos = database.todos;
    const userTodos = todos.filter((todo) => todo.owner === req.user.id);

    res.json({ userTodos });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tareas" });
  }
};

export const createTaskCtrl = (req, res) => {
  try {
    const { title, completed } = req.body;

    if (!title || typeof completed !== 'boolean') {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    const newTask = {
      id: database.todos.length + 1,
      title,
      completed,
      owner: req.user.id
    };

    database.todos.push(newTask);

    res.json({ message: "Tarea creada", task: newTask });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tarea" });
  }
};

export const updateTaskCtrl = (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const task = database.todos.find((todo) => todo.id === Number(id) && todo.owner === req.user.id);

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    task.title = title;
    task.completed = completed;

    res.status(200).json({ message: "Tarea actualizada", task });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la tarea" });
  }
};

export const deleteTaskCtrl = (req, res) => {
  try {
    const { id } = req.params;

    const task = database.todos.find((todo) => todo.id === Number(id));

    if (task.owner !== req.user.id) {
      return res.status(401).json({ message: "No tienes permisos para eliminar esta tarea" });
    }

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    const taskIndex = database.todos.findIndex((todo) => todo.id === Number(id));
    database.todos.splice(taskIndex, 1);

    res.status(200).json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la tarea" });
  }
};