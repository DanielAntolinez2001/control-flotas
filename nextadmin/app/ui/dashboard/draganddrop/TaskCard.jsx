import React from "react";
import Tag from "./Tag";
import styles from "./TaskCard.module.css";
import { MdDelete } from "react-icons/md";

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
        <button onClick={handleDelete} className={styles.task_delete}>
          <MdDelete className={styles.delete_icon} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
