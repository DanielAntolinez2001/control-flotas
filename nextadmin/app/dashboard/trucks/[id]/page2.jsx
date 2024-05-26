"use client";

import React, { useState } from "react";
import styles from "@/app/ui/dashboard/trucks/singleTruck/singleTruck.module.css";
import { updateTruck, redirectMain} from "@/app/lib/trucks";

const UpdateTruckForm = ({ truck }) => {
  const [status, setStatus] = useState(truck.status);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const isConfirmed = window.confirm("Are you sure you want to update this truck?");
    if (isConfirmed) {
      const formData = new FormData(event.target);
      await updateTruck(formData);
    }else
        await redirectMain();
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleUpdate} className={styles.form}>
        <input type="hidden" name="id" value={truck.id} />
        <label>Status</label>
        <input
          type="text"
          name="status"
          onChange={(e) => setStatus(e.target.value)}
          placeholder={truck.status}
        />
        <button className={styles.button} type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateTruckForm;