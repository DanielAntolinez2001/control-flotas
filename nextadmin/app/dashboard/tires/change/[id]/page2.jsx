"use client";

import React, { useState } from "react";
import styles from "@/app/ui/dashboard/trucks/addTruck/addTruck.module.css";
import { changeTire, getTireById } from "@/app/lib/tire";

const ChangeTireForm = ({ tire }) => {
    const [formData, setFormData] = useState({
      brand: tire.brand || '',
      model: tire.model || '',
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isConfirmed = window.confirm("Are you sure you want to change the tires?");
    if (isConfirmed) {
      const formData = new FormData(event.target);
      await changeTire(tire.id, formData);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h3 className={styles.title}>Change Tire</h3>
          <input type="text" name="brand" id="brand" placeholder="brand" onChange={handleChange} />
          <input type="text" name="model" id="model" placeholder="model" onChange={handleChange} />
        </div>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChangeTireForm;