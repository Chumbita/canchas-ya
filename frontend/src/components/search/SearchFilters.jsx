import React, { useState } from "react";
import styles from "./SearchFilters.module.css";
import TextStyles from "../../styles/base/Text.module.css";

export default function SearchFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    fieldSizes: [],
    priceRange: { min: 0, max: 30000 },
    ratings: []
  });

  const fieldSizes = [
    "Fútbol 4", "Fútbol 5", "Fútbol 6", "Fútbol 7", 
    "Fútbol 8", "Fútbol 9", "Fútbol 10", "Fútbol 11"
  ];

  const ratings = [
    { value: 5, label: "5 estrellas" },
    { value: 4, label: "4 estrellas" },
    { value: 3, label: "3 estrellas" },
    { value: 2, label: "2 estrellas" },
    { value: 1, label: "1 estrella" }
  ];

  const handleFieldSizeChange = (size) => {
    const newSizes = filters.fieldSizes.includes(size)
      ? filters.fieldSizes.filter(s => s !== size)
      : [...filters.fieldSizes, size];
    
    const newFilters = { ...filters, fieldSizes: newSizes };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (type, value) => {
    const numValue = parseInt(value) || 0;
    const newFilters = {
      ...filters,
      priceRange: { ...filters.priceRange, [type]: numValue }
    };
    setFilters(newFilters);
    // Usar setTimeout para evitar múltiples llamadas durante el arrastre del slider
    setTimeout(() => {
      onFilterChange(newFilters);
    }, 50);
  };

  const handleRatingChange = (rating) => {
    const newRatings = filters.ratings.includes(rating)
      ? filters.ratings.filter(r => r !== rating)
      : [...filters.ratings, rating];
    
    const newFilters = { ...filters, ratings: newRatings };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      fieldSizes: [],
      priceRange: { min: 0, max: 30000 },
      ratings: []
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersHeader}>
        <h3 className={`${TextStyles.textPrimary} ${TextStyles.textBold} ${styles.filtersTitle}`}>
          Filtros
        </h3>
        <button 
          onClick={clearAllFilters}
          className={styles.clearButton}
        >
          Limpiar
        </button>
      </div>

      {/* Field Size Filter */}
      <div className={styles.filterSection}>
        <h4 className={`${TextStyles.textPrimary} ${TextStyles.textMedium} ${styles.filterSectionTitle}`}>
          Tamaño de la cancha
        </h4>
        <div className={styles.checkboxGroup}>
          {fieldSizes.map((size) => (
            <label key={size} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.fieldSizes.includes(size)}
                onChange={() => handleFieldSizeChange(size)}
                className={styles.checkbox}
              />
              <span className={styles.checkboxText}>{size}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className={styles.filterSection}>
        <h4 className={`${TextStyles.textPrimary} ${TextStyles.textMedium} ${styles.filterSectionTitle}`}>
          Precio
        </h4>
        <div className={styles.priceInputs}>
          <div className={styles.priceInput}>
            <label className={styles.priceLabel}>Min</label>
            <input
              type="number"
              value={filters.priceRange.min}
              onChange={(e) => handlePriceChange('min', e.target.value)}
              className={styles.priceField}
            />
          </div>
          <div className={styles.priceInput}>
            <label className={styles.priceLabel}>Max</label>
            <input
              type="number"
              value={filters.priceRange.max}
              onChange={(e) => handlePriceChange('max', e.target.value)}
              className={styles.priceField}
            />
          </div>
        </div>
        <div className={styles.priceSlider}>
          <input
            type="range"
            min="0"
            max="50000"
            value={filters.priceRange.min}
            onChange={(e) => handlePriceChange('min', e.target.value)}
            className={styles.slider}
          />
          <input
            type="range"
            min="0"
            max="50000"
            value={filters.priceRange.max}
            onChange={(e) => handlePriceChange('max', e.target.value)}
            className={styles.slider}
          />
        </div>
      </div>

      {/* Rating Filter */}
      <div className={styles.filterSection}>
        <h4 className={`${TextStyles.textPrimary} ${TextStyles.textMedium} ${styles.filterSectionTitle}`}>
          Calificación
        </h4>
        <div className={styles.checkboxGroup}>
          {ratings.map((rating) => (
            <label key={rating.value} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.ratings.includes(rating.value)}
                onChange={() => handleRatingChange(rating.value)}
                className={styles.checkbox}
              />
              <span className={styles.checkboxText}>{rating.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
