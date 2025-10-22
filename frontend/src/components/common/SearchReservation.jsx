import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectSport from "./SelectSport";
import SelectTime from "./SelectTime";
import SelectDate from "./SelectDate";
import styles from "./SearchReservation.module.css";
import btnStyle from "../../styles/base/Button.module.css";
import voleyballIcon from "../../assets/icons/volleyball-icon.svg";
import calendarIcon from "../../assets/icons/calendar-icon.svg";
import clockIcon from "../../assets/icons/clock2-icon.svg";

export default function SearchReservation({ onSearch }) {
  const navigate = useNavigate();
  const [sport, setSport] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");

  // Validación que todos los campos estén completos
  const isFormValid = sport && date && time;

  const handleSearch = (e) => {
    e.preventDefault();
    if (isFormValid) {
      // Construir parámetros de búsqueda
      const searchData = {
        sport: sport.value || sport,
        date: date.toISOString().split('T')[0],
        time: time.value || time
      };
      
      if (onSearch) {
        // Si hay función onSearch, usarla (para SearchResults)
        onSearch(searchData);
      } else {
        // Si no, navegar a la página de resultados (para Home)
        const params = new URLSearchParams();
        params.set('sport', searchData.sport);
        params.set('date', searchData.date);
        params.set('time', searchData.time);
        navigate(`/search?${params.toString()}`);
      }
    }
  };
  
  return (
    <div className={styles["container"]}>
      <form className={styles["form"]} onSubmit={handleSearch}>
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
