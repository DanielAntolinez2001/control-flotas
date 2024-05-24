import React from "react";
import styles from "@/app/ui/dashboard/trucks/trucks.module.css";
import Image from "next/image";
import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { getTrucks, getTruckByBrand, deleteTruck } from "@/app/lib/trucks";

const Trucks = async ({ searchParams }) => {
  const q = searchParams?.q || null;
  var trucks = null;

  if (q) {
    trucks = await getTruckByBrand(q);
  } else {
    trucks = await getTrucks();
  }

  console.log(trucks);

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
            <tr key={truck.id}>
              <td>
                <div className={styles.truck}>
                  <Image
                    src={truck.avatar || "/noavatar.png"}
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
              <td>{new Date(truck.change_neumatics).toLocaleDateString()}</td>
              <td>{new Date(truck.createdAt).toLocaleDateString()}</td>
              <td>
                <div className={styles.buttoms}>
                  <Link href={`/dashboard/trucks/${truck.id}`}>
                    <button className={`${styles.buttom} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteTruck}>
                    <input type="hidden" name="id" value={truck.id} />
                    <button className={`${styles.buttom} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
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

export default Trucks;
