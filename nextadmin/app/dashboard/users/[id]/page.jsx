import React from "react";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";

const SingleUserPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill />
        </div>
        Jhon Doe
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <label>Name</label>
          <input type="text" name="name" placeholder="Jhon" />
          <label>Lastname</label>
          <input type="text" name="lastname" placeholder="Doe" />
          <label>Email</label>
          <input type="email" name="email" placeholder="Email" />
          <label>Password</label>
          <input type="password" name="password" placeholder="Password" />
          <div className={styles.address}>
            <label>Street</label>
            <input type="text" name="street" placeholder="48 D" />
            <label>City</label>
            <input type="text" name="city" placeholder="Manizales" />
            <label>State</label>
            <input type="text" name="state" placeholder="Caldas" />
            <label>Zip Code</label>
            <input type="text" name="zip_code" placeholder="481111" />
            <label>Details</label>
            <input type="text" name="details" placeholder="Second floor" />
          </div>
          <button className={styles.button}>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
