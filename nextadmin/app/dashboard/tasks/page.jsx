"use client";

import TaskForm from "@/app/ui/dashboard/draganddrop/TaskForm";
import React, { useState, useEffect } from "react";
import TaskColumn from "@/app/ui/dashboard/draganddrop/TaskColumn";
import { MdChecklist, IoMdConstruct, IoMdDoneAll } from "react-icons/md";
import styles from "@/app/ui/dashboard/tasks/tasks.module.css";

const oldTasks = localStorage.getItem("tasks");

const Task = () => {
  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
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
          tasks={tasks}
          status="todo"
          handleDelete={handleDelete}
        />
        <TaskColumn
          title="Doing"
          icon={<IoMdConstruct />}
          tasks={tasks}
          status="doing"
          handleDelete={handleDelete}
        />
        <TaskColumn
          title="Done"
          icon={<IoMdDoneAll />}
          tasks={tasks}
          status="done"
          handleDelete={handleDelete}
        />
      </main>
    </div>
  );
};

export default Task;
