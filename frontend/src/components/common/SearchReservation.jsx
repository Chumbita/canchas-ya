import React, { useState } from "react";
import SelectSport from "./SelectSport";
import SelectTime from "./SelectTime";
import SelectDate from "./SelectDate";
import styles from "./SearchReservation.module.css";
import btnStyle from "../../styles/base/Button.module.css";
import voleyballIcon from "../../assets/icons/volleyball-icon.svg";
import calendarIcon from "../../assets/icons/calendar-icon.svg";
import clockIcon from "../../assets/icons/clock2-icon.svg";

export default function SearchReservation() {
  const [sport, setSport] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");

  // Validación que todos los campos estén completos
  const isFormValid = sport && date && time;
  
  return (
    <div className={styles["container"]}>
      <form className={styles["form"]}>
        <section className={styles["form__field"]}>
          <i className={styles["form__icon"]}>
            <img width="48" height="48" src={voleyballIcon} alt="voleyball" />
          </i>
          <div className={styles["form__control"]}>
            <SelectSport value={sport} onChange={(value) => setSport(value)}/>
          </div>
        </section>
        <section className={styles["form__field"]}>
          <i className={styles["form__icon"]}>
            <img src={calendarIcon} alt="calendario" />
          </i>
          <div className={styles["form__control"]}>
            <SelectDate value={date} onChange={(value) => setDate(value)}/>
          </div>
        </section>
        <section className={styles["form__field"]}>
          <i className={styles["form__icon"]}>
            <img src={clockIcon} alt="reloj" />
          </i>
          <div className={styles["form__control"]}>
            <SelectTime value={time} onChange={(value) => setTime(value)}/>
          </div>
        </section>
        <button
          type="submit"
          className={`${btnStyle["btn"]} ${btnStyle["btn-primary"]}`}
          disabled={!isFormValid}
        >
          Buscar
        </button>
      </form>
    </div>
  );
}
