import React from "react";
import TaskCard from "./TaskCard";
import styles from "./TaskColumn.module.css";

const TaskColumn = ({ title, icon, tasks, status, handleDelete }) => {
  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <div
      className={styles.task_column}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, status)}
    >
      <h2>
        {icon} {title}
      </h2>
      {filteredTasks.map((task, index) => (
        <TaskCard
          key={index}
          task={task}
          status={status}
          handleDelete={() => handleDelete(index)}
        />
      ))}
    </div>
  );
};

export default TaskColumn;
