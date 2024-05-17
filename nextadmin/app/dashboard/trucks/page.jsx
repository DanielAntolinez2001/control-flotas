import React from "react";
import styles from "@/app/ui/dashboard/trucks/trucks.module.css";
import Image from "next/image";
import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { getTrucks } from "@/app/lib/trucks";

const Trucks = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search truck..." />
        <Link href="/dashboard/trucks/add">
          <button className={styles.addButtom}>Add Truck</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>AAA 123</td>
            <td>Brand</td>
            <td>Model</td>
            <td>Status</td>
            <td>Change Neumatics</td>
            <td>Created At</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.truck}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                AAA 123
              </div>
            </td>
            <td>Chevrolet</td>
            <td>2004</td>
            <td>Active</td>
            <td>2021-43-67</td>
            <td>2021-06-15</td>
            <td>
              <div className={styles.buttoms}>
                <Link href="/">
                  <button className={`${styles.buttom} ${styles.view}`}>
                    View
                  </button>
                </Link>
                <button className={`${styles.buttom} ${styles.delete}`}>
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default Trucks;
