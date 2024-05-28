"use client"

import React, { useState, useEffect } from "react";
import styles from "@/app/ui/dashboard/trucks/addTruck/addTruck.module.css";
import { getLicensePlates } from "@/app/lib/trucks";
import { scheduleMaintenance } from "@/app/lib/maintenance";

const Maintenances = () => {
  const [scheduleDate, setScheduleDate] = useState('');
  const [type, setType] = useState('');
  const [licenses, setLicenses] = useState([]);
  const [licensePlate, setLicensePlate] = useState(''); // Agregar estado para la placa del camión

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

  const handleScheduleMaintenance = async (e) => {
    e.preventDefault();

    if (!scheduleDate || !licensePlate) {
      alert('Please select a date and enter the license plate for the maintenance.');
      return;
    }

    const confirmation = window.confirm(`Are you sure you want to schedule maintenance on ${scheduleDate} for the truck with license plate ${licensePlate}?`);

    if (confirmation) {
      await scheduleMaintenance(type, scheduleDate, licensePlate);
      // Aquí puedes agregar la lógica para manejar la programación del mantenimiento con la fecha y la licencia del camión
      console.log('Scheduled maintenance on:', scheduleDate, 'for truck with license plate:', licensePlate);
    } else {
      console.log('Maintenance scheduling canceled');
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleScheduleMaintenance} className={styles.form}>
        <h3 className={styles.title}>Schedule Maintenance</h3>
        <div className={styles.section}>
          <input type="date" className={styles.dateInput} onChange={(e) => setScheduleDate(e.target.value)} min={getCurrentDate()} required/>
          <select name="type" id="type" onChange={(e) => setType(e.target.value)} required>
            <option value="">Choose the type of preventive maintenance</option>
            <option value="weekly">Weekly</option>
            <option value="before_route">Before Route</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Truck License Plate</h3>
          <select name="license_plate" id="license_plate" onChange={(e) => setLicensePlate(e.target.value)} required>
            <option value="">Choose a license plate</option>
            {licenses.map((license, index) => (
              <option key={index} >{license}</option>
            ))}
          </select>
        </div>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Maintenances;
