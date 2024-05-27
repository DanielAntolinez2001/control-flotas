"use client";

import { useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/trucks/trucks.module.css";
import { deleteFuel, getFuelByTruck } from "@/app/lib/FuelController";
import { getTruckById } from "@/app/lib/trucks";
import Link from "next/link";

const FuelsPage = ({ params }) => {
  const { id } = params;
  const [truck, setTruck] = useState([]);
  const [fuels, setFuels] = useState([]);

  useEffect(() => {
    if (id) {
      getFuelByTruck(id).then(setFuels);
      getTruckById(id).then(setTruck);
    }
  }, [id]);

  const handleDelete = async (idF) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this fuel log?"
    );
    if (isConfirmed) {
      await deleteFuel(idF);
      setFuels(fuels.filter((fuel) => fuel.id !== idF));
    }
  };

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h2>Fuels for Truck {truck.license_plate}</h2>
        <Link href={`/dashboard/trucks/${truck.id}/fuels/add`}>
          <button className={styles.addButtom}>Add Fuel</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>id</td>
            <td>Amount</td>
            <td>Cost</td>
            <td>Efficiency</td>
            <td>Date on</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {fuels.map((fuel) => (
            <tr key={fuel.id}>
              <td>
                <div className={styles.fuel}>{fuel.id}</div>
              </td>
              <td>{fuel.amount}</td>
              <td>{fuel.cost}</td>
              <td>{fuel.efficienncy}</td>
              <td>{fuel.createdAt.toString().slice(4, 16)}</td>
              <td>
                <div className={styles.buttoms}>
                  <button
                    className={`${styles.buttom} ${styles.delete}`}
                    onClick={() => handleDelete(fuel.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href={`/dashboard/trucks`}>
        <button type="submit" className={styles.buttonBack}>
          Back
        </button>
      </Link>
    </div>
  );
};

export default FuelsPage;
