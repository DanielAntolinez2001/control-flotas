"use client";

import React, { useEffect, useState } from "react";
import Card from "@/app/ui/dashboard/card/card";
import styles from "./Exception.module.css";
import { getPendingException } from "@/app/lib/maintenance";

const PendingExceptionsList = () => {
  const [exceptions, setExceptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      getPendingException()
        .then((exceptionData) => setExceptions(exceptionData))
        .catch((error) => {
          console.error("Error fetching maintenance data:", error);
        });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }

  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.listContainer}>
      {exceptions.map((exception) => (
        <Card
          key={exception.id}
          truckLicense={exception.truckLicense}
          truckid={exception.truckid}
          id={exception.id}
          description={exception.description}
        />
      ))}
    </div>
  );
};

export default PendingExceptionsList;
