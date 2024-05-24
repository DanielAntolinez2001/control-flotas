import React from "react";
import styles from "@/app/ui/dashboard/trucks/singleTruck/singleTruck.module.css";
import Image from "next/image";

const SingleTruckPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill />
        </div>
        License Plate
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <label>Brand</label>
          <input type="text" name="name" placeholder="Chevrolet" />
          <label>Model</label>
          <input type="text" name="lastname" placeholder="2004" />
          <label>Status</label>
          <input type="text" name="email" placeholder="Active" />
          <button className={styles.button}>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleTruckPage;
