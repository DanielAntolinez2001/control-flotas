import React from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import Image from "next/image";

const Users = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search user..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButtom}>Add User</button>
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
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                Jhon
              </div>
            </td>
            <td>Doe</td>
            <td>jhondoe@test.com</td>
            <td>Driver</td>
            <td>Active</td>
            <td>1234 Main St, Miami, FL 33101</td>
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
    </div>
  );
};

export default Users;
