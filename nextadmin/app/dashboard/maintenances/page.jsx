"use client"

import React, { useState, useEffect } from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { getMaintenanceByTruck, getMaintenances } from "@/app/lib/maintenance";
import MaintenanceRow from "./delete/page";

const Maintenances = ({ searchParams }) => {
  const [maintenances, setMaintenances] = useState([]);
  const q = searchParams?.q || null;

  useEffect(() => {
    const fetchMaintenances = async () => {
      let result = null;
      if (q) {
        result = await getMaintenanceByTruck(q);
      } else {
        result = await getMaintenances();
      }
      setMaintenances(result);
    };
    fetchMaintenances();
  }, [q]);

  const handleDelete = (id) => {
    setMaintenances(maintenances.filter(maintenance => maintenance.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search maintenance..." />
        <Link href="/dashboard/maintenances/add">
          <button className={styles.addButtom}>Add Maintenance</button>
        </Link>
        <Link href="/dashboard/maintenances/program">
          <button className={styles.addButtom}>Schedule Maintenance</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Type</td>
            <td>Truck</td>
            <td>Report</td>
            <td>Description</td>
            <td>Cost</td>
            <td>Created At</td>
          </tr>
        </thead>
        <tbody>
          {maintenances.map((maintenance) => (
            <MaintenanceRow key={maintenance.id} maintenance={maintenance} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default Maintenances;
