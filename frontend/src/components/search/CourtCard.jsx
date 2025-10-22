import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CourtCard.module.css";
import TextStyles from "../../styles/base/Text.module.css";

export default function CourtCard({ court }) {
  const navigate = useNavigate();
  const {
    id,
    name,
    rating,
    sports,
    timeRange,
    amenities,
    price,
    image,
    courtType,
    clubName
  } = court;

  const handleCardClick = () => {
    navigate(`/court/${id}`);
  };

  return (
    <div className={styles.courtCard} onClick={handleCardClick}>
      <div className={styles.cardImage}>
        <img src={image} alt={name} className={styles.image} />
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={`${TextStyles.textPrimary} ${TextStyles.textBold} ${styles.courtName}`}>
            {clubName || name}
          </h3>
          <div className={styles.rating}>
            <span className={styles.star}>★</span>
            <span className={styles.ratingValue}>{rating}</span>
          </div>
        </div>

        {courtType && (
          <div className={styles.courtType}>
            <span className={`${TextStyles.textSecondary} ${styles.courtTypeText}`}>
              {courtType}
            </span>
          </div>
        )}

        <div className={styles.sports}>
          <span className={`${TextStyles.textSecondary} ${styles.sportsText}`}>
            {sports.join(", ")}
          </span>
        </div>

        <div className={styles.timeRange}>
          <span className={`${TextStyles.textSecondary} ${styles.timeText}`}>
            {timeRange}
          </span>
        </div>

        <div className={styles.amenities}>
          {amenities.map((amenity, index) => (
            <span key={index} className={styles.amenityTag}>
              {amenity}
            </span>
          ))}
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.price}>
            <span className={`${TextStyles.textPrimary} ${TextStyles.textBold} ${styles.priceValue}`}>
              ${price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
