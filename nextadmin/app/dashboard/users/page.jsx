"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { deleteUser, getUSerByName, getUsers } from "@/app/lib/users";
import UserRow from "./delete/page";

const Users = ({ searchParams }) => {
  const [users, setUsers] = useState([]);
  const q = searchParams?.q || null;

  useEffect(() => {
    const fetchUsers = async () => {
      let result = null;
      if (q) {
        result = await getUSerByName(q);
      } else {
        result = await getUsers();
      }
      setUsers(result);
    };
    fetchUsers();
  }, [q]);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

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
          {users.map((user) => (
            <UserRow key={user.id} user={user} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default Users;
