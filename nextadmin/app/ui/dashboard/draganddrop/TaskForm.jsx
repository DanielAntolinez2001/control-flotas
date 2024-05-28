"use client";

import React, { useState } from "react";
import styles from "./TaskForm.module.css";
import Tag from "./Tag";

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
