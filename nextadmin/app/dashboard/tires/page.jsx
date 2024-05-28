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

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search maintenance..." />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>id</td>
            <td>Truck</td>
            <td>Brand</td>
            <td>Rotation</td>
            <td>Status</td>
            <td>Model</td>
            <td>Mileage</td>
            <td>Change At</td>
          </tr>
        </thead>
        <tbody>
          {tires.map((tire) => (
            <tr key={tire.id}>
                <td>{tire.id}</td>
                <td>{tire.truck? `${tire.truck.license_plate}`: null}</td>
                <td>{tire.brand}</td>
                <td>{tire.rotation_pattern}</td>
                <td>{tire.status}</td>
                <td>{tire.model}</td>
                <td>{tire.mileage}</td>
                <td>{tire.truck? `${tire.truck.change_neumatics.toString().slice(4, 16)}`: null}</td>
                <td>
                <div className={styles.buttoms}>
                    <Link href={`/dashboard/tires/change/${tire.id}`}>
                    <button className={`${styles.buttom} ${styles.view}`}>
                       Change
                    </button>
                    </Link>
                    <Link href={`/dashboard/tires/rotation/${tire.id}`}>
                    <button className={`${styles.buttom} ${styles.view}`}>
                       Rotation
                    </button>
                    </Link>
                </div>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default Tires;
