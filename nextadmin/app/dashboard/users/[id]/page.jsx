"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";
import { getUSerById } from "@/app/lib/users";
import UpdateUserForm from "@/app/dashboard/users/[id]/page2";

const SingleUserPage = ({ params }) => {
  const { id } = params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      getUSerById(id)
        .then((userData) => setUser(userData))
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={user.avatar || "/noavatar.png"} alt="" fill />
        </div>
        {user.name}
      </div>
      <UpdateUserForm user={user} />
    </div>
  );
};

export default SingleUserPage;
