import React from "react";
import styles from "./maintenance.module.css";
import Image from "next/image";
import { getTrucks } from "@/app/lib/trucks";

const Maintenance = async () => {
  // Fetch truck data on the server
  const trucksData = await getTrucks();

  const getStatusAbbreviation = (status) => {
    switch (status) {
      case "available":
        return "AVL";
      case "inactive":
        return "MTN";
      case "active":
        return "OPR";
      default:
        return "UNK";
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Operations</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Plaque</td>
            <td>Status</td>
            <td>Date</td>
            <td>Model</td>
            <td>Brand</td>
          </tr>
        </thead>
        <tbody>
          {/* Render the rows dynamically based on fetched data */}
          {trucksData.map((truck) => (
            <tr key={truck.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={truck.avatar || "/noavatar.png"} // Use the truck's avatar or a default
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {truck.license_plate}
                </div>
              </td>
              <td>
                <span
                  className={`${styles.status} ${
                    styles[truck.status.toLowerCase()] // Dynamic styles based on status
                  }`}
                >
                  {getStatusAbbreviation(truck.status)}
                </span>
              </td>
              <td>{new Date(truck.createdAt).toLocaleDateString("en-US")}</td>
              <td>{truck.model}</td>
              <td>{truck.brand}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Maintenance;
