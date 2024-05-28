"use client";

import React from "react";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";
import { getUSerById } from "@/app/lib/users";
import UpdateUserForm from "@/app/dashboard/users/[id]/page2";

const SingleUserPage = async ({ params }) => {
  const { id } = params;
  const user = await getUSerById(id);

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
