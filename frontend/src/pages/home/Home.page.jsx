import React from "react";
import styles from "./Home.module.css";
import ButtonStyles from "../../styles/base/Button.module.css";
import InputStyles from "../../styles/base/Inputs.module.css";
import TextStyles from "../../styles/base/Text.module.css";
import SoccerBallIcon from "../../assets/icons/soccer-ball.svg";
import CalendarIcon from "../../assets/icons/calendar.svg";
import ClockIcon from "../../assets/icons/clock.svg";
import ClockFeatureIcon from "../../assets/icons/clock-feature.svg";
import CreditCardIcon from "../../assets/icons/credit-card.svg";
import CheckIcon from "../../assets/icons/check-24-7.svg";

export default function Home() {
  const scrollToSearch = () => {
    const searchSection = document.getElementById('search-section');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1 className={`${TextStyles.textPrimary} ${styles.heroTitle}`}>
              Sacar turno nunca fue tan fácil
            </h1>
            <p className={`${TextStyles.textSecondary} ${styles.heroSubtitle}`}>
              Reservá tu cancha en segundos, y sin complicaciones
            </p>
            <button
              className={`${ButtonStyles.btn} ${ButtonStyles.btnPrimary} ${styles.heroButton}`}
              onClick={scrollToSearch}
            >
              Sacar un turno
            </button>
          </div>
        </div>
      </section>

      {/* Floating Block with Features and Search */}
      <section className={styles.floatingBlock}>
        {/* Features Section */}
        <div className={styles.featuresSection}>
          <div className={styles.featuresContainer}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <img
                  src={ClockFeatureIcon}
                  alt="Clock icon"
                  width="24"
                  height="24"
                />
              </div>
              <h3 className={`${TextStyles.textPrimary} ${styles.featureTitle}`}>
                Reservá en segundos
              </h3>
              <p
                className={`${TextStyles.textSecondary} ${styles.featureDescription}`}
              >
                Encontrá tu cancha ideal sin complicaciones
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <img
                  src={CreditCardIcon}
                  alt="Credit card icon"
                  width="24"
                  height="24"
                />
              </div>
              <h3 className={`${TextStyles.textPrimary} ${styles.featureTitle}`}>
                Pagá como quieras
              </h3>
              <p
                className={`${TextStyles.textSecondary} ${styles.featureDescription}`}
              >
                Pagá online con cualquier tarjeta
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <img src={CheckIcon} alt="Check icon" width="24" height="24" />
              </div>
              <h3 className={`${TextStyles.textPrimary} ${styles.featureTitle}`}>
                Turnos 24/7
              </h3>
              <p
                className={`${TextStyles.textSecondary} ${styles.featureDescription}`}
              >
                Sacá turno en cualquier momento, estés donde estés
              </p>
            </div>
          </div>
        </div>

        {/* Quick Search Section */}
        <section id="search-section" className={styles.searchSection}>
          <div className={styles.searchContainer}>
            <h2 className={`${TextStyles.textPrimary} ${styles.searchTitle}`}>
              Búsqueda rápida
            </h2>
            <div className={styles.searchForm}>
              <div className={styles.searchField}>
                <div className={styles.searchFieldIcon}>
                  <img
                    src={SoccerBallIcon}
                    alt="Soccer ball icon"
                    width="20"
                    height="20"
                  />
                </div>
                <select className={`${InputStyles.input} ${styles.searchSelect}`}>
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
                <select className={`${InputStyles.input} ${styles.searchSelect}`}>
                  <option value="">Hoy 09/08</option>
                  <option value="tomorrow">Mañana 10/08</option>
                  <option value="day-after">Pasado mañana 11/08</option>
                </select>
              </div>

              <div className={styles.searchField}>
                <div className={styles.searchFieldIcon}>
                  <img src={ClockIcon} alt="Clock icon" width="20" height="20" />
                </div>
                <select className={`${InputStyles.input} ${styles.searchSelect}`}>
                  <option value="">18:00 hs</option>
                  <option value="19:00">19:00 hs</option>
                  <option value="20:00">20:00 hs</option>
                  <option value="21:00">21:00 hs</option>
                </select>
              </div>

              <button
                className={`${ButtonStyles.btn} ${ButtonStyles.btnPrimary} ${styles.searchButton}`}
              >
                Buscar
              </button>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
