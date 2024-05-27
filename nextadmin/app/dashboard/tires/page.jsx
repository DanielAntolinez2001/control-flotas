"use client"

import React, { useState, useEffect } from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { getTireByTruck, getTires } from "@/app/lib/tire";

const Tires = ({ searchParams }) => {
  const [tires, setTires] = useState([]);
  const q = searchParams?.q || null;

  useEffect(() => {
    const fetchTires = async () => {
      let result = null;
      if (q) {
        result = await getTireByTruck(q);
      } else {
        result = await getTires();
      }
      setTires(result);
    };
    fetchTires();
  }, [q]);

  const handleDelete = (id) => {
    setTrucks(tires.filter(tire => tire.id !== id));
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>id</td>
            <td>Truck</td>
            <td>Brand</td>
            <td>Status</td>
            <td>Model</td>
            <td>Mileage</td>
          </tr>
        </thead>
        <tbody>
          {tires.map((tire) => (
            <MaintenanceRow key={maintenance.id} maintenance={maintenance} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default Maintenances;
