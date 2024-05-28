import React from "react";

import styles from "./TaskCard.module.css";
import Tag from "./Tag";
import { MdDelete } from "react-icons/md";

const TaskCard = ({ title, tags, handleDelete, index }) => {
  return (
    <article className={styles.task_card}>
      <p className="task_text">{title}</p>

      <div className={styles.task_card_bottom_line}>
        <div className={styles.task_card_tags}>
          {tags.map((tag, index) => (
            <Tag key={index} tagName={tag} selected />
          ))}
        </div>
        <div className={styles.task_delete} onClick={() => handleDelete(index)}>
          <MdDelete />
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
