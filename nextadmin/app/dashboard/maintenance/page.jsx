import React from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { deleteMaintenance, getMaintenanceByTruck, getMaintenances } from "@/app/lib/maintenance";

const Maintenances = async ({ searchParams }) => {
  const q = searchParams?.q || null;
  var maintenances = null;

  if (q) {
    maintenances = await getMaintenanceByTruck(q);
  } else {
    maintenances = await getMaintenances();
  }

  console.log(maintenances);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search maintenance..." />
        <Link href="/dashboard/maintenances/add">
          <button className={styles.addButtom}>Add Maintenance</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Lastname</td>
            <td>Email</td>
            <td>Role</td>
            <td>Status</td>
            <td>Address</td>
            <td>Created At</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {maintenances.map((maintenance) => (
            <tr key={maintenance.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={maintenance.avatar || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {maintenance.name}
                </div>
              </td>
              <td>{maintenance.lastname}</td>
              <td>{maintenance.email}</td>
              <td>{maintenance.role}</td>
              <td>{<td>{maintenance.active ? 'Active' : 'Inactive'}</td>}</td>
              <td>
              {maintenance.address? `${maintenance.address.street}, ${maintenance.address.city}, ${maintenance.address.state} ${maintenance.address.zip}`
                : null}
              </td>
              <td>{maintenance.createdAt.toString().slice(4, 16)}</td>
              <td>
                <div className={styles.buttoms}>
                  <Link href={`/dashboard/maintenances/${maintenance.id}`}>
                    <button className={`${styles.buttom} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteMaintenance}>
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

export default Maintenances;
