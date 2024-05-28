"use client";

import TaskForm from "@/app/ui/dashboard/draganddrop/TaskForm";
import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

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
          tasks={tasks.filter(task => task.status === "todo")}
          status="todo"
          handleDelete={handleDelete}
        />
        <TaskColumn
          title="Doing"
          icon={<IoMdConstruct />}
          tasks={tasks.filter(task => task.status === "doing")}
          status="doing"
          handleDelete={handleDelete}
        />
        <TaskColumn
          title="Done"
          icon={<IoMdDoneAll />}
          tasks={tasks.filter(task => task.status === "done")}
          status="done"
          handleDelete={handleDelete}
        />
      </main>
    </div>
  );
};

export default Task;
