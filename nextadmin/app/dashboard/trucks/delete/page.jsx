"use client"; // This directive indicates that this file is a client-side component

import React from "react";
import styles from "@/app/ui/dashboard/trucks/trucks.module.css";
import Image from "next/image";
import Link from "next/link";
import { deleteTruck } from "@/app/lib/trucks";

const TruckRow = ({ truck, onDelete }) => {
  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this truck?");
    if (isConfirmed) {
      await deleteTruck(truck.id);
      onDelete(truck.id);
    }
  };

  return (
    <tr key={truck.id}>
      <td>
        <div className={styles.truck}>
          <Image
            src={truck.avatar || "/avatarCamion.jpg"}
            alt="avatar"
            width={40}
            height={40}
            className={styles.userImage}
          />
          {truck.license_plate}
        </div>
      </td>
      <td>{truck.brand}</td>
      <td>{truck.model}</td>
      <td>{truck.status}</td>
      <td>{truck.change_neumatics.toString().slice(4, 16)}</td>
      <td>{truck.createdAt.toString().slice(4, 16)}</td>
      <td>
        <div className={styles.buttoms}>
            <Link href={`/dashboard/trucks/${truck.id}`}>
            <button className={`${styles.buttom} ${styles.view}`}>
                View
            </button>
            </Link>
            <button className={`${styles.buttom} ${styles.delete}`} onClick={() => handleDelete(truck.id)}>
                Delete
            </button>
            <Link href={`/dashboard/trucks/${truck.id}/fuels`}>
            <button className={`${styles.buttom} ${styles.view}`}>
                Fuels
            </button>
            </Link>
        </div>
      </td>
    </tr>
  );
};

export default TruckRow;