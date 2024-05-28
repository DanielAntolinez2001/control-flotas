import React from "react";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdOutlineSupervisedUserCircle,
  MdFireTruck,
  MdHelpCenter,
  MdSettings,
  MdLogout,
  MdMap,
  MdTask,
  MdTireRepair,
  MdDomainVerification,
} from "react-icons/md";
import MenuLink from "./menuLink/menuLink";
import Image from "next/image";
import { signOut, auth } from "@/app/auth";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdOutlineSupervisedUserCircle />,
      },
      {
        title: "Trucks",
        path: "/dashboard/trucks",
        icon: <MdFireTruck />,
      },
      {
        title: "Tasks",
        path: "/dashboard/tasks",
        icon: <MdTask />,
      },
      {
        title: "Map",
        path: "/dashboard/map",
        icon: <MdMap />,
      },
    ],
  },
  {
    title: "Maintenance",
    list: [
      {
        title: "Maintenances",
        path: "/dashboard/maintenances",
        icon: <MdDomainVerification />,
      },
      {
        title: "Tires",
        path: "/dashboard/tires",
        icon: <MdTireRepair />,
      },
    ],
  },
];

const Sidebar = async () => {
  const session = await auth();
  console.log(session);
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src={session.user.avatar || "/noavatar.png"}
          alt=""
          width="50"
          height="50"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>{session.user.name}</span>
          <span className={styles.userTitle}>Admin</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((category) => (
          <li key={category.title}>
            <span className={styles.category}>{category.title}</span>
            {category.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className={styles.logout}>
          <MdLogout />
          Logout
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
