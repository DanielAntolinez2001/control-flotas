import React from "react";
import { createUser } from "@/app/lib/users";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";

const AddUserPage = () => {
  return (
    <div className={styles.container}>
      <form action={createUser} className={styles.form}>
        <input type="name" name="name" id="name" placeholder="Name" />
        <input type="lastname" name="lastname" id="lastname" placeholder="Lastname" />
        <input type="email" name="email" id="email" placeholder="Email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        <select name="isAdmin" id="role">
          <option value="">Role</option>
          <option value="admin">Administrator</option>
          <option value="driver">Driver</option>
        </select>
        <select name="isActive" id="active">
          <option value={true}>Is Active?</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <textarea name="address" id="address" placeholder="Address"></textarea>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;
