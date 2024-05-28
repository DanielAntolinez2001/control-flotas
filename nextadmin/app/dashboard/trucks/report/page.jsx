"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/dashboard/maintenances/[id]/maintenance.module.css";
import styless from "@/app/ui/dashboard/trucks/addTruck/addTruck.module.css";
import { createReportFuel } from "@/app/lib/ReportController";
import Link from "next/link";

const ReportPage = ({}) => {
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await createReportFuel();
        console.log("Report fetched:", response);
        setReport(response);
      } catch (err) {
        console.error(`Error fetching report: ${err.message}`);
        setError("Failed to fetch report");
      }
    };

    fetchReport();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!report) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.reportSection}>
        <pre className={styles.reportContent}>{report[0].content}</pre>
        <Link href={`/dashboard/trucks`}>
            <button type="submit" className={styless.button}>
            Back
            </button>
        </Link>
      </div>
    </div>
  );
};

export default ReportPage;
