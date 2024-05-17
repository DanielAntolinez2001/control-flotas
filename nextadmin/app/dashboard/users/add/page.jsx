import React from "react";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";

const AddTruckPage = () => {
  return (
    <div className={styles.container}>
      <form action="" className={styles.form}>
        <input
          type="text"
          placeholder="License Plate"
          name="licensePlate"
          required
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Brand"
          name="brand"
          required
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Model"
          name="model"
          required
          className={styles.input}
        />
        <div className={styles.section}>
          <h3 className={styles.title}>Tire Condition</h3>
          <input type="text" placeholder="Brand" className={styles.input} />
          <input type="text" placeholder="Model" className={styles.input} />
          <select name="cat" id="cat" className={styles.combobox}>
            <option value="">Choose a tire condition</option>
            <option value="">New</option>
            <option value="">Worn out</option>
            <option value="">Out</option>
          </select>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Fuel Condition</h3>
          <select name="cat" id="cat" className={styles.combobox}>
            <option value="">Choose a fuel condition</option>
            <option value="">Full</option>
            <option value="">Half</option>
            <option value="">Empty</option>
          </select>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Brakes Condition</h3>
          <select name="cat" id="cat" className={styles.combobox}>
            <option value="">Choose a pads condition</option>
            <option value="">Good</option>
            <option value="">Fair</option>
            <option value="">Worn</option>
            <option value="">Replace</option>
          </select>
          <select name="cat" id="cat" className={styles.combobox}>
            <option value="">Choose a disk condition</option>
            <option value="">Good</option>
            <option value="">Fair</option>
            <option value="">Worn</option>
            <option value="">Replace</option>
          </select>
          <select name="cat" id="cat" className={styles.combobox}>
            <option value="">Choose a fluid level condition</option>
            <option value="">Full</option>
            <option value="">Low</option>
            <option value="">Refill</option>
          </select>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Exhaust System Condition</h3>
          <select name="cat" id="cat" className={styles.combobox}>
            <option value="">Choose a pipes condition</option>
            <option value="">Intact</option>
            <option value="">Corroded</option>
            <option value="">Leaking</option>
            <option value="">Need Replacement</option>
          </select>
          <select name="" id="" className={styles.combobox}>
            <option value="">Choose mufflers condition</option>
            <option value="">Intact</option>
            <option value="">Corroded</option>
            <option value="">Leaking</option>
            <option value="">Need Replacement</option>
          </select>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Fluid Level Condition</h3>
          <select name="cat" id="cat" className={styles.combobox}>
            <option value="">Full</option>
            <option value="">Low</option>
            <option value="">Refill</option>
          </select>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Body Chasis Condition</h3>
          <select name="" id="" className={styles.combobox}>
            <option value="">Choose a chasis condition</option>
            <option value="">Good</option>
            <option value="">Damaged</option>
            <option value="">Rusty</option>
            <option value="">Need repair</option>
          </select>
          <select name="" id="" className={styles.combobox}>
            <option value="">Choose a body condition</option>
            <option value="">Good</option>
            <option value="">Damaged</option>
            <option value="">Rusty</option>
            <option value="">Need repair</option>
          </select>
          <select name="" id="" className={styles.combobox}>
            <option value="">Choose a seatbelt condition</option>
            <option value="">Functional</option>
            <option value="">Not Functional</option>
            <option value="">Partially Functional</option>
            <option value="">Not Applicable</option>
          </select>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Electric System Condition</h3>
          <select name="" id="" className={styles.combobox}>
            <option value="">Choose a battery status</option>
            <option value="">Good</option>
            <option value="">Weak</option>
            <option value="">Dead</option>
            <option value="">Need Replacement</option>
          </select>
          <select name="" id="" className={styles.combobox}>
            <option value="">Choose a lights functionality</option>
            <option value="">Functional</option>
            <option value="">Not Functional</option>
            <option value="">Partially Functional</option>
            <option value="">Not Applicable</option>
          </select>
          <select name="" id="" className={styles.combobox}>
            <option value="">Choose a fuse status</option>
            <option value="">Intact</option>
            <option value="">Blown</option>
            <option value="">Need Replacement</option>
            <option value="">Not Applicable</option>
          </select>
        </div>
      </form>
      <button className={styles.button}>Create truck</button>
    </div>
  );
};

export default AddTruckPage;
