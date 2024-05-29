import React, { useRef } from "react";
import Tag from "./Tag";
import styles from "./TaskCard.module.css";
import { MdDelete } from "react-icons/md";

const TaskCard = ({ task, status, handleDelete, handleDragStart }) => {
  if (!task) {
    return null; // O algún componente de fallback
  }

  const { task: taskName, tags = [], user } = task;

  const cardRef = useRef(null);

  const handleDragStartLocal = (e) => {
    e.dataTransfer.setData("taskIndex", task.id); // Usamos el ID de la tarea como dato
    handleDragStart(e, task.id); // Llama a la función del padre
  };

  return (
    <div
      className={styles.task_card}
      ref={cardRef}
      draggable
      onDragStart={handleDragStartLocal}
    >
      <h3>{taskName}</h3>
      <div className={styles.task_card_bottom_line}>
        <div className={styles.task_card_tags}>
          {tags.map((tag, index) => (
            <Tag key={index} tagName={tag} selected />
          ))}
        </div>
        <div>
          {user && (
            <p>
              Asignado a: {user.name} ({user.route[0]?.truck.license_plate})
            </p>
          )}
        </div>
        <button onClick={handleDelete} className={styles.task_delete}>
          <MdDelete className={styles.delete_icon} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
