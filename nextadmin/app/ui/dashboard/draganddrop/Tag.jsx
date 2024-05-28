import React from "react";

import styles from "./Tag.module.css";

const Tag = ({ tagName, selectTag, selected }) => {
  const tagStyle = {
    TireMaintenance: { backgroundColor: "#fda821" },
    FuelMaintenance: { backgroundColor: "#15d4c8" },
    GeneralMaintenance: { backgroundColor: "#ffd12c" },
    Send: { backgroundColor: "#4cdafc" },
    default: { backgroundColor: "#f9f9f9" },
  };
  return (
    <button
      type="button"
      className={styles.tag}
      style={selected ? tagStyle[tagName] : tagStyle.default}
      onClick={() => selectTag(tagName)}
    >
      {tagName}
    </button>
  );
};

export default Tag;
