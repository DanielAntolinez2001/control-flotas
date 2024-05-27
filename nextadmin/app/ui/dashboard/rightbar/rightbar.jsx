"use client"

import React, { useEffect, useState } from "react";
import styles from "./rightbar.module.css";
import Image from "next/image";
import { MdPlayCircleFilled } from "react-icons/md";
import { isTimeToChangeTires } from "@/app/lib/tire";

const RightBar = () => {
  const [tireData, setTireData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await isTimeToChangeTires();
        setTireData(data);
      } catch (error) {
        console.error("Error fetching tire data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      {tireData.length > 0 ? (
        tireData.map((tire) => (
          <div key={tire.tireId} className={styles.item}>
            <div className={styles.bgContainer}>
              <Image src="/astronaut.png" alt="" fill className={styles.bg} />
            </div>
            <div className={styles.text}>
              <span className={styles.notification}>Maintenance Alert</span>
              <h3 className={styles.title}>It's time to change your tires!</h3>
              <span className={styles.subtitle}>Urgent Notification</span>
              <p className={styles.description}>
                {`Truck ${tire.truckLicense} has already traveled ${tire.mileage} mileage. ${
                  tire.shouldChangeTires
                    ? "It's time to change the tires."
                    : "The tires are still good."
                }`}
              </p>
              <button className={styles.button}>
                <MdPlayCircleFilled />
                Watch Truck
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No tire changes soon</p>
      )}
    </div>
  );
};

export default RightBar;
