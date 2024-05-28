"use client";

import React, { useState, useEffect } from "react";
import { createUser, redirectMain } from "@/app/lib/users";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";

const AddUserPage = () => {
  const [departments, setDepartments] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
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

  useEffect(() => {
    const fetchDepartments = async () => {
      let departmentsData = localStorage.getItem("departments");
      if (departmentsData) {
        setDepartments(JSON.parse(departmentsData));
      } else {
        const response = await fetch(
          "https://www.datos.gov.co/resource/xdk5-pm3f.json"
        );
        const data = await response.json();
        const uniqueDepartments = [
          ...new Set(data.map((item) => item.departamento)),
        ].sort();
        setDepartments(uniqueDepartments);
        localStorage.setItem("departments", JSON.stringify(uniqueDepartments));
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchMunicipalities = async () => {
      if (selectedDepartment) {
        let municipalitiesData = localStorage.getItem(
          `municipalities_${selectedDepartment}`
        );
        if (municipalitiesData) {
          setMunicipalities(JSON.parse(municipalitiesData));
        } else {
          const response = await fetch(
            `https://www.datos.gov.co/resource/xdk5-pm3f.json?departamento=${selectedDepartment}`
          );
          const data = await response.json();
          const departmentMunicipalities = data
            .map((item) => item.municipio)
            .sort();
          setMunicipalities(departmentMunicipalities);
          localStorage.setItem(
            `municipalities_${selectedDepartment}`,
            JSON.stringify(departmentMunicipalities)
          );
        }
      } else {
        setMunicipalities([]);
      }
    };

    fetchMunicipalities();
  }, [selectedDepartment]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setFormData({
      ...formData,
      state: e.target.value,
      city: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      "Are you sure you want to create this user?"
    );
    if (isConfirmed) {
      const form = new FormData();
      for (const key in formData) {
        form.append(key, formData[key]);
      }
      if (selectedFile) {
        form.append("avatar", selectedFile);
      }

      const result = await createUser(form);
      if (result && result.error) {
        window.confirm(result.error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Lastname"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          id="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Role</option>
          <option value="admin">Administrator</option>
          <option value="driver">Driver</option>
        </select>
        <select
          name="active"
          id="active"
          value={formData.active}
          onChange={handleChange}
          required
        >
          <option value="">Is Active?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <div className={styles.address}>
          <h3>Address</h3>
          <input
            type="text"
            name="street"
            placeholder="Address"
            value={formData.street}
            onChange={handleChange}
          />
          <input
            type="text"
            name="neighborhood"
            placeholder="Neighborhood"
            value={formData.neighborhood}
            onChange={handleChange}
          />
          <select
            name="state"
            id="state"
            value={formData.state}
            onChange={handleDepartmentChange}
          >
            <option value="">Select State</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
          <select
            name="city"
            id="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!selectedDepartment}
          >
            <option value="">Select City</option>
            {municipalities.map((municipality) => (
              <option key={municipality} value={municipality}>
                {municipality}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="zip_code"
            placeholder="Zip Code"
            value={formData.zip_code}
            onChange={handleChange}
          />
          <input
            type="text"
            name="details"
            placeholder="Details"
            value={formData.details}
            onChange={handleChange}
          />
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Upload Image</h3>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;
