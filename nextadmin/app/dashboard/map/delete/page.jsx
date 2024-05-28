"use client"; // This directive indicates that this file is a client-side component

import React from "react";
import styles from "@/app/ui/dashboard/trucks/trucks.module.css";
import { deleteRoute } from "@/app/lib/route";

const RouteRow = ({ route, onDelete }) => {
  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this route?");
    if (isConfirmed) {
      await deleteRoute(route.id);
      onDelete(route.id);
    }
  };

  return (
    <tr key={route.id}>
      <td>{route.truck? `${route.truck.license_plate}` : null}</td>
      <td>{route.user? `${route.user.name}` : null}</td>
      <td>{route.from}</td>
      <td>{route.to}</td>
      <td>{route.distance}</td>
      <td>{route.time}</td>
      <td>{route.createdAt.toString().slice(4, 16)}</td>
      <td>
        <div className={styles.buttoms}>
            <button className={`${styles.buttom} ${styles.delete}`} onClick={() => handleDelete(route.id)}>
                Delete
            </button>
        </div>
      </td>
    </tr>
  );
};

export default RouteRow;