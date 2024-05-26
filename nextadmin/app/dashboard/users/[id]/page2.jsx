// components/UpdateUserForm.js
"use client";

import React, { useState } from "react";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import { redirectMain, updateUser } from "@/app/lib/users";

const UpdateUserForm = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: user.name || '',
    lastname: user.lastname || '',
    password: '',
    street: user.address?.street || '',
    city: user.address?.city || '',
    neighborhood: user.address?.neighborhood || '',
    state: user.address?.state || '',
    zip_code: user.address?.zip_code || '',
    details: user.address?.details || '',
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isConfirmed = window.confirm("Are you sure you want to update this user?");
    if (isConfirmed) {
      const form = new FormData();
      for (const key in formData) {
        form.append(key, formData[key]);
      }
      if (selectedFile) {
        form.append("avatar", selectedFile);
      }
      await updateUser(user.id, form);
    }else
      redirectMain();
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Name</label>
        <input type="text" name="name" onChange={handleChange} placeholder={user.name} />
        <label>Lastname</label>
        <input type="text" name="lastname" onChange={handleChange} placeholder={user.lastname} />
        <label>Password</label>
        <input type="password" name="password" onChange={handleChange} placeholder="Password" />
        <div className={styles.address}>
          <label>Street</label>
          <input type="text" name="street" onChange={handleChange} placeholder={user.address? `${user.address.street}` : "..."} />
          <label>City</label>
          <input type="text" name="city" onChange={handleChange} placeholder={user.address? `${user.address.city}` : "..."} />
          <label>State</label>
          <input type="text" name="state" onChange={handleChange} placeholder={user.address? `${user.address.state}` : "..."}/>
          <label>Zip Code</label>
          <input type="text" name="zip_code" onChange={handleChange} placeholder={user.address? `${user.address.zip_code}` : "..."} />
          <label>Details</label>
          <input type="text" name="details" onChange={handleChange} placeholder={user.address? `${user.address.details}` : "..."}/>
          <label>Neighborhood</label>
          <input type="text" name="neighborhood" onChange={handleChange} placeholder={user.address? `${user.address.neighborhood}` : "..."}/>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Upload Image</h3>
          <input type="file" name="avatar" accept="image/*" onChange={handleFileChange} />
        </div>
        <button type="submit" className={styles.button}>
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUserForm;