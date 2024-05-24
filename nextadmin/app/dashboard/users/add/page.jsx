import React from "react";
import { createUser } from "@/app/lib/users";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";

const AddUserPage = () => {
  return (
    <div className={styles.container}>
      <form action={createUser} className={styles.form}>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Lastname" />
        <input type="email" placeholder="Email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        <select name="Role" id="role">
          <option value="option">Choose a role</option>
          <option value="admin">Admintrator</option>
          <option value="driver">Driver</option>
        </select>
        
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;
