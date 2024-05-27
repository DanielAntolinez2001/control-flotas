"use client";

import React, { useState } from "react";
import styles from "@/app/ui/dashboard/trucks/addTruck/addTruck.module.css";
import { getTireById } from "@/app/lib/tire";
import ChangeTireForm from "./page2";

const ChangeTire= async ({ params }) => {
  const { id } = params;
  const tire = await getTireById(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        {tire.truck? `${tire.truck.license_plate}`: null}
      </div>
      <ChangeTireForm tire={tire} />
    </div>
  );
};

export default ChangeTire;