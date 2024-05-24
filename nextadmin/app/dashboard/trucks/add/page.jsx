import React from "react";
import styles from "@/app/ui/dashboard/trucks/addTruck/addTruck.module.css";
import { createTruck } from "@/app/lib/trucks";

const AddTruckPage = async () => {
  return (
    <div className={styles.container}>
      <form action={createTruck} className={styles.form}>
        <div className={styles.section}>
          <h3 className={styles.title}>Truck</h3>
          <input
            type="text"
            id="license_plate"
            placeholder="License Plate"
            name="license_plate"
            required
          />
          <input type="text" placeholder="Brand" name="brand" required />
          <input type="text" placeholder="Model" name="model" required />
          <input type="text" id="status" placeholder="Status" name="status" required />
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Tire Condition</h3>
          <input type="text" id="Tire[brand]" name="Tire[brand]" placeholder="Brand" />
          <input type="text" id="Tire[model]" name="Tire[model]" placeholder="Model" />
        </div>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTruckPage;
