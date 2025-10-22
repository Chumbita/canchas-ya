import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PaymentFailure.module.css";
import TextStyles from "../../styles/base/Text.module.css";

export default function PaymentFailure() {
  const navigate = useNavigate();

  const handleSearch = (searchData) => {
    const params = new URLSearchParams();
    if (searchData.sport) params.set('sport', searchData.sport);
    if (searchData.date) params.set('date', searchData.date);
    if (searchData.time) params.set('time', searchData.time);
    
    navigate(`/search?${params.toString()}`);
  };

  const handleRetryPayment = () => {
    // Obtener datos de la reserva desde localStorage
    const savedData = localStorage.getItem('reservationData');
    if (savedData) {
      const reservationData = JSON.parse(savedData);
      navigate(`/reservation/${reservationData.courtId}/payment`);
    } else {
      navigate('/search');
    }
  };

  const handleBackToHome = () => {
    // Limpiar datos de reserva
    localStorage.removeItem('reservationData');
    navigate('/');
  };

  return (
    <div className={styles.failurePage}>
      <div className={styles.mainContent}>
        <div className={styles.container}>
          {/* Failure Message */}
          <div className={styles.failureMessage}>
            <div className={styles.failureIcon}>
              ❌
            </div>
            <h1 className={`${TextStyles.textPrimary} ${TextStyles.textBold} ${styles.failureTitle}`}>
              No se pudo procesar el pago
            </h1>
            <p className={`${TextStyles.textSecondary} ${styles.failureSubtitle}`}>
              Hubo un problema al procesar tu pago. Podés intentar nuevamente o elegir otro método de pago.
            </p>
          </div>

          {/* Possible Reasons */}
          <div className={styles.reasonsSection}>
            <h2 className={`${TextStyles.textPrimary} ${TextStyles.textMedium} ${styles.reasonsTitle}`}>
              Posibles causas
            </h2>
            <div className={styles.reasonsList}>
              <div className={styles.reason}>
                <div className={styles.reasonIcon}>💳</div>
                <div className={styles.reasonContent}>
                  <h3 className={`${TextStyles.textPrimary} ${TextStyles.textMedium}`}>
                    Problema con la tarjeta
                  </h3>
                  <p className={TextStyles.textSecondary}>
                    Verificá que los datos de tu tarjeta sean correctos y que tenga saldo suficiente.
                  </p>
                </div>
              </div>
              
              <div className={styles.reason}>
                <div className={styles.reasonIcon}>⏰</div>
                <div className={styles.reasonContent}>
                  <h3 className={`${TextStyles.textPrimary} ${TextStyles.textMedium}`}>
                    Tiempo de espera agotado
                  </h3>
                  <p className={TextStyles.textSecondary}>
                    El tiempo de bloqueo de la reserva expiró. Podés intentar reservar nuevamente.
                  </p>
                </div>
              </div>
              
              <div className={styles.reason}>
                <div className={styles.reasonIcon}>🌐</div>
                <div className={styles.reasonContent}>
                  <h3 className={`${TextStyles.textPrimary} ${TextStyles.textMedium}`}>
                    Problema de conexión
                  </h3>
                  <p className={TextStyles.textSecondary}>
                    Verificá tu conexión a internet y intentá nuevamente.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button 
              className={styles.primaryButton}
              onClick={handleRetryPayment}
            >
              Intentar nuevamente
            </button>
            <button 
              className={styles.secondaryButton}
              onClick={handleBackToHome}
            >
              Volver al inicio
            </button>
          </div>

          {/* Help Section */}
          <div className={styles.helpSection}>
            <h2 className={`${TextStyles.textPrimary} ${TextStyles.textMedium} ${styles.helpTitle}`}>
              ¿Necesitás ayuda?
            </h2>
            <p className={`${TextStyles.textSecondary} ${styles.helpText}`}>
              Si seguís teniendo problemas, contactanos y te ayudaremos a resolverlo.
            </p>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📧</span>
                <span className={TextStyles.textSecondary}>soporte@canchasy.com</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📱</span>
                <span className={TextStyles.textSecondary}>+54 9 11 1234-5678</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
