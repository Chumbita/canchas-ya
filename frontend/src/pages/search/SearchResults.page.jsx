import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./SearchResults.module.css";
import TextStyles from "../../styles/base/Text.module.css";
import QuickSearchBar from "../../components/common/QuickSearchBar";
import SearchFilters from "../../components/search/SearchFilters";
import CourtCard from "../../components/search/CourtCard";
import { courtService } from "../../services/courtService";

// Mock data como fallback
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

  // Cargar canchas desde la API solo cuando cambian los parámetros de búsqueda
  useEffect(() => {
    const loadCourts = async () => {
      try {
        setLoading(true);
        const sport = searchParams.get('sport');
        const date = searchParams.get('date');
        const time = searchParams.get('time');
        
        const apiFilters = {
          sport,
          date,
          time
        };

        const response = await courtService.getCourts(apiFilters);
        if (response.success && response.data && response.data.length > 0) {
          setCourts(response.data);
          setFilteredCourts(response.data);
        } else {
          // Fallback a datos mock si la API falla
          console.log('Using mock data as fallback');
          setCourts(mockCourts);
          setFilteredCourts(mockCourts);
        }
      } catch (error) {
        console.error('Error loading courts:', error);
        // Fallback a datos mock
        setCourts(mockCourts);
        setFilteredCourts(mockCourts);
      } finally {
        setLoading(false);
      }
    };

    loadCourts();
  }, [searchParams]); // Solo recargar cuando cambien los parámetros de búsqueda, no los filtros

  const handleSearch = (searchData) => {
    // Navegar con los parámetros de búsqueda
    const params = new URLSearchParams();
    if (searchData.sport) params.set('sport', searchData.sport);
    if (searchData.date) params.set('date', searchData.date);
    if (searchData.time) params.set('time', searchData.time);
    
    navigate(`/search?${params.toString()}`);
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
    
    // Filtrar por tamaño de cancha (preparado para datos reales)
    if (filters.fieldSizes.length > 0) {
      // Por ahora no filtramos por tamaño ya que no tenemos esa info en los datos mock
      // En el futuro se puede implementar cuando tengamos datos reales de la API
    }
    
    return filtered;
  };

  return (
    <div className={styles.searchResultsPage}>
      <QuickSearchBar onSearch={handleSearch} showTitle={false} />
      
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
  );
}
