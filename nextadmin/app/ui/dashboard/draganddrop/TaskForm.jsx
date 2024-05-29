"use client";

import React, { useEffect, useState } from "react";
import styles from "./TaskForm.module.css";
import Tag from "./Tag";
import { getUsers } from "@/app/lib/users";
import { getTrucks } from "@/app/lib/trucks";

const TaskForm = ({ setTasks }) => {
  const [taskData, setTaskData] = useState({
    task: "",
    status: "todo",
    tags: [],
  });

  const checkTag = (tag) => {
    return taskData.tags.some((item) => item === tag);
  };

  const selectTag = (tag) => {
    if (taskData.tags.some((item) => item === tag)) {
      const filterTags = taskData.tags.filter((item) => item !== tag);
      setTaskData((prev) => {
        return { ...prev, tags: filterTags };
      });
    } else {
      setTaskData((prev) => {
        return { ...prev, tags: [...prev.tags, tag] };
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTaskData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks((prev) => {
      return [...prev, taskData];
    });
    setTaskData({
      task: "",
      status: "todo",
      tags: [],
    });
  };

  const [users, setUsers] = useState([]);
  const [trucks, setTrucks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await getUsers(); // Reemplaza con tu función real
      setUsers(usersData);

      const trucksData = await getTrucks(); // Reemplaza con tu función real
      setTrucks(trucksData);
    };

    fetchData();
  }, []);

  return (
    <header className={styles.app_header}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          value={taskData.task}
          className={styles.task_input}
          placeholder="Enter your task"
          onChange={handleChange}
        />

        <div className={styles.task_form_bottom_line}>
          <div>
            <Tag
              tagName="Tire Maintenance"
              selectTag={selectTag}
              selected={checkTag("Tire Maintenance")}
            />
            <Tag
              tagName="Fuel Maintenance"
              selectTag={selectTag}
              selected={checkTag("Fuel Maintenance")}
            />
            <Tag
              tagName="General Maintenance"
              selectTag={selectTag}
              selected={checkTag("General Maintenance")}
            />
            <Tag
              tagName="Send"
              selectTag={selectTag}
              selected={checkTag("Send")}
            />
          </div>
          <div>
            <select
              name="userId"
              value={taskData.userId || ""}
              onChange={handleChange}
            >
              <option value="">Seleccionar usuario</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            <select
              name="truckId"
              value={taskData.truckId || ""}
              onChange={handleChange}
            >
              <option value="">Seleccionar camión</option>
              {trucks.map((truck) => (
                <option key={truck.id} value={truck.id}>
                  {truck.license_plate}
                </option> // Muestra la placa del camión
              ))}
            </select>
          </div>
          <div>
            <select
              name="status"
              value={taskData.status}
              className={styles.task_status}
              onChange={handleChange}
            >
              <option value="todo">To do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
            <button type="submit" className={styles.task_submit}>
              + Add Task
            </button>
          </div>
        </div>
      </form>
    </header>
  );
};

export default TaskForm;
