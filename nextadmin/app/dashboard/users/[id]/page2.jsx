import React, { useState, useEffect } from "react";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import { redirectMain, updateUser } from "@/app/lib/users";

const UpdateUserForm = ({ user }) => {
  const [departments, setDepartments] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(user.address?.state || "");
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

  useEffect(() => {
    const fetchDepartments = async () => {
      let departmentsData = localStorage.getItem('departments');
      if (departmentsData) {
        setDepartments(JSON.parse(departmentsData));
      } else {
        const response = await fetch("https://www.datos.gov.co/resource/xdk5-pm3f.json");
        const data = await response.json();
        const uniqueDepartments = [...new Set(data.map(item => item.departamento))].sort();
        setDepartments(uniqueDepartments);
        localStorage.setItem('departments', JSON.stringify(uniqueDepartments));
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchMunicipalities = async () => {
      if (selectedDepartment) {
        let municipalitiesData = localStorage.getItem(`municipalities_${selectedDepartment}`);
        if (municipalitiesData) {
          setMunicipalities(JSON.parse(municipalitiesData));
        } else {
          const response = await fetch(`https://www.datos.gov.co/resource/xdk5-pm3f.json?departamento=${selectedDepartment}`);
          const data = await response.json();
          const departmentMunicipalities = data.map(item => item.municipio).sort();
          setMunicipalities(departmentMunicipalities);
          localStorage.setItem(`municipalities_${selectedDepartment}`, JSON.stringify(departmentMunicipalities));
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

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    setFormData({
      ...formData,
      state: event.target.value,
      city: "",
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
    } else {
      redirectMain();
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={user.name} />
        <label>Lastname</label>
        <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} placeholder={user.lastname} />
        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        <div className={styles.address}>
          <label>Street</label>
          <input type="text" name="street" value={formData.street} onChange={handleChange} placeholder={user.address ? user.address.street : "..."} />
          <label>State</label>
          <select name="state" value={formData.state} onChange={handleDepartmentChange}>
            <option value="">Select State</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
          <label>City</label>
          <select name="city" value={formData.city} onChange={handleChange} disabled={!selectedDepartment}>
            <option value="">Select City</option>
            {municipalities.map((municipality) => (
              <option key={municipality} value={municipality}>
                {municipality}
              </option>
            ))}
          </select>
          <label>Neighborhood</label>
          <input type="text" name="neighborhood" value={formData.neighborhood} onChange={handleChange} placeholder={user.address ? user.address.neighborhood : "..."} />
          <label>Zip Code</label>
          <input type="text" name="zip_code" value={formData.zip_code} onChange={handleChange} placeholder={user.address ? user.address.zip_code : "..."} />
          <label>Details</label>
          <input type="text" name="details" value={formData.details} onChange={handleChange} placeholder={user.address ? user.address.details : "..."} />
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