"use client"

import React, { useEffect, useState } from "react";
import styles from "./rightbar.module.css";
import Image from "next/image";
import { MdPlayCircleFilled } from "react-icons/md";
import { isTimeToChangeTires } from "@/app/lib/tire";
import { getPendingMaintenances } from "@/app/lib/maintenance";
import Link from "next/link";

const RightBar = () => {
  const [tireData, setTireData] = useState([]);
  const [maintenanceData, setMaintenanceData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await isTimeToChangeTires();
        const data2 = await getPendingMaintenances();
        setTireData(data);
        setMaintenanceData(data2);
      } catch (error) {
        console.error("Error fetching tire data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div>
        {tireData.length > 0 ? (
          tireData.map((tire) => (
            <div key={tire.tireId} className={styles.item}>
              <div className={styles.bgContainer}>
                <Image src="/astronaut.png" alt="" fill className={styles.bg} />
              </div>
              <div className={styles.text}>
                <span className={styles.notification}>Change Neumatics Alert</span>
                <h3 className={styles.title}>It's time to change your tires!</h3>
                <span className={styles.subtitle}>Urgent Notification</span>
                <p className={styles.description}>
                  {`Truck ${tire.truckLicense} has already traveled ${tire.mileage} mileage. ${
                    tire.shouldChangeTires
                      ? "It's time to change the tires."
                      : "The tires are still good."
                  }`}
                </p>
                <Link href={`/dashboard/tires/change/${tire.tireId}`}>
                  <button className={styles.button}>
                    <MdPlayCircleFilled />
                    Watch Tires
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No tire changes soon</p>
        )}
      </div>
      <div>
        {maintenanceData.length > 0 ? (
          maintenanceData.map((maintenance) => (
            <div key={maintenance.id} className={styles.item}>
              <div className={styles.bgContainer}>
                <Image src="/astronaut.png" alt="" fill className={styles.bg} />
              </div>
              <div className={styles.text}>
                <span className={styles.notification}>Maintenance Alert</span>
                <h3 className={styles.title}>It's time to do vehicle maintenance!</h3> 
                <span className={styles.subtitle}>Urgent Notification</span>
                <p className={styles.description}>
                  {`Truck ${maintenance.truckLicense} has a maintenance pending. Date: ${maintenance.schedule_m} `}
                </p>
                <Link href={`/dashboard/maintenances/${maintenance.id}`}>
                  <button className={styles.button}>
                    <MdPlayCircleFilled />
                    Watch Maintenance
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No tire changes soon</p>
        )}
      </div>
    </div>
  );
};

export default RightBar;
