"use client"

import React, { useEffect, useState, useMemo } from "react";
import styles from "./rightbar.module.css";
import Image from "next/image";
import { MdPlayCircleFilled } from "react-icons/md";
import { isTimeToChangeTires } from "@/app/lib/tire";
import { getPendingMaintenances } from "@/app/lib/maintenance";
import Link from "next/link";
import { getAvailableTrucks } from "@/app/lib/trucks";

const RightBar = () => {
  const [tireData, setTireData] = useState([]);
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [truckData, setTruckData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await isTimeToChangeTires();
        const data2 = await getPendingMaintenances();
        const data3 = await getAvailableTrucks();
        setTireData(data);
        setMaintenanceData(data2);
        setTruckData(data3);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const memoizedTireData = useMemo(() => tireData, [tireData]);
  const memoizedMaintenanceData = useMemo(() => maintenanceData, [maintenanceData]);
  const memoizedTruckData = useMemo(() => truckData, [truckData]);

  return (
    <div className={styles.container}>
      <div className={styles.scrollContainer}>
        <div className={styles.innerContainer}>
          {memoizedTireData.length > 0 ? (
            memoizedTireData.map((tire) => (
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
            <div className={styles.item}>
                <div className={styles.bgContainer}>
                  <Image src="/astronaut.png" alt="" fill className={styles.bg} />
                </div>
                <div className={styles.text}>
                  <span className={styles.notification}>Change Neumatics Alert</span>
                  <span className={styles.subtitle}>Urgent Notification</span>
                  <p className={styles.description}> {`No tires change soon`} </p>
                </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.scrollContainer}>
        <div className={styles.innerContainer}>
          {memoizedMaintenanceData.length > 0 ? (
            memoizedMaintenanceData.map((maintenance) => (
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
                  <Link href={`/dashboard/maintenances/${maintenance.id}/update`}>
                    <button className={styles.button}>
                      <MdPlayCircleFilled />
                      Watch Maintenance
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.item}>
                <div className={styles.bgContainer}>
                  <Image src="/astronaut.png" alt="" fill className={styles.bg} />
                </div>
                <div className={styles.text}>
                  <span className={styles.notification}>Maintenance Alert</span>
                  <span className={styles.subtitle}>Urgent Notification</span>
                  <p className={styles.description}> {`No schedule maintenances now`} </p>
                </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.scrollContainer}>
        <div className={styles.innerContainer}>
          {memoizedTruckData.length > 0 ? (
            memoizedTruckData.map((truck) => (
              <div key={truck.id} className={styles.item}>
                <div className={styles.bgContainer}>
                  <Image src="/astronaut.png" alt="" fill className={styles.bg} />
                </div>
                <div className={styles.text}>
                  <span className={styles.notification}>Truck Alert</span>
                  <h3 className={styles.title}>Truck available!</h3> 
                  <span className={styles.subtitle}>Urgent Notification</span>
                  <p className={styles.description}>
                    {`Truck ${truck.truckLicense} is available to carry out a route`}
                  </p>
                  <Link href={`/dashboard/trucks/${truck.id}/components`}>
                    <button className={styles.button}>
                      <MdPlayCircleFilled />
                      Watch Truck
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.item}>
                <div className={styles.bgContainer}>
                  <Image src="/astronaut.png" alt="" fill className={styles.bg} />
                </div>
                <div className={styles.text}>
                  <span className={styles.notification}>Truck Alert</span>
                  <span className={styles.subtitle}>Urgent Notification</span>
                  <p className={styles.description}> {`No trucks available now`} </p>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
