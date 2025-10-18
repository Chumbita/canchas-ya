import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import TextStyles from "../../styles/base/Text.module.css";
import ButtonStyles from "../../styles/base/Button.module.css";
import ClockFeatureIcon from "../../assets/icons/clock-feature.svg";
import CreditCardIcon from "../../assets/icons/credit-card.svg";
import CheckIcon from "../../assets/icons/check-24-7.svg";
import QuickSearchBar from "../../components/common/QuickSearchBar";

export default function Home() {
  const navigate = useNavigate();

  const scrollToSearch = () => {
    const searchSection = document.getElementById("search-section");
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearch = (searchData) => {
    // Navegar a la página de resultados con los parámetros de búsqueda
    const params = new URLSearchParams();
    if (searchData.sport) params.set('sport', searchData.sport);
    if (searchData.date) params.set('date', searchData.date);
    if (searchData.time) params.set('time', searchData.time);
    
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1 className={`${TextStyles.textPrimary} ${styles.heroTitle}`}>
              Sacar turno nunca
              <br />
              fue tan fácil
            </h1>
            <p className={`${TextStyles.textSecondary} ${styles.heroSubtitle}`}>
              Reservá tu cancha en segundos, y 
              <br />
              sin complicaciones
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
              <h3
                className={`${TextStyles.textPrimary} ${styles.featureTitle}`}
              >
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
              <h3
                className={`${TextStyles.textPrimary} ${styles.featureTitle}`}
              >
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
              <h3
                className={`${TextStyles.textPrimary} ${styles.featureTitle}`}
              >
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
        <div id="search-section">
          <QuickSearchBar onSearch={handleSearch} />
        </div>
      </section>
    </div>
  );
}
