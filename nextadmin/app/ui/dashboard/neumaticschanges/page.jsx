import React, { useState, useEffect } from "react";
import { isTimeToChangeTires } from ".../lib/tire";
import RightBar from "../rightbar/rightbar";

const TireMaintenanceAlert = ({ tireId }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const checkTireMaintenance = async () => {
      try {
        const tireMaintenanceInfo = await isTimeToChangeTires(tireId);
        if (tireMaintenanceInfo.shouldChangeTires) {
          setShowAlert(true);
        }
      } catch (error) {
        console.error("Error checking tire maintenance:", error);
      }
    };

    checkTireMaintenance();
  }, [tireId]);

  return <div>{showAlert && <RightBar />}</div>;
};

export default TireMaintenanceAlert;
