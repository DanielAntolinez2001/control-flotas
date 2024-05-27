"use client"; // This directive indicates that this file is a client-side component

import React from "react";
import styles from "@/app/ui/dashboard/trucks/trucks.module.css";
import Link from "next/link";
import { deleteMaintenance } from "@/app/lib/maintenance";

const MaintenanceRow = ({ maintenance, onDelete }) => {
  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this maintenance?");
    if (isConfirmed) {
      await deleteMaintenance(maintenance.id);
      onDelete(maintenance.id);
    }
  };

  return (
    <tr key={maintenance.id}>
      <td>{maintenance.type}</td>
      <td>{maintenance.truck.license_plate}</td>
      <td>{maintenance.report? `${maintenance.report.id}` : null}</td>
      <td>{maintenance.description}</td>
      <td>{maintenance.Cost}</td>
      <td>{maintenance.createdAt.toString().slice(4, 16)}</td>
      <td>
        <div className={styles.buttoms}>
            <Link href={`/dashboard/maintenances/${maintenance.id}`}>
            <button className={`${styles.buttom} ${styles.view}`}>
                View
            </button>
            </Link>
            <button className={`${styles.buttom} ${styles.delete}`} onClick={() => handleDelete(maintenance.id)}>
                Delete
            </button>
        </div>
      </td>
    </tr>
  );
};

export default MaintenanceRow;