import React from "react";
import TaskCard from "./TaskCard";
import styles from "./TaskColumn.module.css";

const TaskColumn = ({
  title,
  icon,
  tasks,
  status,
  handleDelete,
  handleDrop,
}) => {
  const filteredTasks = tasks.filter((task) => task.status === status);

  const handleDropLocal = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskIndex");
    handleDrop(taskId, status); // Llama a la función del padre
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskIndex", taskId); // Establece el ID de la tarea como dato
    e.dataTransfer.effectAllowed = "move"; // Indica que la acción es mover
  };

  return (
    <div
      className={styles.task_column}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDropLocal}
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
          handleDragStart={handleDragStart}
        />
      ))}
    </div>
  );
};

export default TaskColumn;
