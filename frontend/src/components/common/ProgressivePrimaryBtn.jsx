import { useState } from "react";
import styles from "./ProgressivePrimaryBtn.module.css";

export default function ProgressivePrimaryBtn({ label = "Continuar", loading }) {
  return (
    <button type="submit" className={styles["progress-btn"]} disabled={loading}>
      <span className={styles["btn-text"]}>
        {label}
      </span>
      <div
        className={styles["progress-fill"]}
        style={{ width: loading ? "100%" : "0%" }}
      ></div>
    </button>
  );
}

