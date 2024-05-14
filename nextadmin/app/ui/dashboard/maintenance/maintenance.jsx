import React from "react";
import styles from "./maintenance.module.css";
import Image from "next/image";

const Maintenance = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Operations</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Plaque</td>
            <td>Status</td>
            <td>Date</td>
            <td>Model</td>
            <td>Branch</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                AAA 111
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                Pending
              </span>
            </td>
            <td>2024, 13 May</td>
            <td>2004</td>
            <td>Chevrolet</td>
            <td>$240.000</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                AAA 111
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.done}`}>Done</span>
            </td>
            <td>2024, 13 May</td>
            <td>2004</td>
            <td>Chevrolet</td>
            <td>$240.000</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                AAA 111
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.cancelled}`}>
                Cancelled
              </span>
            </td>
            <td>2024, 13 May</td>
            <td>2004</td>
            <td>Chevrolet</td>
            <td>$240.000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Maintenance;
