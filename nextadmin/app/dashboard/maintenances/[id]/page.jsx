"use client";

import React from "react";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import ReportPage from "@/app/dashboard/maintenances/[id]/page2";
import { getMaintenanceForReport } from "@/app/lib/maintenance";

const SingleMaintennacePage = async ({ params }) => {
  const { id } = params;
  const maintenance = await getMaintenanceForReport(id);

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