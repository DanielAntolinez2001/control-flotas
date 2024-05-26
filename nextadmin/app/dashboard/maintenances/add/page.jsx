"use client"

import React, { useState } from "react";
import styles from "@/app/ui/dashboard/trucks/addTruck/addTruck.module.css";
import { createMaintenance } from "@/app/lib/maintenance";

const AddMaintenancePage = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isConfirmed = window.confirm("Are you sure you want to create this maintenance?");
    if (isConfirmed) {
      const formData = new FormData(event.target);
      await createMaintenance(formData);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h3 className={styles.title}>Maintenance</h3>
          <input type="text" name="description" placeholder="Description" />
          <input type="text" name="cost" placeholder="Cost" />
          <select name="type" id="type">
            <option value="">Choose the type of preventive maintenance</option>
            <option value="weekly">Weekly</option>
            <option value="before_route">Before Route</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Truck</h3>
          <input
            type="text"
            placeholder="License Plate"
            name="licensePlate"
            id="license_plate"
            required
          />
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Tire Condition</h3>
          <input type="text" name="brand" placeholder="Brand" />
          <input type="text" name="model" placeholder="Model" />
          <input type="text" name="mileage" placeholder="Mileage" />
          <select name="status" id="status">
            <option value="">Choose a tire status</option>
            <option value="New">New</option>
            <option value="WornOut">Worn out</option>
            <option value="Change">Change</option>
          </select>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Fuel Condition</h3>
          <input type="text" name="costF" placeholder="Cost" />
          <input type="text" name="efficienncy" placeholder="Efficiency" />
          <select name="amount" id="FuelAmount">
            <option value="">Choose a fuel condition</option>
            <option value="Full">Full</option>
            <option value="Half">Half</option>
            <option value="Empty">Empty</option>
          </select>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Brakes Condition</h3>
          <select name="pads_condition" id="padsCondition">
            <option value="">Choose a pads condition</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Worn">Worn</option>
            <option value="Replace">Replace</option>
          </select>
          <select name="discs_condition" id="diskCondition">
            <option value="">Choose a discs condition</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Worn">Worn</option>
            <option value="Replace">Replace</option>
          </select>
          <select name="fluid_level" id="fluidCondition">
            <option value="">Choose a fluid level condition</option>
            <option value="Full">Full</option>
            <option value="Low">Low</option>
            <option value="Empty">Empty</option>
            <option value="Check">Check</option>
          </select>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Exhaust System Condition</h3>
          <select name="leak_detection" id="leak_detection ">
          <option value="">Are there leaks?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
          <select name="pipes_condition" id="pipesCondition">
            <option value="">Choose a pipes condition</option>
            <option value="Intact">Intact</option>
            <option value="Corroded">Corroded</option>
            <option value="Leaking">Leaking</option>
            <option value="NeedsReplacement">Need Replacement</option>
          </select>
          <select name="mufflers_condition" id="mufflersCondition">
            <option value="">Choose mufflers condition</option>
            <option value="Intact">Intact</option>
            <option value="Corroded">Corroded</option>
            <option value="Leaking">Leaking</option>
            <option value="NeedsReplacement">Need Replacement</option>
          </select>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Fluid Level Condition</h3>
          <select name="direction_fluid_level" id="direction_fluid_level">
            <option value="">Choose a direction fluid level</option>
            <option value="Full">Full</option>
            <option value="Low">Low</option>
            <option value="Refill">Refill</option>
          </select>
          <select name="brake_fluid_level" id="brake_fluid_level">
            <option value="">Choose a brakes fluid level</option>
            <option value="Full">Full</option>
            <option value="Low">Low</option>
            <option value="Refill">Refill</option>
          </select>
          <select name="coolant_fluid_level" id="coolant_fluid_level">
            <option value="">Choose a coolant fluid level</option>
            <option value="Full">Full</option>
            <option value="Low">Low</option>
            <option value="Refill">Refill</option>
          </select>
          <select name="wiper_fluid_level" id="wiper_fluid_level">
            <option value="">Choose a wiper fluid level</option>
            <option value="Full">Full</option>
            <option value="Low">Low</option>
            <option value="Refill">Refill</option>
          </select>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Body Chasis Condition</h3>
          <select name="chassis_condition" id="chassis_condition">
            <option value="">Choose a chasis condition</option>
            <option value="Good">Good</option>
            <option value="Damaged">Damaged</option>
            <option value="Rusty">Rusty</option>
            <option value="NeedsRepair">Need repair</option>
          </select>
          <select name="body_condition" id="body_condition">
            <option value="">Choose a body condition</option>
            <option value="Good">Good</option>
            <option value="Damaged">Damaged</option>
            <option value="Rusty">Rusty</option>
            <option value="NeedsRepair">Need repair</option>
          </select>
          <select name="seatbelt_functionality" id="seatbelt_functionality">
            <option value="">Choose a seatbelt condition</option>
            <option value="Functional">Functional</option>
            <option value="NonFunctional">Not Functional</option>
            <option value="PartiallyFunctional">Partially Functional</option>
            <option value="NotApplicable">Not Applicable</option>
          </select>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Electric System Condition</h3>
          <select name="battery_status" id="battery_status">
            <option value="">Choose a battery status</option>
            <option value="Good">Good</option>
            <option value="Weak">Weak</option>
            <option value="Dead">Dead</option>
            <option value="NeedsReplacement">Need Replacement</option>
          </select>
          <select name="lights_functionality" id="lights_functionality">
            <option value="" >Choose a lights functionality</option>
            <option value="Functional">Functional</option>
            <option value="NonFunctional">Not Functional</option>
            <option value="PartiallyFunctional">Partially Functional</option>
            <option value="NotApplicable">Not Applicable</option>
          </select>
          <select name="fuse_status" id="fuse_status">
            <option value="">Choose a fuse status</option>
            <option value="Intact">Intact</option>
            <option value="Blown">Blown</option>
            <option value="NeedsReplacement">Need Replacement</option>
            <option value="NotApplicable">Not Applicable</option>
          </select>
        </div>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddMaintenancePage;
