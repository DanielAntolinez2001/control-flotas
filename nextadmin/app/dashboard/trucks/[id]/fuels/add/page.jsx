// components/AddTruckForm.js
"use client";

import React, { useState } from "react";
import styles from "@/app/ui/dashboard/trucks/addTruck/addTruck.module.css";
import { createFuel } from "@/app/lib/FuelController";

const AddFuelForm = ({ params }) => {
  const { id } = params;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isConfirmed = window.confirm("Are you sure you want to create this fuel log?");
    if (isConfirmed) {
      const formData = new FormData(event.target);
      const result = await createFuel(id, formData);
      if (result && result.error) {
        window.confirm(result.error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h3 className={styles.title}>Fuel</h3>
          <input type="text" placeholder="Cost" name="cost" required />
          <input type="text" placeholder="Efficiency" name="efficiency" required />
          <select name="amount" id="type" placeholder="amount">
            <option value="">Choose the amount of fuel</option>
            <option value="Full">full</option>
            <option value="Half">half</option>
            <option value="Empty">empty</option>
          </select>
        </div>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddFuelForm;