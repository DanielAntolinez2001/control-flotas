import React from "react";
import Tag from "./Tag";
import styles from "./TaskCard.module.css";

const TaskCard = ({ task, status, handleDelete }) => {
  if (!task) {
    return null; // O algún componente de fallback
  }

  const { task: taskName, tags = [] } = task;

  return (
    <div className={styles.task_card}>
      <h3>{taskName}</h3>
      <div className={styles.task_card_bottom_line}>
        <div className={styles.task_card_tags}>
          {tags.map((tag, index) => (
            <Tag key={index} tagName={tag} selected />
          ))}
        </div>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;
