import React from "react";
import Card from "../ui/dashboard/card/page";
import styles from "../ui/dashboard/dashboard.module.css";
import RightBar from "../ui/dashboard/rightbar/rightbar";
import Chart from "../ui/dashboard/chart/chart";
import Maintenance from "../ui/dashboard/maintenance/maintenance";

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card />
        </div>
        <Maintenance />
        <Chart />
      </div>
      <div className={styles.side}>
        <RightBar />
      </div>
    </div>
  );
};

export default Dashboard;
