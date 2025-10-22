import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./SearchResults.module.css";
import TextStyles from "../../styles/base/Text.module.css";
import SearchReservation from "../../components/common/SearchReservation";
import SearchFilters from "../../components/search/SearchFilters";
import CourtCard from "../../components/search/CourtCard";
import { courtService } from "../../services/courtService";

// Mock data como fallback - COMENTADO PARA USAR SOLO DATOS REALES
/*
const mockCourts = [
  {
    id: 1,
    name: "Arena Fútbol",
    rating: 4.8,
    sports: ["Fútbol", "Básquet", "Voleibol"],
    timeRange: "17:00pm - 00:00am",
    amenities: ["Baños", "Vestuarios", "Asadores", "Kiosco"],
    price: 12000,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Carlos Fútbol",
    rating: 4.5,
    sports: ["Fútbol", "Básquet"],
    timeRange: "17:00pm - 8:00am",
    amenities: ["Baños", "Vestuarios"],
    price: 24000,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    name: "OSUNLaR",
    rating: 4.2,
    sports: ["Fútbol", "Tenis"],
    timeRange: "17:00pm - 00:00am",
    amenities: ["Baños", "Kiosco"],
    price: 16000,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    name: "Le Club",
    rating: 4.7,
    sports: ["Fútbol", "Básquet", "Voleibol"],
    timeRange: "17:00pm - 00:00am",
    amenities: ["Baños", "Vestuarios", "Asadores"],
    price: 20000,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    name: "Juan Canchas",
    rating: 4.3,
    sports: ["Fútbol", "Paddle"],
    timeRange: "17:00pm - 00:00am",
    amenities: ["Baños", "Vestuarios", "Kiosco"],
    price: 18000,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    name: "Club del Sur",
    rating: 4.6,
    sports: ["Fútbol", "Básquet"],
    timeRange: "17:00pm - 00:00am",
    amenities: ["Baños", "Vestuarios", "Asadores", "Kiosco"],
    price: 15000,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop"
  },
  {
    id: 7,
    name: "Chelcos FC",
    rating: 4.4,
    sports: ["Fútbol", "Tenis", "Paddle"],
    timeRange: "17:00pm - 00:00am",
    amenities: ["Baños", "Kiosco"],
    price: 22000,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop"
  }
];
*/

export default function SearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [courts, setCourts] = useState([]);
  const [filteredCourts, setFilteredCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    fieldSizes: [],
    priceRange: { min: 0, max: 30000 },
    ratings: []
  });

  // Cargar todas las canchas al cargar la página (sin filtros)
  useEffect(() => {
    const loadAllCourts = async () => {
      try {
        console.log('🔄 Loading all courts...'); // DEBUG
        setLoading(true);
        
        // Cargar todas las canchas sin filtros
        const response = await courtService.getCourts({});
        console.log('📡 API Response received:', response); // DEBUG
        
        if (response.success && response.data && response.data.length > 0) {
          console.log('All courts found:', response.data.length); // DEBUG
          setCourts(response.data);
          setFilteredCourts(response.data);
        } else {
          console.log('No courts found from API');
        }
      } catch (error) {
        console.error('Error loading courts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAllCourts();
  }, []); // Solo cargar una vez al montar el componente

  const handleSearch = (searchData) => {
    // Actualizar los filtros con los nuevos datos de búsqueda
    const newFilters = {
      sport: searchData.sport,
      date: searchData.date,
      time: searchData.time
    };
    
    // Recargar las canchas con los nuevos filtros
    loadCourtsWithFilters(newFilters);
  };

  const loadCourtsWithFilters = async (filters) => {
    try {
      setLoading(true);
      
      // Preparar filtros para la API
      const apiFilters = {
        sport: searchParams.get('sport'),
        date: searchParams.get('date'),
        time: searchParams.get('time'),
        minPrice: filters.priceRange.min,
        maxPrice: filters.priceRange.max,
        ratings: filters.ratings,
        courtType: filters.fieldSizes.length > 0 ? filters.fieldSizes[0] : null // Solo el primer tipo seleccionado
      };
      
      const response = await courtService.getCourts(apiFilters);
      console.log('API Response:', response);
      
      if (response.success && response.data && response.data.length > 0) {
        console.log('Courts found:', response.data.length);
        setCourts(response.data);
        setFilteredCourts(response.data);
      } else {
        console.log('No courts found from API - Response:', response);
      }
    } catch (error) {
      console.error('Error loading courts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    
    // Aplicar filtros localmente de forma instantánea sin recargar
    const filtered = applyFilters(courts, newFilters);
    setFilteredCourts(filtered);
  };

  // Función separada para aplicar filtros
  const applyFilters = (courtsList, filters) => {
    let filtered = [...courtsList];
    
    // Filtrar por precio
    if (filters.priceRange.min > 0 || filters.priceRange.max < 50000) {
      filtered = filtered.filter(court => {
        const price = court.price;
        const minPrice = filters.priceRange.min;
        const maxPrice = filters.priceRange.max;
        
        // Si solo hay precio mínimo
        if (minPrice > 0 && maxPrice >= 50000) {
          return price >= minPrice;
        }
        // Si solo hay precio máximo
        if (maxPrice < 50000 && minPrice <= 0) {
          return price <= maxPrice;
        }
        // Si hay ambos
        if (minPrice > 0 && maxPrice < 50000) {
          return price >= minPrice && price <= maxPrice;
        }
        return true;
      });
    }
    
    // Filtrar por calificación
    if (filters.ratings.length > 0) {
      filtered = filtered.filter(court => 
        filters.ratings.some(rating => Math.floor(court.rating) === rating)
      );
    }
    
    // Filtrar por tamaño de cancha
    if (filters.fieldSizes.length > 0) {
      filtered = filtered.filter(court => 
        court.courtType && filters.fieldSizes.includes(court.courtType)
      );
    }
    
    return filtered;
  };

  console.log('Rendering SearchResults - courts:', courts.length, 'filteredCourts:', filteredCourts.length, 'loading:', loading); // DEBUG
  
  // DEBUG: Verificar que las canchas se estén cargando
  if (courts.length === 0 && !loading) {
    console.log('⚠️ No courts found - checking if API is working...');
  }

  return (
    <>
      {/* Búsqueda rápida separada */}
      <div className={styles.searchContainer}>
        <SearchReservation onSearch={handleSearch} />
      </div>
      
      <div className={styles.searchResultsPage}>
        <div className={styles.mainContent}>
          <div className={styles.container}>
          {/* Breadcrumbs */}
          <div className={styles.breadcrumbs}>
            <span className={`${TextStyles.textSecondary} ${styles.breadcrumbItem}`}>
              Inicio
            </span>
              <span className={styles.breadcrumbSeparator}> &gt; </span>
            <span className={`${TextStyles.textPrimary} ${TextStyles.textMedium} ${styles.breadcrumbItem}`}>
              Resultado
            </span>
          </div>

          <div className={styles.contentLayout}>
            {/* Sidebar with Filters */}
            <aside className={styles.sidebar}>
              <SearchFilters onFilterChange={handleFilterChange} />
            </aside>

            {/* Main Results Area */}
            <main className={styles.resultsArea}>
              <div className={styles.resultsHeader}>
                <h2 className={`${TextStyles.textPrimary} ${TextStyles.textBold} ${styles.resultsTitle}`}>
                  Resultados
                </h2>
                <div className={styles.resultsCount}>
                  <span className={`${TextStyles.textSecondary} ${styles.countText}`}>
                    {filteredCourts.length > 0 
                      ? `Mostrando 1-${filteredCourts.length} de ${courts.length} resultados`
                      : 'No se encontraron resultados con los filtros aplicados'
                    }
                  </span>
                </div>
              </div>

              {loading ? (
                <div className={styles.loadingContainer}>
                  <p className={`${TextStyles.textSecondary} ${styles.loadingText}`}>
                    Cargando canchas...
                  </p>
                </div>
              ) : (
                <div className={styles.resultsGrid}>
                  
                  {filteredCourts.map((court) => (
                    <CourtCard key={court.id} court={court} />
                  ))}
                </div>
              )}
            </main>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
