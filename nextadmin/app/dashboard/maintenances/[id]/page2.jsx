"use client";

import React, { useState, useEffect } from 'react';
import styles from "@/app/dashboard/maintenances/[id]/maintenance.module.css";
import { createReport } from '@/app/lib/ReportController';

const ReportPage = ({ maintenance }) => {
  const [report, setReport] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [alerts2, setAlerts2] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await createReport(maintenance.id);
        console.log('Report fetched:', response); // Debug log
        setReport(response);

        // Generate alerts based on the report content
        const newAlerts = [];
        const newAlerts2 = [];
        const lines = response[0].content.split('\n');
        lines.forEach(line => {
          if (
            line.includes('NonFunctional') ||
            line.includes('Damaged') ||
            line.includes('Refill') ||
            line.includes('NeedsReplacement') ||
            line.includes('Leaking') ||
            line.includes('Rusty') ||
            line.includes('Empty') ||
            line.includes('Dead') ||
            line.includes('true') ||
            line.includes('Replace') ||
            line.includes('Change')
          ) {
            newAlerts.push(line);
          }
          if (
            line.includes('Worn') ||
            line.includes('Low') ||
            line.includes('PartiallyFunctional') ||
            line.includes('WornOut') ||
            line.includes('Weak')
          ) {
            newAlerts2.push(line);
          }
        });
        setAlerts(newAlerts);
        setAlerts2(newAlerts2);

      } catch (err) {
        console.error(`Error fetching report: ${err.message}`);
        setError('Failed to fetch report');
      }
    };

    if (maintenance.id) {
      fetchReport();
    }
  }, [maintenance.id]); // Adding dependency

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
      </div>
      <div>
        <h1>Alertas</h1>
        <div className={styles.alertsSection}>
          {alerts.length > 0 ? (
            alerts.map((alert, index) => (
              <div key={index} className={styles.alertCard}>
                <p>{alert}</p>
              </div>
            ))
          ) : (
            <p>No alerts found.</p>
          )}

          {alerts2.length > 0 ? (
            alerts2.map((alert, index) => (
              <div key={index} className={styles.alertCard2}>
                <p>{alert}</p>
              </div>
            ))
          ) : (
            <p>No alerts found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
