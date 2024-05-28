"use client";

import React, { useEffect, useState } from "react";
import Card from "./Card";
import styles from "./Exception.module.css";
import { getPendingException } from "@/app/lib/maintenance";

const PendingExceptionsList = () => {
  const [exceptions, setExceptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExceptions = async () => {
      try {
        const response = await getPendingException();
        setExceptions(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExceptions();
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
