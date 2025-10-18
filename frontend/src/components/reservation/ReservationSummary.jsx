import React from "react";
import styles from "./ReservationSummary.module.css";
import TextStyles from "../../styles/base/Text.module.css";

// Importar iconos locales
import ClubIcon from "../../assets/icons/club-icon.svg";
import DeporteIcon from "../../assets/icons/deporte-icon.svg";
import FechaIcon from "../../assets/icons/fecha-icon.svg";
import HorarioIcon from "../../assets/icons/horario-icon.svg";

export default function ReservationSummary({ 
  courtName, 
  sport, 
  date, 
  time, 
  duration, 
  pricePerHour, 
  totalPrice, 
  onContinue, 
  canContinue,
  loading = false
}) {
  return (
    <div className={styles.summaryContainer}>
      {/* Tu reserva */}
      <div className={styles.reservationCard}>
        <h3 className={`${TextStyles.textPrimary} ${TextStyles.textMedium} ${styles.cardTitle}`}>
          Tu reserva
        </h3>
        <div className={styles.reservationDetails}>
          <div className={styles.detailItem}>
            <span className={styles.detailIcon}>
              <img src={ClubIcon} alt="Club" width="20" height="20" style={{ objectFit: 'contain' }} />
            </span>
            <div className={styles.detailContent}>
              <span className={styles.detailLabel}>Club deportivo:</span>
              <span className={styles.detailValue}>{courtName}</span>
            </div>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailIcon}>
              <img src={DeporteIcon} alt="Deporte" width="20" height="20" style={{ objectFit: 'contain' }} />
            </span>
            <div className={styles.detailContent}>
              <span className={styles.detailLabel}>Deporte:</span>
              <span className={styles.detailValue}>{sport}</span>
            </div>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailIcon}>
              <img src={FechaIcon} alt="Fecha" width="20" height="20" style={{ objectFit: 'contain' }} />
            </span>
            <div className={styles.detailContent}>
              <span className={styles.detailLabel}>Fecha:</span>
              <span className={styles.detailValue}>{date}</span>
            </div>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailIcon}>
              <img src={HorarioIcon} alt="Hora" width="20" height="20" style={{ objectFit: 'contain' }} />
            </span>
            <div className={styles.detailContent}>
              <span className={styles.detailLabel}>Hora:</span>
              <span className={styles.detailValue}>{time}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detalle de precio */}
      <div className={styles.priceCard}>
        <h3 className={`${TextStyles.textPrimary} ${TextStyles.textMedium} ${styles.cardTitle}`}>
          Detalle de precio
        </h3>
        <div className={styles.priceDetails}>
          <div className={styles.priceItem}>
            <span className={styles.priceLabel}>Precio por hora:</span>
            <span className={styles.priceValue}>${pricePerHour.toLocaleString()}</span>
          </div>
          <div className={styles.priceItem}>
            <span className={styles.priceLabel}>Duración:</span>
            <span className={styles.priceValue}>{duration} hora{duration > 1 ? 's' : ''}</span>
          </div>
          <div className={styles.priceItem}>
            <span className={styles.priceLabel}>Subtotal:</span>
            <span className={styles.priceValue}>${totalPrice.toLocaleString()}</span>
          </div>
          <div className={`${styles.priceItem} ${styles.totalItem}`}>
            <span className={styles.totalLabel}>Total:</span>
            <span className={styles.totalValue}>${totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Botón continuar */}
      <button
        className={`${styles.continueButton} ${!canContinue ? styles.disabled : ''}`}
        onClick={onContinue}
        disabled={!canContinue}
      >
        {loading ? 'Procesando...' : 'Continuar'}
      </button>
    </div>
  );
}
