import React from "react";
import styles from "./rightbar.module.css";
import Image from "next/image";
import { MdPlayCircleFilled } from "react-icons/md";

const RightBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image src="/astronaut.png" alt="" fill className={styles.bg} />
        </div>
        <div className={styles.text}>
          <span className={styles.notification}>Maintenance Alert</span>
          <h3 className={styles.title}>
            It's time to change your tires!
          </h3>
          <span className={styles.subtitle}>Urgent Notification</span>
          <p className={styles.description}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor
            recusandae distinctio nulla, rem reprehenderit necessitatibus
            blanditiis vel? Aliquid odit, in hic, eius vel autem laborum,
            nostrum adipisci esse nam cupiditate!
          </p>
          <button className={styles.buttom}>
            <MdPlayCircleFilled />
            Watch Truck
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
