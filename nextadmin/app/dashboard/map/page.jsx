"use client"

import React, { useState, useEffect } from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { getRouteByTruck, getRoutes } from "@/app/lib/route";
import RouteRow from "./delete/page";

const Maintenances = ({ searchParams }) => {
  const [routes, setRoutes] = useState([]);
  const q = searchParams?.q || null;

  useEffect(() => {
    const fetchRoutes = async () => {
      let result = null;
      if (q) {
        result = await getRouteByTruck(q);
      } else {
        result = await getRoutes();
      }
      setRoutes(result);
    };
    fetchRoutes();
  }, [q]);

  const handleDelete = (id) => {
    setRoutes(routes.filter(route => route.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search routes..." />
        <Link href="/dashboard/map/add">
          <button className={styles.addButtom}>Add Route</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>License plate</td>
            <td>Driver</td>
            <td>Origin</td>
            <td>Destination</td>
            <td>Distance</td>
            <td>Duration</td>
            <td>Created at</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {routes.map((route) => (
            <RouteRow key={route.id} route={route} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default Maintenances;
