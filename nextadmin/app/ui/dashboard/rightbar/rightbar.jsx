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
          <span className={styles.notification}>Available Now</span>
          <h3 className={styles.title}>
            How to use the nre version of the admin dashboard
          </h3>
          <span className={styles.subtitle}>Takes 4 minutes to learn</span>
          <p className={styles.description}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor
            recusandae distinctio nulla, rem reprehenderit necessitatibus
            blanditiis vel? Aliquid odit, in hic, eius vel autem laborum,
            nostrum adipisci esse nam cupiditate!
          </p>
          <button className={styles.buttom}>
            <MdPlayCircleFilled />
            Watch Dogs
          </button>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image src="/astronaut.png" alt="" fill className={styles.bg} />
        </div>
        <div className={styles.text}>
          <span className={styles.notification}>Available Now</span>
          <h3 className={styles.title}>
            How to use the nre version of the admin dashboard
          </h3>
          <span className={styles.subtitle}>Takes 4 minutes to learn</span>
          <p className={styles.description}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor
            recusandae distinctio nulla, rem reprehenderit necessitatibus
            blanditiis vel? Aliquid odit, in hic, eius vel autem laborum,
            nostrum adipisci esse nam cupiditate!
          </p>
          <button className={styles.buttom}>
            <MdPlayCircleFilled />
            Watch
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
