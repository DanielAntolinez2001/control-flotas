"use client";

import React, { useState } from "react";
import styles from "@/app/ui/dashboard/trucks/addTruck/addTruck.module.css";
import { checkException } from "@/app/lib/maintenance";

const AddExceptionPage = ({ params }) => {
  const { idE } = params; 
  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isConfirmed = window.confirm("Are you sure you want to update this exception?");
    if (isConfirmed) {
      await checkException(idE, status);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h3 className={styles.title}>Exception Status</h3>
          <select name="status" id="type" onChange={(e) => setStatus(e.target.value)}>
            <option value="">Choose the status of exception</option>
            <option value="Check">Check</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddExceptionPage;
