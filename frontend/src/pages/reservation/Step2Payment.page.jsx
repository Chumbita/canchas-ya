import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Step2Payment.module.css";
import TextStyles from "../../styles/base/Text.module.css";
import QuickSearchBar from "../../components/common/QuickSearchBar";
import ProgressSteps from "../../components/reservation/ProgressSteps";
import ReservationSummary from "../../components/reservation/ReservationSummary";

export default function Step2Payment() {
  const { courtId } = useParams();
  const navigate = useNavigate();
  
  // Estados para el pago
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  
  // Datos de la reserva (en un caso real vendrían del estado global o props)
  const reservationData = {
    courtName: "Club del Sur",
    sport: "Fútbol 5x5",
    date: "16 Septiembre",
    time: "18:00 pm - 20:00 pm",
    duration: 2,
    pricePerHour: 16000,
    totalPrice: 32000
  };

  const handleSearch = (searchData) => {
    const params = new URLSearchParams();
    if (searchData.sport) params.set('sport', searchData.sport);
    if (searchData.date) params.set('date', searchData.date);
    if (searchData.time) params.set('time', searchData.time);
    
    navigate(`/search?${params.toString()}`);
  };

  const handleContinue = () => {
    if (selectedPaymentMethod) {
      navigate(`/reservation/${courtId}/confirmation`);
    }
  };

  return (
    <div className={styles.paymentPage}>
      <QuickSearchBar onSearch={handleSearch} showTitle={false} />
      
      <div className={styles.mainContent}>
        <div className={styles.container}>
          {/* Breadcrumbs */}
          <div className={styles.breadcrumbs}>
            <span className={`${TextStyles.textSecondary} ${styles.breadcrumbItem}`}>
              Inicio
            </span>
            <span className={styles.breadcrumbSeparator}> > </span>
            <span className={`${TextStyles.textSecondary} ${styles.breadcrumbItem}`}>
              Resultados
            </span>
            <span className={styles.breadcrumbSeparator}> > </span>
            <span className={`${TextStyles.textSecondary} ${styles.breadcrumbItem}`}>
              Club del Sur
            </span>
            <span className={styles.breadcrumbSeparator}> > </span>
            <span className={`${TextStyles.textPrimary} ${TextStyles.textMedium} ${styles.breadcrumbItem}`}>
              Reservar
            </span>
          </div>

          {/* Progress Steps */}
          <ProgressSteps currentStep={2} />

          {/* Main Title */}
          <div className={styles.titleSection}>
            <h1 className={`${TextStyles.textPrimary} ${TextStyles.textBold} ${styles.mainTitle}`}>
              Confirmá tu pago
            </h1>
            <p className={`${TextStyles.textSecondary} ${styles.subtitle}`}>
              Elegí el método, revisá los detalles y asegurá tu reserva en segundos.
            </p>
          </div>

          <div className={styles.contentLayout}>
            {/* Left Column - Payment Options */}
            <div className={styles.paymentColumn}>
              
              {/* Payment Method Selection */}
              <div className={styles.section}>
                <h3 className={`${TextStyles.textPrimary} ${TextStyles.textMedium} ${styles.sectionTitle}`}>
                  Elegir método de pago
                </h3>
                <div className={styles.paymentMethods}>
                  {/* Por ahora está vacío como se ve en la imagen */}
                  <div className={styles.emptyState}>
                    <p className={`${TextStyles.textSecondary} ${styles.emptyText}`}>
                      Métodos de pago disponibles próximamente
                    </p>
                  </div>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className={styles.section}>
                <h3 className={`${TextStyles.textPrimary} ${TextStyles.textMedium} ${styles.sectionTitle}`}>
                  Política de cancelación
                </h3>
                <div className={styles.policyContent}>
                  <p className={`${TextStyles.textSecondary} ${styles.policyText}`}>
                    Podés cancelar con <strong>24 horas</strong> de anticipación para un reembolso <strong>total</strong>. 
                    CanchasYA! facilita el proceso, pero el reembolso depende exclusivamente del club. 
                    CanchasYA! no gestiona ni garantiza el pago. Si cancelás fuera del tiempo permitido, 
                    no se emitirá reembolso.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Summary */}
            <div className={styles.summaryColumn}>
              <ReservationSummary 
                courtName={reservationData.courtName}
                sport={reservationData.sport}
                date={reservationData.date}
                time={reservationData.time}
                duration={reservationData.duration}
                pricePerHour={reservationData.pricePerHour}
                totalPrice={reservationData.totalPrice}
                onContinue={handleContinue}
                canContinue={selectedPaymentMethod !== null}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
