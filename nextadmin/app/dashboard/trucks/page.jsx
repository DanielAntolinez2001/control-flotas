"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/ui/dashboard/trucks/trucks.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { getTrucks, getTruckByBrand } from "@/app/lib/trucks";
import TruckRow from "@/app/dashboard/trucks/delete/page";

const Trucks = ({ searchParams }) => {
  const [trucks, setTrucks] = useState([]);
  const q = searchParams?.q || null;

  useEffect(() => {
    const fetchTrucks = async () => {
      let result = null;
      if (q) {
        result = await getTruckByBrand(q);
      } else {
        result = await getTrucks();
      }
      setTrucks(result);
    };
    fetchTrucks();
  }, [q]);

  const handleDelete = (id) => {
    setTrucks(trucks.filter((truck) => truck.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search truck..." />
        <div className={styles.buttons}>
          <Link href="/dashboard/trucks/add">
            <button className={styles.addButtom}>Add Truck</button>
          </Link>
          <Link href={`/dashboard/trucks/report`}>
            <button className={styles.addButtom}>Report</button>
          </Link>
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>License Plate</td>
            <td>Brand</td>
            <td>Model</td>
            <td>Status</td>
            <td>Change Neumatics</td>
            <td>Created At</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {trucks.map((truck) => (
            <TruckRow key={truck.id} truck={truck} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default Trucks;
