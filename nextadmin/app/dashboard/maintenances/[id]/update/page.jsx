"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/ui/dashboard/trucks/addTruck/addTruck.module.css";
import { updateMaintenance, getMaintenanceById } from "@/app/lib/maintenance"; // Asumiendo que tienes estas funciones

const UpdateMaintenancePage = ({ params }) => {
  const { id } = params;
  const [maintenanceType, setMaintenanceType] = useState("");
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("maintenanceFormData");
    return savedData ? JSON.parse(savedData) : {};
  });

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      if (id) {
        try {
          const data = await getMaintenanceById(id);
          setFormData(data);
          setMaintenanceType(data.type);
        } catch (error) {
          console.error('Error fetching maintenance data:', error);
        }
      }
    };

    fetchMaintenanceData();
  }, []);

  useEffect(() => {
    localStorage.setItem("maintenanceFormData", JSON.stringify(formData));
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
    const isConfirmed = window.confirm("Are you sure you want to update this maintenance?");
    if (isConfirmed) {
      const result = await updateMaintenance(id, formData);
      if (result && result.error) {
        window.confirm(result.error);
      }
      localStorage.removeItem("maintenanceFormData"); // Clear cache after submit
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h3 className={styles.title}>Update Maintenance</h3>
          <input type="text" name="description" placeholder="Description" value={formData.description || ''} onChange={handleChange} required/>
          <input type="text" name="cost" placeholder="Cost" value={formData.cost || ''} onChange={handleChange} required/>
        </div>

        {/* Mantenimiento Semanal */}
        {maintenanceType === "weekly" && (
          <>
            <div className={styles.section}>
              <h3 className={styles.title}>Fluids System</h3>
              <select name="brake_fluid_level" value={formData.brake_fluid_level || ''} onChange={handleChange}>
                <option value="">Brake Fluid Level</option>
                <option value="Full">Full</option>
                <option value="Low">Low</option>
                <option value="Refill">Refill</option>
              </select>
              <select name="coolant_fluid_level" value={formData.coolant_fluid_level || ''} onChange={handleChange}>
                <option value="">Coolant Fluid Level</option>
                <option value="Full">Full</option>
                <option value="Low">Low</option>
                <option value="Refill">Refill</option>
              </select>
              <select name="wiper_fluid_level" value={formData.wiper_fluid_level || ''} onChange={handleChange}>
                <option value="">Wiper Fluid Level</option>
                <option value="Full">Full</option>
                <option value="Low">Low</option>
                <option value="Refill">Refill</option>
              </select>
            </div>
            <div className={styles.section}>
              <h3 className={styles.title}>Brakes System</h3>
              <select name="pads_condition" value={formData.pads_condition || ''} onChange={handleChange}>
                <option value="">Brake Pads Condition</option>
                <option value="Good">Good</option>
                <option value="Worn">Worn</option>
                <option value="Replace">Replace</option>
              </select>
              <select name="discs_condition" value={formData.discs_condition || ''} onChange={handleChange}>
                <option value="">Brake Discs Condition</option>
                <option value="Good">Good</option>
                <option value="Worn">Worn</option>
                <option value="Replace">Replace</option>
              </select>
            </div>
            <div className={styles.section}>
              <h3 className={styles.title}>Tire Condition</h3>
              <select name="status" value={formData.status || ''} onChange={handleChange}>
                <option value="">Tire General Condition</option>
                <option value="New">New</option>
                <option value="WornOut">Worn out</option>
                <option value="Change">Change</option>
              </select>
            </div>
            <div className={styles.section}>
              <h3 className={styles.title}>Electrical System</h3>
              <select name="lights_functionality" value={formData.lights_functionality || ''} onChange={handleChange}>
                <option value="">Lights Functionality</option>
                <option value="Functional">Functional</option>
                <option value="NonFunctional">Non-Functional</option>
              </select>
              <select name="battery_status" value={formData.battery_status || ''} onChange={handleChange}>
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
              <select name="brake_fluid_level" value={formData.brake_fluid_level || ''} onChange={handleChange}>
                <option value="">Brake Fluid Level</option>
                <option value="Full">Full</option>
                <option value="Low">Low</option>
                <option value="Refill">Refill</option>
              </select>
            </div>
            <div className={styles.section}>
              <h3 className={styles.title}>Body Chassis</h3>
              <select name="chassis_condition" value={formData.chassis_condition || ''} onChange={handleChange}>
                <option value="">Chassis Condition</option>
                <option value="Good">Good</option>
                <option value="Damaged">Damaged</option>
                <option value="Rusty">Rusty</option>
              </select>
              <select name="body_condition" value={formData.body_condition || ''} onChange={handleChange}>
                <option value="">Body Condition</option>
                <option value="Good">Good</option>
                <option value="Damaged">Damaged</option>
                <option value="Rusty">Rusty</option>
              </select>
              <select name="seatbelt_functionality" value={formData.seatbelt_functionality || ''} onChange={handleChange}>
                <option value="">Seatbelt Functionality</option>
                <option value="Functional">Functional</option>
                <option value="NonFunctional">Non-Functional</option>
                <option value="PartiallyFunctional">Partially Functional</option>
              </select>
            </div>
            <div className={styles.section}>
              <h3 className={styles.title}>Exhaust System</h3>
              <select name="pipes_condition" value={formData.pipes_condition || ''} onChange={handleChange}>
                <option value="">Exhaust Pipes Condition</option>
                <option value="Intact">Intact</option>
                <option value="Corroded">Corroded</option>
                <option value="Leaking">Leaking</option>
              </select>
              <select name="mufflers_condition" value={formData.mufflers_condition || ''} onChange={handleChange}>
                <option value="">Mufflers Condition</option>
                <option value="Intact">Intact</option>
                <option value="Corroded">Corroded</option>
                <option value="Leaking">Leaking</option>
              </select>
              <select name="leak_detection" value={formData.leak_detection || ''} onChange={handleChange}>
                <option value="">Leak Detection</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className={styles.section}>
              <h3 className={styles.title}>Electrical System</h3>
              <select name="fuse_status" value={formData.fuse_status || ''} onChange={handleChange}>
                <option value="">Fuse Status</option>
                <option value="Intact">Intact</option>
                <option value="Blown">Blown</option>
                <option value="NeedsReplacement">Needs Replacement</option>
              </select>
            </div>
            <div className={styles.section}>
              <h3 className={styles.title}>Tire Condition</h3>
              <select name="status" value={formData.status || ''} onChange={handleChange}>
                <option value="">Tire Status</option>
                <option value="New">New</option>
                <option value="WornOut">Worn out</option>
                <option value="Change">Change</option>
              </select>
              <input type="text" name="mileage" placeholder="Tire Mileage" value={formData.mileage || ''} onChange={handleChange}/>
            </div>
          </>
        )}

        {/* Mantenimiento Antes de un Viaje */}
        {maintenanceType === "before_route" && (
          <>
            <div className={styles.section}>
              <h3 className={styles.title}>Brakes System</h3>
              <select name="discs_condition" value={formData.discs_condition || ''} onChange={handleChange}>
                <option value="">Brake Pads Condition</option>
                <option value="Good">Good</option>
                <option value="Worn">Worn</option>
                <option value="Replace">Replace</option>
              </select>
              <select name="pads_condition" value={formData.pads_condition || ''} onChange={handleChange}>
                <option value="">Brake Discs Condition</option>
                <option value="Good">Good</option>
                <option value="Worn">Worn</option>
                <option value="Replace">Replace</option>
              </select>
              <select name="brake_fluid_level" value={formData.brake_fluid_level || ''} onChange={handleChange}>
                <option value="">Brake Fluid Level</option>
                <option value="Full">Full</option>
                <option value="Low">Low</option>
                <option value="Refill">Refill</option>
              </select>
            </div>
            <div className={styles.section}>
              <h3 className={styles.title}>Tire Condition</h3>
              <select name="status" value={formData.status || ''} onChange={handleChange}>
                <option value="">Tire Visual Condition</option>
                <option value="WornOut">Worn out</option>
                <option value="Change">Change</option>
              </select>
            </div>
            <div className={styles.section}>
              <h3 className={styles.title}>Electrical System</h3>
              <select name="lights_functionality" value={formData.lights_functionality || ''} onChange={handleChange}>
                <option value="">Lights Functionality</option>
                <option value="Functional">Functional</option>
                <option value="NonFunctional">Non-Functional</option>
              </select>
              <select name="battery_status" value={formData.battery_status || ''} onChange={handleChange}>
                <option value="">Battery Status</option>
                <option value="Good">Good</option>
                <option value="Weak">Weak</option>
                <option value="Dead">Dead</option>
              </select>
            </div>
            <div className={styles.section}>
              <h3 className={styles.title}>Body Chassis</h3>
              <select name="seatbelt_functionality" value={formData.seatbelt_functionality || ''} onChange={handleChange}>
                <option value="">Seatbelt Functionality</option>
                <option value="Functional">Functional</option>
                <option value="NonFunctional">Non-Functional</option>
                <option value="PartiallyFunctional">Partially Functional</option>
              </select>
            </div>
            <div className={styles.section}>
              <h3 className={styles.title}>Exhaust System</h3>
              <select name="leak_detection" value={formData.leak_detection || ''} onChange={handleChange}>
                <option value="">Leak Detection</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </>
        )}

        <button type="submit" className={styles.button}>
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateMaintenancePage;
