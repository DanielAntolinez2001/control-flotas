"use client"; // This directive indicates that this file is a client-side component

import React from "react";
import styles from "@/app/ui/dashboard/trucks/trucks.module.css";
import Image from "next/image";
import Link from "next/link";
import { deleteUser } from "@/app/lib/users";

const UserRow = ({ user, onDelete }) => {
  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (isConfirmed) {
      await deleteUser(user.id);
      onDelete(user.id);
    }
  };

  return (
    <tr key={user.id}>
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
        <td>{<td>{user.active ? 'Active' : 'Inactive'}</td>}</td>
        <td>
        {user.address? `${user.address.street}, ${user.address.city}, ${user.address.state} ${user.address.zip_code}`
        : null}
        </td>
        <td>{user.createdAt.toString().slice(4, 16)}</td>
        <td>
        <div className={styles.buttoms}>
            <Link href={`/dashboard/users/${user.id}`}>
            <button className={`${styles.buttom} ${styles.view}`}>
                View
            </button>
            </Link>
            <button className={`${styles.buttom} ${styles.delete}`} onClick={() => handleDelete(user.id)}>
                Delete
            </button>
        </div>
        </td>
    </tr>
  );
};

export default UserRow;