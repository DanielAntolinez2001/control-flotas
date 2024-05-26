"use client";

import React from "react";
import styles from "@/app/ui/dashboard/trucks/singleTruck/singleTruck.module.css";
import Image from "next/image";
import { getTruckById } from "@/app/lib/trucks";
import UpdateTruckForm from "@/app/dashboard/trucks/[id]/page2";

const SingleTruckPage = async ({ params }) => {
  const { id } = params;
  const truck = await getTruckById(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={truck.avatar || "/noavatar.png"} alt="" fill />
        </div>
        {truck.license_plate}
      </div>
      <UpdateTruckForm truck={truck} />
    </div>
  );
};

export default SingleTruckPage;