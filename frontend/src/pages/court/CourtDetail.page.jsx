import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CourtDetail.module.css";
import TextStyles from "../../styles/base/Text.module.css";
import QuickSearchBar from "../../components/common/QuickSearchBar";
import { courtService } from "../../services/courtService";

// Mock data para detalles de cancha
const mockCourtDetails = {
  id: 1,
  name: "Club del Sur",
  rating: 4.8,
  reviewCount: 125,
  price: 16000,
  image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop",
  sports: [
    { name: "Fútbol", icon: "⚽", active: false },
    { name: "Pádel", icon: "🏓", active: false },
    { name: "Básquet", icon: "🏀", active: false }
  ],
  services: [
    { name: "Baños", icon: "🚻" },
    { name: "Vestuarios", icon: "👕" },
    { name: "Duchas", icon: "🚿" },
    { name: "Wi-Fi", icon: "📶" },
    { name: "Asadores", icon: "🔥" },
    { name: "Kiosco", icon: "🏪" },
    { name: "Torneos", icon: "🏆" }
  ],
  ratings: {
    courts: 4.5,
    bathrooms: 4.0,
    service: 4.0,
    security: 4.0,
    lighting: 4.0
  },
  location: {
    address: "Av. del Sur 1234, Buenos Aires",
    coordinates: { lat: -34.6037, lng: -58.3816 }
  },
  description: "Club del Sur es un complejo deportivo de primer nivel con canchas de fútbol de césped sintético de última generación. Contamos con iluminación LED de alta eficiencia, vestuarios modernos y todas las comodidades para que disfrutes de tu deporte favorito."
};

export default function CourtDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [court, setCourt] = useState(mockCourtDetails);
  const [loading, setLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState(null);

  useEffect(() => {
    const loadCourtDetails = async () => {
      try {
        setLoading(true);
        const response = await courtService.getCourtById(id);
        if (response.success) {
          setCourt(response.data);
        } else {
          // Fallback a datos mock
          setCourt(mockCourtDetails);
        }
      } catch (error) {
        console.error('Error loading court details:', error);
        setCourt(mockCourtDetails);
      } finally {
        setLoading(false);
      }
    };

    loadCourtDetails();
  }, [id]);

  const handleSearch = (searchData) => {
    const params = new URLSearchParams();
    if (searchData.sport) params.set('sport', searchData.sport);
    if (searchData.date) params.set('date', searchData.date);
    if (searchData.time) params.set('time', searchData.time);
    
    navigate(`/search?${params.toString()}`);
  };

  const handleReservation = () => {
    navigate(`/reservation/${id}/configuration`);
  };

  const handleBackToResults = () => {
    navigate('/search');
  };

  if (loading) {
    return (
      <div className={styles.courtDetailPage}>
        <QuickSearchBar onSearch={handleSearch} showTitle={false} />
        <div className={styles.loadingContainer}>
          <p className={`${TextStyles.textSecondary} ${styles.loadingText}`}>
            Cargando detalles de la cancha...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.courtDetailPage}>
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
            <span className={`${TextStyles.textPrimary} ${TextStyles.textMedium} ${styles.breadcrumbItem}`}>
              {court.name}
            </span>
          </div>

          {/* Main Content */}
          <div className={styles.contentLayout}>
            {/* Left Column - Image */}
            <div className={styles.imageColumn}>
              <div className={styles.imageContainer}>
                <img src={court.image} alt={court.name} className={styles.courtImage} />
              </div>
            </div>

            {/* Right Column - Details */}
            <div className={styles.detailsColumn}>
              <div className={styles.courtHeader}>
                <div className={styles.courtTitle}>
                  <h1 className={`${TextStyles.textPrimary} ${TextStyles.textBold} ${styles.courtName}`}>
                    {court.name}
                  </h1>
                  <button className={styles.favoriteButton}>
                    ❤️
                  </button>
                </div>
                <div className={styles.rating}>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`${styles.star} ${i < Math.floor(court.rating) ? styles.filled : ''}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className={`${TextStyles.textSecondary} ${styles.ratingText}`}>
                    {court.rating} ({court.reviewCount})
                  </span>
                </div>
              </div>

              {/* Sports Section */}
              <div className={styles.sportsSection}>
                <h3 className={`${TextStyles.textPrimary} ${TextStyles.textMedium} ${styles.sectionTitle}`}>
                  Deportes
                </h3>
                <div className={styles.sportsList}>
                  {court.sports.map((sport) => (
                    <button
                      key={sport.name}
                      className={`${styles.sportButton} ${selectedSport === sport.name ? styles.active : ''}`}
                      onClick={() => setSelectedSport(sport.name)}
                    >
                      <span className={styles.sportIcon}>{sport.icon}</span>
                      <span className={styles.sportName}>{sport.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price and Reservation */}
              <div className={styles.priceSection}>
                <div className={styles.priceInfo}>
                  <span className={`${TextStyles.textPrimary} ${TextStyles.textBold} ${styles.price}`}>
                    $ {court.price.toLocaleString()} /hr
                  </span>
                </div>
                <button
                  className={styles.reserveButton}
                  onClick={handleReservation}
                >
                  Reservar
                </button>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className={styles.servicesSection}>
            <h3 className={`${TextStyles.textPrimary} ${TextStyles.textMedium} ${styles.sectionTitle}`}>
              Servicios
            </h3>
            <div className={styles.servicesList}>
              {court.services.map((service, index) => (
                <div key={index} className={styles.serviceItem}>
                  <span className={styles.serviceIcon}>{service.icon}</span>
                  <span className={styles.serviceName}>{service.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ratings and Map Section */}
          <div className={styles.bottomSection}>
            <div className={styles.ratingsColumn}>
              <h3 className={`${TextStyles.textPrimary} ${TextStyles.textMedium} ${styles.sectionTitle}`}>
                Calificaciones
              </h3>
              <div className={styles.ratingsList}>
                <div className={styles.ratingItem}>
                  <span className={styles.ratingLabel}>Canchas</span>
                  <div className={styles.ratingStars}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`${styles.ratingStar} ${i < Math.floor(court.ratings.courts) ? styles.filled : ''}`}>
                        ★
                      </span>
                    ))}
                    <span className={styles.ratingValue}>{court.ratings.courts}</span>
                  </div>
                </div>
                <div className={styles.ratingItem}>
                  <span className={styles.ratingLabel}>Baños y vestuarios</span>
                  <div className={styles.ratingStars}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`${styles.ratingStar} ${i < Math.floor(court.ratings.bathrooms) ? styles.filled : ''}`}>
                        ★
                      </span>
                    ))}
                    <span className={styles.ratingValue}>{court.ratings.bathrooms}</span>
                  </div>
                </div>
                <div className={styles.ratingItem}>
                  <span className={styles.ratingLabel}>Atención al cliente</span>
                  <div className={styles.ratingStars}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`${styles.ratingStar} ${i < Math.floor(court.ratings.service) ? styles.filled : ''}`}>
                        ★
                      </span>
                    ))}
                    <span className={styles.ratingValue}>{court.ratings.service}</span>
                  </div>
                </div>
                <div className={styles.ratingItem}>
                  <span className={styles.ratingLabel}>Seguridad</span>
                  <div className={styles.ratingStars}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`${styles.ratingStar} ${i < Math.floor(court.ratings.security) ? styles.filled : ''}`}>
                        ★
                      </span>
                    ))}
                    <span className={styles.ratingValue}>{court.ratings.security}</span>
                  </div>
                </div>
                <div className={styles.ratingItem}>
                  <span className={styles.ratingLabel}>Iluminación</span>
                  <div className={styles.ratingStars}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`${styles.ratingStar} ${i < Math.floor(court.ratings.lighting) ? styles.filled : ''}`}>
                        ★
                      </span>
                    ))}
                    <span className={styles.ratingValue}>{court.ratings.lighting}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.mapColumn}>
              <h3 className={`${TextStyles.textPrimary} ${TextStyles.textMedium} ${styles.sectionTitle}`}>
                Mapa
              </h3>
              <div className={styles.mapContainer}>
                <div className={styles.mapPlaceholder}>
                  <span className={styles.mapText}>📍 {court.location.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
