"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/ui/dashboard/trucks/addTruck/addTruck.module.css";
import { createMaintenance } from "@/app/lib/maintenance";
import { getLicensePlates } from "@/app/lib/trucks";

const AddMaintenancePage = () => {
  const [maintenanceType, setMaintenanceType] = useState("");
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("maintenanceFormData");
    return savedData ? JSON.parse(savedData) : {};
  });
  const [licenses, setLicenses] = useState([]);

  useEffect(() => {
    localStorage.setItem("maintenanceFormData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const data = await getLicensePlates();
        setLicenses(data);
      } catch (error) {
        console.error('Error fetching licenses:', error);
      }
    };

    fetchLicenses();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isConfirmed = window.confirm("Are you sure you want to create this maintenance?");
    if (isConfirmed) {
      const result = await createMaintenance(formData);
      if (result && result.error) {
        window.confirm(result.error);
      }
      localStorage.removeItem("maintenanceFormData"); // Clear cache after submit
    }
  };

  const handleTypeChange = (event) => {
    setMaintenanceType(event.target.value);
    handleChange(event); // Ensure type change is also saved in cache
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h3 className={styles.title}>Maintenance</h3>
          <input type="text" name="description" placeholder="Description" onChange={handleChange}/>
          <input type="text" name="cost" placeholder="Cost" onChange={handleChange}/>
          <select name="type" id="type" onChange={handleTypeChange} required>
            <option value="">Choose the type of preventive maintenance</option>
            <option value="weekly">Weekly</option>
            <option value="before_route">Before Route</option>
            <option value="monthly">Monthly</option>
          </select>
          <select name="license_plate" id="license_plate" onChange={handleChange} required>
            <option value="">Choose a license plate</option>
            {licenses.map((license, index) => (
              <option key={index} >{license}</option>
            ))}
          </select>
        </div>

        {/* Mantenimiento Semanal */}
        {maintenanceType === "weekly" && (
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
            </div>
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
            </div>
            <div className={styles.section}>
              <h3 className={styles.title}>Tire Condition</h3>
              <select name="status" onChange={handleChange}>
                <option value="">Tire General Condition</option>
                <option value="New">New</option>
                <option value="WornOut">Worn out</option>
                <option value="Change">Change</option>
              </select>
            </div>
            <div className={styles.section}>
              <h3 className={styles.title}>Electrical System</h3>
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

        {/* Mantenimiento Mensual */}
        {maintenanceType === "monthly" && (
          <>
            <div className={styles.section}>
              <h3 className={styles.title}>Brakes System</h3>
              <select name="brake_fluid_level" onChange={handleChange}>
                <option value="">Brake Fluid Level</option>
                <option value="Full">Full</option>
                <option value="Low">Low</option>
                <option value="Refill">Refill</option>
              </select>
            </div>
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
            <div className={styles.section}>
              <h3 className={styles.title}>Electrical System</h3>
              <select name="fuse_status" onChange={handleChange}>
                <option value="">Fuse Status</option>
                <option value="Intact">Intact</option>
                <option value="Blown">Blown</option>
                <option value="NeedsReplacement">Needs Replacement</option>
              </select>
            </div>
            <div className={styles.section}>
              <h3 className={styles.title}>Tire Condition</h3>
              <select name="status" onChange={handleChange}>
                <option value="">Tire Status</option>
                <option value="New">New</option>
                <option value="WornOut">Worn out</option>
                <option value="Change">Change</option>
              </select>
              <input type="text" name="mileage" placeholder="Tire Mileage" onChange={handleChange}/>
            </div>
          </>
        )}

        {/* Mantenimiento Antes de un Viaje */}
        {maintenanceType === "before_route" && (
          <>
            <div className={styles.section}>
              <h3 className={styles.title}>Brakes System</h3>
              <select name="discs_condition" onChange={handleChange}>
                <option value="">Brake Pads Condition</option>
                <option value="Good">Good</option>
                <option value="Worn">Worn</option>
                <option value="Replace">Replace</option>
              </select>
              <select name="pads_condition" onChange={handleChange}>
                <option value="">Brake Discs Condition</option>
                <option value="Good">Good</option>
                <option value="Worn">Worn</option>
                <option value="Replace">Replace</option>
              </select>
              <select name="brake_fluid_level" onChange={handleChange}>
                <option value="">Brake Fluid Level</option>
                <option value="Full">Full</option>
                <option value="Low">Low</option>
                <option value="Refill">Refill</option>
              </select>
            </div>
            <div className={styles.section}>
              <h3 className={styles.title}>Tire Condition</h3>
              <select name="status" onChange={handleChange}>
                <option value="">Tire Visual Condition</option>
                <option value="WornOut">Worn out</option>
                <option value="Change">Change</option>
              </select>
            </div>
            <div className={styles.section}>
              <h3 className={styles.title}>Electrical System</h3>
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
            <div className={styles.section}>
              <h3 className={styles.title}>Body Chassis</h3>
              <select name="seatbelt_functionality" onChange={handleChange}>
                <option value="">Seatbelt Functionality</option>
                <option value="Functional">Functional</option>
                <option value="NonFunctional">Non-Functional</option>
                <option value="PartiallyFunctional">Partially Functional</option>
              </select>
            </div>
            <div className={styles.section}>
              <h3 className={styles.title}>Exhaust System</h3>
              <select name="leak_detection" onChange={handleChange}>
                <option value="">Leak Detection</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
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

export default AddMaintenancePage;