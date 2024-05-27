"use client";

import { useState } from "react";

import styles from "./draganddrop.module.css";

const DragAndDrop = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Task 1",
      body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore dolores asperiores magnam laudantium nihil temporibus? Commodi earum amet repellendus reprehenderit! Enim debitis illum voluptatibus nisi alias possimus exercitationem doloribus? Voluptatem?",
      list: 1,
    },
    {
      id: 2,
      title: "Task 2",
      body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore dolores asperiores magnam laudantium nihil temporibus? Commodi earum amet repellendus reprehenderit! Enim debitis illum voluptatibus nisi alias possimus exercitationem doloribus? Voluptatem?",
      list: 1,
    },
    {
      id: 3,
      title: "Task 3",
      body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore dolores asperiores magnam laudantium nihil temporibus? Commodi earum amet repellendus reprehenderit! Enim debitis illum voluptatibus nisi alias possimus exercitationem doloribus? Voluptatem?",
      list: 1,
    },
  ]);

  const getList = (list) => {
    return tasks.filter((item) => item.list === list);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Tasks</h1>
      <div className={styles.draganddrop}>
        <div className={styles.column}>
          <h3 className={styles.h3}>To Do</h3>
          <div className={styles.ddZone}>
            {getList(1).map((item) => (
              <div className={styles.ddElement} key={item.id}>
                <strong className={styles.title}>{item.title}</strong>
                <p className={styles.body}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragAndDrop;
