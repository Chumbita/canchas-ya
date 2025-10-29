import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Step2Payment.module.css";
import TextStyles from "../../styles/base/Text.module.css";
import ProgressSteps from "../../components/reservation/ProgressSteps";
import ReservationSummary from "../../components/reservation/ReservationSummary";
import { paymentService } from "../../services/paymentService";

export default function Step2Payment() {
  const { courtId } = useParams();
  const navigate = useNavigate();
  
  // Estados para el pago
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [reservationData, setReservationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Cargar datos de la reserva desde localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('reservationData');
    if (savedData) {
      setReservationData(JSON.parse(savedData));
    } else {
      // Si no hay datos, redirigir al paso anterior
      navigate(`/reservation/${courtId}/configuration`);
    }
  }, [courtId, navigate]);

  const handleSearch = (searchData) => {
    const params = new URLSearchParams();
    if (searchData.sport) params.set('sport', searchData.sport);
    if (searchData.date) params.set('date', searchData.date);
    if (searchData.time) params.set('time', searchData.time);
    
    navigate(`/search?${params.toString()}`);
  };

  const handleContinue = async () => {
    if (selectedPaymentMethod && reservationData) {
      setLoading(true);
      setError(null);
      
      try {
        const amount = selectedPaymentMethod === 'deposit' 
          ? reservationData.depositAmount 
          : reservationData.totalAmount;
        const response = await paymentService.createPreference({
          title: `Reserva de ${reservationData.sport || 'Cancha'}`,
          description: `Club ${reservationData.courtName || ''}`.trim(),
          amount,
          reservationId: reservationData.reservationId,
        });

        if (response?.success && response?.data?.init_point) {
          window.location.href = response.data.init_point;
        } else {
          setError('No se pudo crear la preferencia de pago. Intente nuevamente.');
        }
      } catch (error) {
        console.error('Error creating payment preference:', error);
        setError('Error al procesar el pago. Intente nuevamente.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.paymentPage}>
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
                  {reservationData && (
                    <>
                      {/* Pago Completo */}
                      <div 
                        className={`${styles.paymentMethod} ${selectedPaymentMethod === 'full' ? styles.selected : ''}`}
                        onClick={() => setSelectedPaymentMethod('full')}
                      >
                        <div className={styles.paymentMethodHeader}>
                          <h4 className={`${TextStyles.textPrimary} ${TextStyles.textMedium}`}>
                            Pago Completo
                          </h4>
                          <span className={`${TextStyles.textPrimary} ${TextStyles.textBold} ${styles.price}`}>
                            ${reservationData.totalAmount?.toLocaleString()} ARS
                          </span>
                        </div>
                        <p className={`${TextStyles.textSecondary} ${styles.description}`}>
                          Pagá el monto total ahora y asegurá tu reserva
                        </p>
                      </div>

                      {/* Pago con Seña */}
                      <div 
                        className={`${styles.paymentMethod} ${selectedPaymentMethod === 'deposit' ? styles.selected : ''}`}
                        onClick={() => setSelectedPaymentMethod('deposit')}
                      >
                        <div className={styles.paymentMethodHeader}>
                          <h4 className={`${TextStyles.textPrimary} ${TextStyles.textMedium}`}>
                            Pago con Seña
                          </h4>
                          <span className={`${TextStyles.textPrimary} ${TextStyles.textBold} ${styles.price}`}>
                            ${reservationData.depositAmount?.toLocaleString()} ARS
                          </span>
                        </div>
                        <p className={`${TextStyles.textSecondary} ${styles.description}`}>
                          Pagá el 50% ahora y el resto al llegar al club
                        </p>
                        <div className={styles.depositInfo}>
                          <p className={`${TextStyles.textSecondary} ${styles.depositText}`}>
                            Resto a pagar: ${(reservationData.totalAmount - reservationData.depositAmount)?.toLocaleString()} ARS
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                
                {error && (
                  <div className={styles.errorMessage}>
                    <p className={`${TextStyles.textSecondary} ${styles.errorText}`}>
                      {error}
                    </p>
                  </div>
                )}
              </div>

              {/* Cancellation Policy */}
              <div className={`${styles.section} ${styles.policySection}`}>
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
                courtName={reservationData?.courtName || "Club del Sur"}
                sport={reservationData?.sport || "Fútbol"}
                date={reservationData?.date || "Seleccionar fecha"}
                time={reservationData?.time || "Seleccionar horario"}
                duration={reservationData?.duration || 1}
                pricePerHour={reservationData?.pricePerHour || 16000}
                totalPrice={reservationData?.totalAmount || 16000}
                onContinue={handleContinue}
                canContinue={selectedPaymentMethod !== null && !loading}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
