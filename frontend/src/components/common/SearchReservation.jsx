import React from 'react'
import styles from "./SearchReservation.module.css"
import sportIcon from "../../assets/icons/sport-icon.png"
import calendarIcon from "../../assets/icons/calendar-icon.png"
import timeIcon from "../../assets/icons/time-icon.png"
import btnStyle from "../../styles/base/Button.module.css"

export default function SearchReservation() {
  return (
    <div className={styles["container"]}>
      <form className={styles["form"]}>
        <section className={styles["form__field"]}>
          <i className={styles["form__icon"]}><img src={sportIcon}/></i>
          <div className={styles["form__control"]}>
            <select className={styles["form__select"]} name="sport">
              <option value="" disabled selected hidden>¿Qué querés jugar?</option>
              <option value="futbol-5">Fútbol 5</option>
              <option value="futbol-6">Fútbol 6</option>
              <option value="futbol-8">Fútbol 8</option>
              <option value="fultbol-11">Fútbol 11</option>
              <option value="tenis">Tenis</option>
              <option value="padel">Padel</option>
              <option value="basquet-3">Básquet 3x3</option>
              <option value="basquet-5">Básquet 5x5</option>
            </select>
          </div>
        </section>
        <section className={styles["form__field"]}>
          <i className={styles["form__icon"]}><img src={calendarIcon}/></i>
          <div className={styles["form__control"]}>
            {/* <label className={styles["form__label"]}>Día</label> */}
            <input type="date" placeholder='¿Cuándo?' className={styles["form__input-date"]} defaultValue={new Date().toISOString().split('T')[0]}/>
          </div>
        </section>
        <section className={styles["form__field"]}>
          <i className={styles["form__icon"]}><img src={timeIcon}/></i>
          <div className={styles["form__control"]}>
            {/* <label className={styles["form__label"]}>Día</label> */}
            <select className={styles["form__select"]} name="sport">
              <option value="" disabled selected hidden>¿A qué hora?</option>
              <option value="17">17:00</option>
              <option value="18">18:00</option>
              <option value="19">19:00</option>
              <option value="20">20:00</option>
              <option value="21">21:00</option>
              <option value="22">22:00</option>
              <option value="23">23:00</option>
              <option value="00">00:00</option>
            </select>
          </div>
        </section>
        <button type='submit' className={`${btnStyle["btn"]} ${btnStyle["btn-primary"]}`}>Buscar</button>
      </form>
    </div>
  )
}
