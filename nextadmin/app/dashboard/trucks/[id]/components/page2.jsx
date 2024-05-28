import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/dashboard/trucks/[id]/components/viewTruck.module.css";

const TruckDetails = ({ details }) => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={details.truck.avatar || "/avatarCamion.jpg"} alt="" fill />
        </div>
      </div>
      <div className={styles.container}>
        <form className={styles.form}>
          <div className={styles.section}>
            <h2>Truck Details</h2>
            
            <div className={styles.inputGroup}>
              
              <div className={styles.inputWrapper}>
                <label>License Plate</label>
                <input type="text" value={details.truck.license_plate} readOnly />
              </div>

              <div className={styles.inputWrapper}>
                <label className={styles.subtitle}>Brand</label>
                <input type="text" value={details.truck.brand} readOnly />
              </div>

              <div className={styles.inputWrapper}>
                <label>Model</label>
                <input type="number" value={details.truck.model} readOnly />
              </div>

              <div className={styles.inputWrapper}>
                <label>Status</label>
                <input type="text" value={details.truck.status} readOnly />
              </div>
            </div>

            <h3>Fluids System</h3>
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <label>Direction Fluid Level</label>
                <input type="text" value={details.fluidsSystem?.[0]?.direction_fluid_level || ''} readOnly />
              </div>

              <div className={styles.inputWrapper}>
                <label>Brake Fluid Level</label>
                <input type="text" value={details.fluidsSystem?.[0]?.brake_fluid_level || ''} readOnly />
              </div>

              <div className={styles.inputWrapper}>
                <label>Coolant Fluid Level</label>
                <input type="text" value={details.fluidsSystem?.[0]?.coolant_fluid_level || ''} readOnly />
              </div>

              <div className={styles.inputWrapper}>
                <label>Wiper Fluid Level</label>
                <input type="text" value={details.fluidsSystem?.[0]?.wiper_fluid_level || ''} readOnly />
              </div>
            </div>

            <h3>Body and Chassis</h3>
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <label>Chassis Condition</label>
                <input type="text" value={details.bodyChassis?.[0]?.chassis_condition || ''} readOnly />
              </div>

              <div className={styles.inputWrapper}>
                <label>Body Condition</label>
                <input type="text" value={details.bodyChassis?.[0]?.body_condition || ''} readOnly />
              </div>

              <div className={styles.inputWrapper}>
                <label>Seatbelt Functionality</label>
                <input type="text" value={details.bodyChassis?.[0]?.seatbelt_functionality || ''} readOnly />
              </div>
            </div>

            <h3>Electrical System</h3>
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <label>Battery Status</label>
                <input type="text" value={details.electricalSystem?.[0]?.battery_status || ''} readOnly />
              </div>

              <div className={styles.inputWrapper}>
                <label>Lights Functionality</label>
                <input type="text" value={details.electricalSystem?.[0]?.lights_functionality || ''} readOnly />
              </div>

              <div className={styles.inputWrapper}>
                <label>Fuse Status</label>
                <input type="text" value={details.electricalSystem?.[0]?.fuse_status || ''} readOnly />
              </div>
            </div>

            <h3>Brakes</h3>
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <label>Pads Condition</label>
                <input type="text" value={details.brakes?.[0]?.pads_condition || ''} readOnly />
              </div>

              <div className={styles.inputWrapper}>
                <label>Discs Condition</label>
                <input type="text" value={details.brakes?.[0]?.discs_condition || ''} readOnly />
              </div>

              <div className={styles.inputWrapper}>
                <label>Fluid Level</label>
                <input type="text" value={details.brakes?.[0]?.fluid_level || ''} readOnly />
              </div>
            </div>

            <h3>Exhaust System</h3>
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <label>Pipes Condition</label>
                <input type="text" value={details.exhaustSystem?.[0]?.pipes_condition || ''} readOnly />
              </div>

              <div className={styles.inputWrapper}>
                <label>Mufflers Condition</label>
                <input type="text" value={details.exhaustSystem?.[0]?.mufflers_condition || ''} readOnly />
              </div>

              <div className={styles.inputWrapper}>
                <label>Leak Detection</label>
                <input type="text" value={details.exhaustSystem?.[0]?.leak_detection ? 'Yes' : 'No'} readOnly />
              </div>
            </div>

            <h3>Tire</h3>
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <label>Brand</label>
                <input type="text" value={details.tire?.[0]?.brand || ''} readOnly />
              </div>

              <div className={styles.inputWrapper}>
                <label>Status</label>
                <input type="text" value={details.tire?.[0]?.status || ''} readOnly />
              </div>

              <div className={styles.inputWrapper}>
                <label>Model</label>
                <input type="text" value={details.tire?.[0]?.model || ''} readOnly />
              </div>

              <div className={styles.inputWrapper}>
                <label>Mileage</label>
                <input type="number" value={details.tire?.[0]?.mileage || 0} readOnly />
              </div>

              <div className={styles.inputWrapper}>
                <label>Rotation Pattern</label>
                <input type="text" value={details.tire?.[0]?.rotation_pattern || ''} readOnly />
              </div>
            </div>

            <h3>Fuel</h3>
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <label>Amount</label>
                <input type="text" value={details.fuel?.amount || ''} readOnly />
              </div>

              <div className={styles.inputWrapper}>
                <label>Cost</label>
                <input type="text" value={details.fuel?.cost || ''} readOnly />
              </div>

              <div className={styles.inputWrapper}>
                <label>Efficiency</label>
                <input type="text" value={details.fuel?.efficienncy || ''} readOnly />
              </div>

              <div className={styles.inputWrapper}>
                <label>Created</label>
                <input type="text" value={details.fuel?.createdAt || 0} readOnly />
              </div>
            </div>
          </div>
        </form>
        <Link href={`/dashboard/trucks/${details.truck.id}/fuels`}>
          <button className={`${styles.buttom} ${styles.view}`}>
              Fuels
          </button>
        </Link>
        <Link href={`/dashboard/trucks/${details.truck.id}/exception`}>
          <button className={`${styles.buttom} ${styles.view}`}>
              Create Exception
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TruckDetails;
