import React from "react";
import styles from "./Tag.module.css";

const Tag = ({ tagName, selectTag, selected }) => {
  const tagStyle = {
    default: { backgroundColor: "gray" },
    "Tire Maintenance": { backgroundColor: "#fda821" },
    "Fuel Maintenance": { backgroundColor: "#15d4c8" },
    "General Maintenance": { backgroundColor: "#ffd12c" },
    Send: { backgroundColor: "#4cdafc" },
  };

  return (
    <button
      className={styles.tag}
      style={selected ? tagStyle[tagName] : tagStyle.default}
      onClick={() => selectTag(tagName)}
    >
      {tagName}
    </button>
  );
};

export default Tag;
