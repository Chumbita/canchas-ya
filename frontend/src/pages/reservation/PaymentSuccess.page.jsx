import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./PaymentSuccess.module.css";
import TextStyles from "../../styles/base/Text.module.css";
import { reservationService } from "../../services/reservationService";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [reservationData, setReservationData] = useState(null);

  useEffect(() => {
    const processPayment = async () => {
      try {
        // Obtener parámetros de Mercado Pago
        const paymentId = searchParams.get('payment_id');
        const status = searchParams.get('status');
        const externalReference = searchParams.get('external_reference');

        if (paymentId && status && externalReference) {
          // Extraer reservationId del external_reference
          const reservationId = externalReference.replace('reservation_', '');
          
          // Confirmar el pago
          const response = await reservationService.confirmPayment(reservationId, {
            paymentId,
            status
          });

          if (response.success) {
            // Cargar datos de la reserva confirmada
            const savedData = localStorage.getItem('reservationData');
            if (savedData) {
              setReservationData(JSON.parse(savedData));
            }
          } else {
            // Si falla, redirigir a error
            navigate('/reservation/payment-failure');
          }
        }
      } catch (error) {
        console.error('Error processing payment:', error);
        navigate('/reservation/payment-failure');
      } finally {
        setLoading(false);
      }
    };

    processPayment();
  }, [navigate, searchParams]);

  const handleSearch = (searchData) => {
    const params = new URLSearchParams();
    if (searchData.sport) params.set('sport', searchData.sport);
    if (searchData.date) params.set('date', searchData.date);
    if (searchData.time) params.set('time', searchData.time);
    
    navigate(`/search?${params.toString()}`);
  };

  const handleBackToHome = () => {
    // Limpiar datos de reserva
    localStorage.removeItem('reservationData');
    navigate('/');
  };

  if (loading) {
    return (
      <div className={styles.successPage}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p className={`${TextStyles.textPrimary} ${styles.loadingText}`}>
            Procesando tu pago...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.successPage}>
      <div className={styles.mainContent}>
        <div className={styles.container}>
          {/* Success Message */}
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>
              ✅
            </div>
            <h1 className={`${TextStyles.textPrimary} ${TextStyles.textBold} ${styles.successTitle}`}>
              ¡Reserva confirmada!
            </h1>
            <p className={`${TextStyles.textSecondary} ${styles.successSubtitle}`}>
              Tu pago fue procesado exitosamente y tu reserva está confirmada.
            </p>
          </div>

          {/* Reservation Details */}
          {reservationData && (
            <div className={styles.reservationDetails}>
              <h2 className={`${TextStyles.textPrimary} ${TextStyles.textMedium} ${styles.detailsTitle}`}>
                Detalles de tu reserva
              </h2>
              
              <div className={styles.detailsGrid}>
                <div className={styles.detailCard}>
                  <h3 className={`${TextStyles.textPrimary} ${TextStyles.textMedium}`}>
                    Club
                  </h3>
                  <p className={TextStyles.textSecondary}>
                    {reservationData.courtName || 'Club del Sur'}
                  </p>
                </div>

                <div className={styles.detailCard}>
                  <h3 className={`${TextStyles.textPrimary} ${TextStyles.textMedium}`}>
                    Fecha
                  </h3>
                  <p className={TextStyles.textSecondary}>
                    {new Date(reservationData.reservedDate).toLocaleDateString('es-ES', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long'
                    })}
                  </p>
                </div>

                <div className={styles.detailCard}>
                  <h3 className={`${TextStyles.textPrimary} ${TextStyles.textMedium}`}>
                    Horario
                  </h3>
                  <p className={TextStyles.textSecondary}>
                    {new Date(reservationData.startTime).toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })} - {new Date(reservationData.endTime).toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                <div className={styles.detailCard}>
                  <h3 className={`${TextStyles.textPrimary} ${TextStyles.textMedium}`}>
                    Monto pagado
                  </h3>
                  <p className={`${TextStyles.textPrimary} ${TextStyles.textBold}`}>
                    ${reservationData.totalAmount?.toLocaleString()} ARS
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className={styles.nextSteps}>
            <h2 className={`${TextStyles.textPrimary} ${TextStyles.textMedium} ${styles.stepsTitle}`}>
              Próximos pasos
            </h2>
            <div className={styles.stepsList}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h3 className={`${TextStyles.textPrimary} ${TextStyles.textMedium}`}>
                    Recibirás un email de confirmación
                  </h3>
                  <p className={TextStyles.textSecondary}>
                    Te enviaremos todos los detalles de tu reserva por email.
                  </p>
                </div>
              </div>
              
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h3 className={`${TextStyles.textPrimary} ${TextStyles.textMedium}`}>
                    Presentate en el club
                  </h3>
                  <p className={TextStyles.textSecondary}>
                    Llegá 15 minutos antes de tu horario reservado.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button 
              className={styles.primaryButton}
              onClick={handleBackToHome}
            >
              Volver al inicio
            </button>
            <button 
              className={styles.secondaryButton}
              onClick={() => navigate('/search')}
            >
              Hacer otra reserva
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
