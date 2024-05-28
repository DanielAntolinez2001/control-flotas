"use client";

import React, { useState } from "react";
import styles from "@/app/ui/dashboard/trucks/addTruck/addTruck.module.css";
import { changeRotation, getTireById } from "@/app/lib/tire";

const RotationTireForm = ({ params }) => {
  const { id } = params;

  const [formData, setFormData] = useState({
    rotation_pattern: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isConfirmed = window.confirm("Are you sure you want to change the tire rotation?");
    if (isConfirmed) {
      const formData = new FormData(event.target);
      await changeRotation(id, formData);
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
          <h3 className={styles.title}>Tire Rotation</h3>
          <select name="rotation_pattern" id="role" onChange={handleChange} required>
            <option value="">Choose rotation pattern</option>
            <option value="Initial">Initial</option>
            <option value="ForwardCross">Forward Cross</option>
            <option value="BackwardCross">Backward Cross</option>
            <option value="XRotation">X Rotation (Complete Crossover)</option>
            <option value="ParallelRotation">Parallel Rotation (Straight)</option>
            <option value="FiveWheel">Five Wheel</option>
          </select>
        </div>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default RotationTireForm;