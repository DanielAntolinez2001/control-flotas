import React from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { getUSerByName, getUsers } from "@/app/lib/users";

const Users = async ({searchParams}) => {
  const q = searchParams?.q || null;
  var users = null;

  if (q){
    users = await getUSerByName(q);
  }else{
    users = await getUsers();
  }

  console.log (users);

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
          {users.map(user=>(
            <tr key = {user.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={user.avatar || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {user.name}
                </div>
              </td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.active}</td>
              <td>{`${user.address.street}, ${user.address.city}, ${user.address.state} ${user.address.zip}` || null}</td>
              <td>{user.createdAt.toString().slice(4,16)}</td>
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
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default Users;
