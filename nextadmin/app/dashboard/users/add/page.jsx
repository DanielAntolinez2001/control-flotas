"use client";

import React, { useState } from "react";
import { createUser, redirectMain } from "@/app/lib/users";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";

const AddUserPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
    active: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    details: "",
    neighborhood: "",
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm("Are you sure you want to create this user?");
    if (isConfirmed) {
      const form = new FormData();
      for (const key in formData) {
        form.append(key, formData[key]);
      }
      if (selectedFile) {
        form.append("avatar", selectedFile);
      }
      await createUser(form);
    }else
      redirectMain();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" name="name" id="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input type="text" name="lastname" id="lastname" placeholder="Lastname" value={formData.lastname} onChange={handleChange} />
        <input type="email" name="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" id="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <select name="role" id="role" value={formData.role} onChange={handleChange}>
          <option value="">Role</option>
          <option value="admin">Administrator</option>
          <option value="driver">Driver</option>
        </select>
        <select name="active" id="active" value={formData.active} onChange={handleChange}>
          <option value="">Is Active?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <div className={styles.address}>
          <h3>Address</h3>
          <input type="text" name="street" placeholder="Address" value={formData.street} onChange={handleChange} />
          <input type="text" name="neighborhood" placeholder="Neighborhood" value={formData.neighborhood} onChange={handleChange} />
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
          <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
          <input type="text" name="zip_code" placeholder="Zip Code" value={formData.zip_code} onChange={handleChange} />
          <input type="text" name="details" placeholder="Details" value={formData.details} onChange={handleChange} />
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Upload Image</h3>
          <input type="file" name="avatar" accept="image/*" onChange={handleFileChange} />
        </div>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;