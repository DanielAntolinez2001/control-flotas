"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import ReportPage from "@/app/dashboard/maintenances/[id]/page2";
import { getMaintenanceForReport } from "@/app/lib/maintenance";

const SingleMaintennacePage = ({ params }) => {
  const { id } = params;
  const [maintenance, setmaintenance] = useState(null); 

  useEffect(() => {
    if (id) {
      getMaintenanceForReport(id)
        .then((maintenanceData) => setmaintenance(maintenanceData))
        .catch((error) => {
          console.error("Error fetching maintenance data:", error);
        });
    }
  }, [id]);

  if (!maintenance) {
    return <div>Loading...</div>; 
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        {maintenance.description}
      </div>
      <ReportPage maintenance={maintenance} />
    </div>
  );
};

export default SingleMaintennacePage;