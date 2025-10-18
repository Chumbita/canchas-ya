import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Step1Configuration.module.css";
import TextStyles from "../../styles/base/Text.module.css";
import QuickSearchBar from "../../components/common/QuickSearchBar";
import ProgressSteps from "../../components/reservation/ProgressSteps";
import ReservationSummary from "../../components/reservation/ReservationSummary";
import { reservationService } from "../../services/reservationService";

export default function Step1Configuration() {
  const { courtId } = useParams();
  const navigate = useNavigate();
  
  // Estados para la configuración
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [selectedCourtSize, setSelectedCourtSize] = useState(null);
  const [selectedCourtNumber, setSelectedCourtNumber] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  
  // Estados para el calendario
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableDates, setAvailableDates] = useState([]);
  
  // Horarios disponibles (mock data)
  const availableTimeSlots = [
    "18:00 - 19:00",
    "19:00 - 20:00", 
    "20:00 - 21:00",
    "21:00 - 22:00"
  ];
  
  // Tamaños de cancha disponibles
  const courtSizes = ["5x5", "8x8", "11x11"];
  
  // Números de cancha disponibles
  const courtNumbers = [1, 2, 3, 4, 5, 6, 7];

  // Generar fechas del mes actual
  useEffect(() => {
    const today = new Date();
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const dates = [];
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      if (date >= today) { // Solo fechas futuras
        dates.push({
          day,
          date: date,
          dayName: date.toLocaleDateString('es-ES', { weekday: 'long' }),
          available: Math.random() > 0.3 // Mock: 70% de disponibilidad
        });
      }
    }
    setAvailableDates(dates);
  }, [currentMonth]);

  const handleSearch = (searchData) => {
    const params = new URLSearchParams();
    if (searchData.sport) params.set('sport', searchData.sport);
    if (searchData.date) params.set('date', searchData.date);
    if (searchData.time) params.set('time', searchData.time);
    
    navigate(`/search?${params.toString()}`);
  };

  const handleContinue = async () => {
    if (selectedDate && selectedCourtSize && selectedCourtNumber && selectedTimeSlot) {
      try {
        // Calcular fechas y horarios
        const startTime = new Date(selectedDate.date);
        const [startHour] = selectedTimeSlot.split(' - ')[0].split(':');
        startTime.setHours(parseInt(startHour), 0, 0, 0);
        
        const endTime = new Date(startTime);
        endTime.setHours(startTime.getHours() + selectedDuration);
        
        // Datos de la reserva
        const reservationData = {
          playerId: 1, // TODO: Obtener del contexto de autenticación
          courtId: parseInt(courtId),
          reservedDate: selectedDate.date.toISOString(),
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          totalAmount: getTotalPrice(),
          depositAmount: getTotalPrice() * 0.3, // 30% de seña
          paymentMethod: 'full', // TODO: Permitir selección
          playerEmail: 'player@example.com', // TODO: Obtener del contexto
          playerPhone: '+5491234567890' // TODO: Obtener del contexto
        };

        // Bloquear la reserva temporalmente
        const response = await reservationService.blockReservation(reservationData);
        
        if (response.success) {
          // Guardar datos en localStorage para el siguiente paso
          localStorage.setItem('reservationData', JSON.stringify({
            ...reservationData,
            reservationId: response.data.reservationId,
            blockedUntil: response.data.blockedUntil
          }));
          
          navigate(`/reservation/${courtId}/payment`);
        } else {
          alert('No se pudo bloquear la reserva. Intente nuevamente.');
        }
      } catch (error) {
        console.error('Error blocking reservation:', error);
        alert('Error al procesar la reserva. Intente nuevamente.');
      }
    }
  };

  const formatMonthYear = (date) => {
    return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'long' 
    });
  };

  const getTotalPrice = () => {
    const basePrice = 16000; // Precio base por hora
    return basePrice * selectedDuration;
  };

  return (
    <div className={styles.configurationPage}>
      <QuickSearchBar onSearch={handleSearch} showTitle={false} />
      
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
          <ProgressSteps currentStep={1} />

          {/* Main Title */}
          <div className={styles.titleSection}>
            <h1 className={`${TextStyles.textPrimary} ${TextStyles.textBold} ${styles.mainTitle}`}>
              Configuración de turno
            </h1>
            <p className={`${TextStyles.textSecondary} ${styles.subtitle}`}>
              Ingresá los datos necesarios para reservar tu cancha de forma rápida y segura.
            </p>
          </div>

          <div className={styles.contentLayout}>
            {/* Left Column - Configuration */}
            <div className={styles.configurationColumn}>
              
              {/* Date Selection */}
              <div className={styles.section}>
                <h3 className={`${TextStyles.textPrimary} ${TextStyles.textMedium} ${styles.sectionTitle}`}>
                  {formatMonthYear(currentMonth)}
                </h3>
                <div className={styles.dateGrid}>
                  {availableDates.map((dateInfo) => (
                    <button
                      key={dateInfo.day}
                      className={`${styles.dateButton} ${selectedDate?.day === dateInfo.day ? styles.selected : ''} ${!dateInfo.available ? styles.unavailable : ''}`}
                      onClick={() => dateInfo.available && setSelectedDate(dateInfo)}
                      disabled={!dateInfo.available}
                    >
                      <span className={styles.dateNumber}>{dateInfo.day}</span>
                      <span className={styles.dateDay}>{dateInfo.dayName.charAt(0).toUpperCase() + dateInfo.dayName.slice(1, 3)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className={styles.section}>
                <h3 className={`${TextStyles.textPrimary} ${TextStyles.textMedium} ${styles.sectionTitle}`}>
                  Duración
                </h3>
                <div className={styles.durationSelector}>
                  <button 
                    className={styles.durationButton}
                    onClick={() => setSelectedDuration(Math.max(1, selectedDuration - 1))}
                  >
                    -
                  </button>
                  <span className={styles.durationValue}>{selectedDuration}hr</span>
                  <button 
                    className={styles.durationButton}
                    onClick={() => setSelectedDuration(Math.min(4, selectedDuration + 1))}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Court Size */}
              <div className={styles.section}>
                <h3 className={`${TextStyles.textPrimary} ${TextStyles.textMedium} ${styles.sectionTitle}`}>
                  Cancha
                </h3>
                <div className={styles.optionsGrid}>
                  {courtSizes.map((size) => (
                    <button
                      key={size}
                      className={`${styles.optionButton} ${selectedCourtSize === size ? styles.selected : ''}`}
                      onClick={() => setSelectedCourtSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Court Number */}
              <div className={styles.section}>
                <h3 className={`${TextStyles.textPrimary} ${TextStyles.textMedium} ${styles.sectionTitle}`}>
                  N°cancha
                </h3>
                <div className={styles.optionsGrid}>
                  {courtNumbers.map((number) => (
                    <button
                      key={number}
                      className={`${styles.optionButton} ${selectedCourtNumber === number ? styles.selected : ''}`}
                      onClick={() => setSelectedCourtNumber(number)}
                    >
                      {number}
                    </button>
                  ))}
                </div>
              </div>

              {/* Available Times */}
              <div className={styles.section}>
                <h3 className={`${TextStyles.textPrimary} ${TextStyles.textMedium} ${styles.sectionTitle}`}>
                  Horarios disponibles
                </h3>
                <div className={styles.timeSlots}>
                  {availableTimeSlots.map((timeSlot) => (
                    <button
                      key={timeSlot}
                      className={`${styles.timeSlotButton} ${selectedTimeSlot === timeSlot ? styles.selected : ''}`}
                      onClick={() => setSelectedTimeSlot(timeSlot)}
                    >
                      {timeSlot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Summary */}
            <div className={styles.summaryColumn}>
              <ReservationSummary 
                courtName="Club del Sur"
                sport="Fútbol"
                date={selectedDate ? formatDate(selectedDate.date) : "Seleccionar fecha"}
                time={selectedTimeSlot || "Seleccionar horario"}
                duration={selectedDuration}
                pricePerHour={16000}
                totalPrice={getTotalPrice()}
                onContinue={handleContinue}
                canContinue={selectedDate && selectedCourtSize && selectedCourtNumber && selectedTimeSlot}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
