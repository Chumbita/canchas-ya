import React from "react";
import styles from "./ProgressSteps.module.css";

export default function ProgressSteps({ currentStep }) {
  const steps = [
    { number: 1, title: "Configuración de turno" },
    { number: 2, title: "Confirmación de pago" },
    { number: 3, title: "Reserva confirmada" }
  ];

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressSteps}>
        {steps.map((step, index) => (
          <div key={step.number} className={styles.stepContainer}>
            <div className={`${styles.stepCircle} ${currentStep >= step.number ? styles.completed : styles.pending}`}>
              {currentStep > step.number ? (
                <span className={styles.checkmark}>✓</span>
              ) : (
                <span className={styles.stepNumber}>{step.number}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`${styles.stepLine} ${currentStep > step.number ? styles.completed : ''}`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
