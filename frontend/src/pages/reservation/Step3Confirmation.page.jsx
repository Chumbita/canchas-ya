import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Step3Confirmation.module.css";
import TextStyles from "../../styles/base/Text.module.css";
import ProgressSteps from "../../components/reservation/ProgressSteps";

export default function Step3Confirmation() {
  const { courtId } = useParams();
  const navigate = useNavigate();

  const handleSearch = (searchData) => {
    const params = new URLSearchParams();
    if (searchData.sport) params.set('sport', searchData.sport);
    if (searchData.date) params.set('date', searchData.date);
    if (searchData.time) params.set('time', searchData.time);
    
    navigate(`/search?${params.toString()}`);
  };

  const handleMyReservations = () => {
    // Aquí se navegaría a la página de "Mis reservas"
    console.log('Navegar a mis reservas');
  };

  return (
    <div className={styles.confirmationPage}>
      <div className={styles.mainContent}>
        <div className={styles.container}>
          {/* Breadcrumbs */}
          <div className={styles.breadcrumbs}>
            <span className={`${TextStyles.textSecondary} ${styles.breadcrumbItem}`}>
              Inicio
            </span>
              <span className={styles.breadcrumbSeparator}> &gt; </span>
            <span className={`${TextStyles.textSecondary} ${styles.breadcrumbItem}`}>
              Resultados
            </span>
              <span className={styles.breadcrumbSeparator}> &gt; </span>
            <span className={`${TextStyles.textSecondary} ${styles.breadcrumbItem}`}>
              Club del Sur
            </span>
              <span className={styles.breadcrumbSeparator}> &gt; </span>
            <span className={`${TextStyles.textPrimary} ${TextStyles.textMedium} ${styles.breadcrumbItem}`}>
              Reservar
            </span>
          </div>

          {/* Progress Steps */}
          <ProgressSteps currentStep={3} />

          {/* Confirmation Content */}
          <div className={styles.confirmationContent}>
            <div className={styles.confirmationCard}>
              <div className={styles.successIcon}>
                <div className={styles.creditCardIcon}>
                  <div className={styles.cardStripe}></div>
                  <div className={styles.cardLines}>
                    <div className={styles.cardLine}></div>
                    <div className={styles.cardLine}></div>
                  </div>
                  <div className={styles.cardDots}>
                    <div className={styles.cardDot}></div>
                    <div className={styles.cardDot}></div>
                    <div className={styles.cardDot}></div>
                  </div>
                </div>
                <div className={styles.checkmarkIcon}>
                  ✓
                </div>
              </div>
              
              <h1 className={`${TextStyles.textPrimary} ${TextStyles.textBold} ${styles.confirmationTitle}`}>
                ¡Reserva confirmada!
              </h1>
              
              <p className={`${TextStyles.textSecondary} ${styles.confirmationMessage}`}>
                Te esperamos en la cancha. Revisá los detalles y preparate para jugar.
              </p>
              
              <button 
                className={styles.myReservationsButton}
                onClick={handleMyReservations}
              >
                Mis reservas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
