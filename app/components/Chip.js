import React from "react";
import "./Chip.css";

const Chip = ({ upcoming, success }) => {
  return (
    <span
      className={`chip ${
        upcoming ? "upcoming" : success ? "success" : "failed"
      }`}
    >
      {upcoming ? "Upcoming" : success ? "Success" : "Failed"}
    </span>
  );
};

export default Chip;
