"use client";

import React, { useState } from "react";
import styles from "@/app/ui/dashboard/trucks/addTruck/addTruck.module.css";
import { createTruck, redirectMain } from "@/app/lib/trucks";

const AddTruckForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isConfirmed = window.confirm("Are you sure you want to create this truck?");
    if (isConfirmed) {
      const formData = new FormData(event.target);
      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }
      const result = await createTruck(formData);
      if (result && result.error) {
        window.confirm(result.error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
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
          <select name="status" id="type" placeholder="status">
            <option value="">Choose the truck's status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="available">Available</option>
          </select>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Tire Condition</h3>
          <input type="text" id="Tire[brand]" name="Tire[brand]" placeholder="Brand" />
          <input type="text" id="Tire[model]" name="Tire[model]" placeholder="Model" />
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Upload Image</h3>
          <input type="file" name="avatar" accept="image/*" onChange={handleFileChange} />
        </div>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTruckForm;