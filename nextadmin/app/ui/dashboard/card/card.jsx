import React from "react";
import Link from "next/link";
import styles from "./card.module.css";
import { MdWarning } from "react-icons/md";

const Card = ({ truckLicense, id, description, truckid }) => {
  return (
    <div className={styles.container}>
      <MdWarning size={24} />
      <div className={styles.text}>
        <span className={styles.title}>
          <span className={styles.positive}>Exception</span> of Truck: {truckLicense}
        </span>
        <span className={styles.number}>ID: {id}</span>
        <span className={styles.details}>{description}</span>
      </div>
      <Link href={`/dashboard/trucks/${truckid}/exception/${id}`}>
        <button className={`${styles.buttom} ${styles.view}`}>
          Update
        </button>
      </Link>
    </div>
  );
};

export default Card;
