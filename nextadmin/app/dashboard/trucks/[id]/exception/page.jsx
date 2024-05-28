"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/ui/dashboard/trucks/addTruck/addTruck.module.css";
import { createException, createMaintenance } from "@/app/lib/maintenance";

const AddExceptionPage = ({ params }) => {
  const {id} = params; 
  const [exceptionComponent, setExceptionComponent] = useState("");
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("exceptionFormData");
    return savedData ? JSON.parse(savedData) : {};
  });

  useEffect(() => {
    localStorage.setItem("exceptionFormData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isConfirmed = window.confirm("Are you sure you want to create this exception?");
    if (isConfirmed) {
      await createException(id, formData);
      localStorage.removeItem("exceptionFormData"); // Clear cache after submit
    }
  };

  const handleComponentChange = (event) => {
    setExceptionComponent(event.target.value);
    handleChange(event); // Ensure type change is also saved in cache
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h3 className={styles.title}>Exception</h3>
          <input type="text" name="description" placeholder="Description" onChange={handleChange} required/>
          <select name="statusE" id="type" onChange={handleChange} required>
            <option value="">Choose the status of exception</option>
            <option value="Check">Check</option>
            <option value="Pending">Pending</option>
          </select>
          <select name="component" id="component" onChange={handleComponentChange} required>
            <option value="">Choose the type of preventive maintenance</option>
            <option value="fluids_system">Fluids system</option>
            <option value="body_chassis">Body and Chassis</option>
            <option value="electrical_system">Electrical System</option>
            <option value="brakes">Brakes</option>
            <option value="exhaust_system">Exhaust System</option>
            <option value="tire">Tire</option>
          </select>
        </div>

        {/* Exception in tire */}
        {exceptionComponent === "tire" && (
          <>
            <div className={styles.section}>
            <h3 className={styles.title}>Tire Condition</h3>
              <select name="status" onChange={handleChange}>
                <option value="">Tire General Condition</option>
                <option value="New">New</option>
                <option value="WornOut">Worn out</option>
                <option value="Change">Change</option>
              </select>
            </div>
          </>
        )}

        {/* Exception in exhaust system */}
        {exceptionComponent === "exhaust_system" && (
          <>
            <div className={styles.section}>
              <h3 className={styles.title}>Exhaust System</h3>
              <select name="pipes_condition" onChange={handleChange}>
                <option value="">Exhaust Pipes Condition</option>
                <option value="Intact">Intact</option>
                <option value="Corroded">Corroded</option>
                <option value="Leaking">Leaking</option>
              </select>
              <select name="mufflers_condition" onChange={handleChange}>
                <option value="">Mufflers Condition</option>
                <option value="Intact">Intact</option>
                <option value="Corroded">Corroded</option>
                <option value="Leaking">Leaking</option>
              </select>
              <select name="leak_detection" onChange={handleChange}>
                <option value="">Leak Detection</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </>
        )}

        {/* Exception in brakes */}
        {exceptionComponent === "brakes" && (
          <>
            <div className={styles.section}>
              <h3 className={styles.title}>Brakes System</h3>
              <select name="pads_condition" onChange={handleChange}>
                <option value="">Brake Pads Condition</option>
                <option value="Good">Good</option>
                <option value="Worn">Worn</option>
                <option value="Replace">Replace</option>
              </select>
              <select name="discs_condition" onChange={handleChange}>
                <option value="">Brake Discs Condition</option>
                <option value="Good">Good</option>
                <option value="Worn">Worn</option>
                <option value="Replace">Replace</option>
              </select>
              <select name="fluid_level" onChange={handleChange}>
                <option value="">Brake Fluid Level</option>
                <option value="Full">Full</option>
                <option value="Low">Low</option>
                <option value="Empty">Refill</option>
              </select>
            </div>
          </>
        )}

        {/* Exception in electrical system */}
        {exceptionComponent === "electrical_system" && (
          <>
            <div className={styles.section}>
              <h3 className={styles.title}>Electrical System</h3>
              <select name="fuse_status" onChange={handleChange}>
                <option value="">Fuse Status</option>
                <option value="Intact">Intact</option>
                <option value="Blown">Blown</option>
                <option value="NeedsReplacement">Needs Replacement</option>
              </select>
              <select name="lights_functionality" onChange={handleChange}>
                <option value="">Lights Functionality</option>
                <option value="Functional">Functional</option>
                <option value="NonFunctional">Non-Functional</option>
              </select>
              <select name="battery_status" onChange={handleChange}>
                <option value="">Battery Status</option>
                <option value="Good">Good</option>
                <option value="Weak">Weak</option>
                <option value="Dead">Dead</option>
              </select>
            </div>
          </>
        )}

        {/* Exception in body and chassis */}
        {exceptionComponent === "body_chassis" && (
          <>
            <div className={styles.section}>
              <h3 className={styles.title}>Body Chassis</h3>
              <select name="chassis_condition" onChange={handleChange}>
                <option value="">Chassis Condition</option>
                <option value="Good">Good</option>
                <option value="Damaged">Damaged</option>
                <option value="Rusty">Rusty</option>
              </select>
              <select name="body_condition" onChange={handleChange}>
                <option value="">Body Condition</option>
                <option value="Good">Good</option>
                <option value="Damaged">Damaged</option>
                <option value="Rusty">Rusty</option>
              </select>
              <select name="seatbelt_functionality" onChange={handleChange}>
                <option value="">Seatbelt Functionality</option>
                <option value="Functional">Functional</option>
                <option value="NonFunctional">Non-Functional</option>
                <option value="PartiallyFunctional">Partially Functional</option>
              </select>
            </div>
          </>
        )}

        {/* Exception in fluid system */}
        {exceptionComponent === "fluids_system" && (
          <>
            <div className={styles.section}>
              <h3 className={styles.title}>Fluids System</h3>
              <select name="brake_fluid_level" onChange={handleChange}>
                <option value="">Brake Fluid Level</option>
                <option value="Full">Full</option>
                <option value="Low">Low</option>
                <option value="Refill">Refill</option>
              </select>
              <select name="coolant_fluid_level" onChange={handleChange}>
                <option value="">Coolant Fluid Level</option>
                <option value="Full">Full</option>
                <option value="Low">Low</option>
                <option value="Refill">Refill</option>
              </select>
              <select name="wiper_fluid_level" onChange={handleChange}>
                <option value="">Wiper Fluid Level</option>
                <option value="Full">Full</option>
                <option value="Low">Low</option>
                <option value="Refill">Refill</option>
              </select>
              <select name="direction_fluid_level" onChange={handleChange}>
                <option value="">Wiper Fluid Level</option>
                <option value="Full">Full</option>
                <option value="Low">Low</option>
                <option value="Refill">Refill</option>
              </select>
            </div>
          </>
        )}

        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddExceptionPage;