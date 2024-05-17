import React from "react";
import styles from "@/app/ui/dashboard/trucks/addTruck/addTruck.module.css";

const AddTruckPage = () => {
  return (
    <div className={styles.container}>
      <form action="" className={styles.form}>
        <input
          type="text"
          placeholder="License Plate"
          name="licensePlate"
          required
        />
        <input type="text" placeholder="Brand" name="brand" required />
        <input type="text" placeholder="Model" name="model" required />
        <div className={styles.section}>
          <h3 className={styles.title}>Tire Condition</h3>
          <input type="text" placeholder="Brand" />
          <input type="text" placeholder="Model" />
          <select name="Tire Condition" id="tireCondition">
            <option value="option">Choose a tire condition</option>
            <option value="new">New</option>
            <option value="worn_out">Worn out</option>
            <option value="out">Out</option>
          </select>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Fuel Condition</h3>
          <select name="Fuel Condition" id="fuelCondition">
            <option value="option">Choose a fuel condition</option>
            <option value="full">Full</option>
            <option value="half">Half</option>
            <option value="empty">Empty</option>
          </select>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Brakes Condition</h3>
          <select name="Pads Condition" id="padsCondition">
            <option value="option">Choose a pads condition</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="worn">Worn</option>
            <option value="replace">Replace</option>
          </select>
          <select name="Disk Condition" id="diskCondition">
            <option value="option">Choose a disk condition</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="worn">Worn</option>
            <option value="replace">Replace</option>
          </select>
          <select name="Fluid Condition" id="fluidCondition">
            <option value="option">Choose a fluid level condition</option>
            <option value="full">Full</option>
            <option value="low">Low</option>
            <option value="refill">Refill</option>
          </select>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Exhaust System Condition</h3>
          <select name="Pipes Condition" id="pipesCondition">
            <option value="option">Choose a pipes condition</option>
            <option value="intact">Intact</option>
            <option value="corroded">Corroded</option>
            <option value="leaking">Leaking</option>
            <option value="need_replacement">Need Replacement</option>
          </select>
          <select name="Mufflers Condition" id="mufflersCondition">
            <option value="option">Choose mufflers condition</option>
            <option value="intact">Intact</option>
            <option value="corroded">Corroded</option>
            <option value="leaking">Leaking</option>
            <option value="need_replacement">Need Replacement</option>
          </select>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Fluid Level Condition</h3>
          <select name="Fluid Level Condition" id="fluidLevelCondition">
            <option value="full">Full</option>
            <option value="low">Low</option>
            <option value="refill">Refill</option>
          </select>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Body Chasis Condition</h3>
          <select name="Chasis Condition" id="chasisCondition">
            <option value="option">Choose a chasis condition</option>
            <option value="good">Good</option>
            <option value="damaged">Damaged</option>
            <option value="rusty">Rusty</option>
            <option value="need_repair">Need repair</option>
          </select>
          <select name="Body Condition" id="bodyCondition">
            <option value="option">Choose a body condition</option>
            <option value="good">Good</option>
            <option value="damaged">Damaged</option>
            <option value="rusty">Rusty</option>
            <option value="need_repair">Need repair</option>
          </select>
          <select name="Seatbelt Condition" id="seatbeltCondition">
            <option value="option">Choose a seatbelt condition</option>
            <option value="functional">Functional</option>
            <option value="not_functional">Not Functional</option>
            <option value="partially_functional">Partially Functional</option>
            <option value="not_applicable">Not Applicable</option>
          </select>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Electric System Condition</h3>
          <select name="Battery Status" id="batteryStatus">
            <option value="option">Choose a battery status</option>
            <option value="good">Good</option>
            <option value="weak">Weak</option>
            <option value="dead">Dead</option>
            <option value="need_replacement">Need Replacement</option>
          </select>
          <select name="Lights Condition" id="lightsCondition">
            <option value="option">Choose a lights functionality</option>
            <option value="functional">Functional</option>
            <option value="not_functional">Not Functional</option>
            <option value="partially_functional">Partially Functional</option>
            <option value="not_applicable">Not Applicable</option>
          </select>
          <select name="Fuse Status" id="fuseStatus">
            <option value="option">Choose a fuse status</option>
            <option value="intact">Intact</option>
            <option value="blown">Blown</option>
            <option value="need_replacement">Need Replacement</option>
            <option value="not_applicable">Not Applicable</option>
          </select>
        </div>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTruckPage;
