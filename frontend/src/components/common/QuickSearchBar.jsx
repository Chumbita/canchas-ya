import React from "react";
import styles from "./QuickSearchBar.module.css";
import ButtonStyles from "../../styles/base/Button.module.css";
import InputStyles from "../../styles/base/Inputs.module.css";
import TextStyles from "../../styles/base/Text.module.css";
import SoccerBallIcon from "../../assets/icons/soccer-ball.svg";
import CalendarIcon from "../../assets/icons/calendar.svg";
import ClockIcon from "../../assets/icons/clock.svg";

export default function QuickSearchBar({ onSearch, showTitle = true }) {
  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchData = {
      sport: formData.get('sport'),
      date: formData.get('date'),
      time: formData.get('time')
    };
    onSearch(searchData);
  };

  return (
    <section className={styles.searchSection}>
      <div className={styles.searchContainer}>
        {showTitle && (
          <h2 className={`${TextStyles.textPrimary} ${styles.searchTitle}`}>
            Búsqueda rápida
          </h2>
        )}
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <div className={styles.searchField}>
            <div className={styles.searchFieldIcon}>
              <img
                src={SoccerBallIcon}
                alt="Soccer ball icon"
                width="20"
                height="20"
              />
            </div>
            <select
              name="sport"
              className={`${InputStyles.input} ${styles.searchSelect}`}
              defaultValue=""
            >
              <option value="">Deporte</option>
              <option value="futbol">Fútbol</option>
              <option value="basket">Básquet</option>
              <option value="tenis">Tenis</option>
              <option value="paddle">Paddle</option>
            </select>
          </div>

          <div className={styles.searchField}>
            <div className={styles.searchFieldIcon}>
              <img
                src={CalendarIcon}
                alt="Calendar icon"
                width="20"
                height="20"
              />
            </div>
            <select
              name="date"
              className={`${InputStyles.input} ${styles.searchSelect}`}
              defaultValue=""
            >
              <option value="">Hoy 09/08</option>
              <option value="tomorrow">Mañana 10/08</option>
              <option value="day-after">Pasado mañana 11/08</option>
            </select>
          </div>

          <div className={styles.searchField}>
            <div className={styles.searchFieldIcon}>
              <img
                src={ClockIcon}
                alt="Clock icon"
                width="20"
                height="20"
              />
            </div>
            <select
              name="time"
              className={`${InputStyles.input} ${styles.searchSelect}`}
              defaultValue=""
            >
              <option value="">16:00 hs</option>
              <option value="17:00">17:00 hs</option>
              <option value="18:00">18:00 hs</option>
              <option value="19:00">19:00 hs</option>
              <option value="20:00">20:00 hs</option>
              <option value="21:00">21:00 hs</option>
            </select>
          </div>

          <button
            type="submit"
            className={`${ButtonStyles.btn} ${ButtonStyles.btnPrimary} ${styles.searchButton}`}
          >
            Buscar
          </button>
        </form>
      </div>
    </section>
  );
}
