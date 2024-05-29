"use client";

import TaskForm from "@/app/ui/dashboard/draganddrop/TaskForm";
import { useState, useEffect } from "react";
import TaskColumn from "@/app/ui/dashboard/draganddrop/TaskColumn";
import { MdChecklist } from "react-icons/md";
import { IoMdConstruct, IoMdDoneAll } from "react-icons/io";
import styles from "@/app/ui/dashboard/tasks/tasks.module.css";

const Task = () => {
  const [tasks, setTasks] = useState(() => {
    if (typeof window !== "undefined") {
      const oldTasks = localStorage.getItem("tasks");
      return JSON.parse(oldTasks) || [];
    }
    return [];
  });

  const handleDrop = (taskId, newStatus) => {
    // 1. Actualiza el estado localmente
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    // 2. Envía la actualización al backend (usa tu API)
    fetch(`/api/tasks/${taskId}`, {
      method: "PUT",
      body: JSON.stringify({ status: newStatus }),
    }).then((response) => {
      if (!response.ok) {
        // Manejar error en caso de que la actualización falle
        console.error("Error al actualizar la tarea en el backend");
      }
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const [draggingTaskIndex, setDraggingTaskIndex] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [targetStatus, setTargetStatus] = useState(null);

  const handleDragStart = (e, taskId) => {
    setDraggingTaskIndex(tasks.findIndex((task) => task.id === taskId));
    setCurrentStatus(tasks[draggingTaskIndex].status);
  };

  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((task, index) => index !== taskIndex);
    setTasks(newTasks);
  };

  return (
    <div className={styles.app}>
      <TaskForm setTasks={setTasks} />
      <main className={styles.app_main}>
        <TaskColumn
          title="To do"
          icon={<MdChecklist />}
          tasks={tasks.filter((task) => task.status === "todo")}
          status="todo"
          handleDelete={handleDelete}
          handleDrop={handleDrop}
        />
        <TaskColumn
          title="Doing"
          icon={<IoMdConstruct />}
          tasks={tasks.filter((task) => task.status === "doing")}
          status="doing"
          handleDelete={handleDelete}
          handleDrop={handleDrop}
        />
        <TaskColumn
          title="Done"
          icon={<IoMdDoneAll />}
          tasks={tasks.filter((task) => task.status === "done")}
          status="done"
          handleDelete={handleDelete}
          handleDrop={handleDrop}
        />
      </main>
    </div>
  );
};

export default Task;
