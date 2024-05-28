"use client";

import { useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/trucks/singleTruck/singleTruck.module.css";
import { getTruckAndComponents } from "@/app/lib/trucks";
import React from "react";
import TruckDetails from "./page2";

const SingleTruckPage = ({ params }) => {
  const { id } = params;
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (id) {
      getTruckAndComponents(id).then(setDetails);
    }
  }, [id]);

  return (
    <div className={styles.container}>
      {details ? <TruckDetails details={details} /> : <p>Loading...</p>}
    </div>
  );
};

export default SingleTruckPage;
