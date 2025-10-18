import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CourtDetail.module.css";
import TextStyles from "../../styles/base/Text.module.css";
import QuickSearchBar from "../../components/common/QuickSearchBar";
import { courtService } from "../../services/courtService";
import { generateMapEmbedUrl, generateMapUrl } from "../../config/maps";

// Importar iconos
import SoccerBallIcon from "../../assets/icons/soccer-ball.svg";
import PaddleIcon from "../../assets/icons/paddle-icon.png";
import BasketballIcon from "../../assets/icons/basketball-icon.png";
import VolleyballIcon from "../../assets/icons/volleyball-icon.svg";
import TenisIcon from "../../assets/icons/tenis-icon.png";
import BanosIcon from "../../assets/icons/baños-icon.png";
import VestuariosIcon from "../../assets/icons/vestuarios-icon.png";
import DuchasIcon from "../../assets/icons/duchas-icon.png";
import WifiIcon from "../../assets/icons/wifi-icon.png";
import AsadoresIcon from "../../assets/icons/asadores-icon.png";
import KioscoIcon from "../../assets/icons/kiosco-icon.png";
import TorneosIcon from "../../assets/icons/torneos-icon.png";
import FavoritosIcon from "../../assets/icons/favoritos-icon.svg";

// Helper functions para mapear iconos
const getSportIcon = (iconName) => {
  const iconMap = {
    '⚽': <img src={SoccerBallIcon} alt="Fútbol" width="24" height="24" style={{ objectFit: 'contain' }} />,
    '🏓': <img src={PaddleIcon} alt="Pádel" width="24" height="24" style={{ objectFit: 'contain' }} />,
    '🏀': <img src={BasketballIcon} alt="Básquet" width="24" height="24" style={{ objectFit: 'contain' }} />,
    '🏐': <img src={VolleyballIcon} alt="Voleibol" width="24" height="24" style={{ objectFit: 'contain' }} />,
    '🎾': <img src={TenisIcon} alt="Tenis" width="24" height="24" style={{ objectFit: 'contain' }} />
  };
  
  return iconMap[iconName] || <img src={SoccerBallIcon} alt="Deporte" width="24" height="24" style={{ objectFit: 'contain' }} />;
};

const getServiceIcon = (iconName) => {
  const iconMap = {
    '🚻': <img src={BanosIcon} alt="Baños" width="28" height="28" style={{ objectFit: 'contain' }} />,
    '👕': <img src={VestuariosIcon} alt="Vestuarios" width="28" height="28" style={{ objectFit: 'contain' }} />,
    '🚿': <img src={DuchasIcon} alt="Duchas" width="28" height="28" style={{ objectFit: 'contain' }} />,
    '📶': <img src={WifiIcon} alt="Wi-Fi" width="28" height="28" style={{ objectFit: 'contain' }} />,
    '🔥': <img src={AsadoresIcon} alt="Asadores" width="28" height="28" style={{ objectFit: 'contain' }} />,
    '🏪': <img src={KioscoIcon} alt="Kiosco" width="28" height="28" style={{ objectFit: 'contain' }} />,
    '🏆': <img src={TorneosIcon} alt="Torneos" width="28" height="28" style={{ objectFit: 'contain' }} />
  };
  return iconMap[iconName] || <img src={KioscoIcon} alt="Servicio" width="28" height="28" style={{ objectFit: 'contain' }} />;
};

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
    address: "22 de Julio, F5302 La Rioja, Argentina",
    coordinates: { lat: -29.4131, lng: -66.8563 }
  },
  description: "Club del Sur es un complejo deportivo de primer nivel con canchas de fútbol de césped sintético de última generación. Contamos con iluminación LED de alta eficiencia, vestuarios modernos y todas las comodidades para que disfrutes de tu deporte favorito."
};

export default function CourtDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [court, setCourt] = useState(mockCourtDetails);
  const [loading, setLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadCourtDetails = async () => {
      try {
        setLoading(true);
        const response = await courtService.getCourtById(id);
        if (response.success && response.data) {
          setCourt(response.data);
          // Cargar imágenes del carrusel basadas en los deportes del club
          setImages(response.data.images || [response.data.image]);
        } else {
          // Fallback a datos mock
          console.log('Using mock data as fallback for court details');
          setCourt(mockCourtDetails);
          setImages([mockCourtDetails.image]);
        }
      } catch (error) {
        console.error('Error loading court details:', error);
        setCourt(mockCourtDetails);
        setImages([mockCourtDetails.image]);
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
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
              <span className={styles.breadcrumbSeparator}> &gt; </span>
            <span className={`${TextStyles.textSecondary} ${styles.breadcrumbItem}`}>
              Resultados
            </span>
              <span className={styles.breadcrumbSeparator}> &gt; </span>
            <span className={`${TextStyles.textPrimary} ${TextStyles.textMedium} ${styles.breadcrumbItem}`}>
              {court.name}
            </span>
          </div>

          {/* Main Content */}
          <div className={styles.contentLayout}>
            {/* Left Column - Image Carousel */}
            <div className={styles.imageColumn}>
              <div className={styles.imageContainer}>
                <img 
                  src={images[currentImageIndex]} 
                  alt={court.name} 
                  className={styles.courtImage} 
                />
                {images.length > 1 && (
                  <>
                    <button 
                      className={styles.carouselButton} 
                      onClick={prevImage}
                      style={{ left: '10px' }}
                    >
                      ‹
                    </button>
                    <button 
                      className={styles.carouselButton} 
                      onClick={nextImage}
                      style={{ right: '10px' }}
                    >
                      ›
                    </button>
                    <div className={styles.carouselIndicators}>
                      {images.map((_, index) => (
                        <button
                          key={index}
                          className={`${styles.indicator} ${index === currentImageIndex ? styles.active : ''}`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
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
                    <img src={FavoritosIcon} alt="Favoritos" width="20" height="20" style={{ objectFit: 'contain' }} />
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
                      <span className={styles.sportIcon}>{getSportIcon(sport.icon)}</span>
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
                  <span className={styles.serviceIcon}>{getServiceIcon(service.icon)}</span>
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
                Ubicación
              </h3>
              <div className={styles.mapContainer}>
                <iframe
                  src={generateMapEmbedUrl(court.location.address)}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mapa de ${court.name}`}
                ></iframe>
                <div className={styles.mapAddress}>
                  <span className={styles.mapIcon}>📍</span>
                  <span className={styles.mapText}>{court.location.address}</span>
                  <a 
                    href={generateMapUrl(court.location.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.mapLink}
                  >
                    Ver en Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
