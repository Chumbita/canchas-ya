import React, { useState, useEffect, useMemo } from "react";
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

  // Cargar todas las canchas al cargar la página (y aplicar filtros iniciales por query)
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
          // Aplicar filtros localmente en lugar de hacer otra petición al backend
          setFilteredCourts(response.data);
          
          // Si hay filtros por query string, aplicarlos localmente
          const hasQueryFilters = searchParams.get('sport') || searchParams.get('date') || searchParams.get('time');
          if (hasQueryFilters) {
            const localFilters = {
              sport: searchParams.get('sport'),
              date: searchParams.get('date'),
              time: searchParams.get('time'),
              priceRange: { min: 0, max: 30000 },
              ratings: [],
              fieldSizes: []
            };
            const filtered = applyFilters(response.data, localFilters);
            setFilteredCourts(filtered);
          }
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        sport: filters.sport ?? searchParams.get('sport'),
        date: filters.date ?? searchParams.get('date'),
        time: filters.time ?? searchParams.get('time'),
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
    
    // Filtrar por deporte
    if (filters.sports && filters.sports.length > 0) {
      filtered = filtered.filter(court => {
        const courtSports = (court.sports || []).map(s => s.toLowerCase());
        return filters.sports.some(sel => courtSports.includes(sel.toLowerCase()));
      });
    } else if (filters.sport) {
      filtered = filtered.filter(court => 
        court.sports && court.sports.some(sport => 
          sport.toLowerCase().includes(filters.sport.toLowerCase())
        )
      );
    }
    
    // Filtrar por fecha (por ahora no aplicamos filtro de fecha ya que no tenemos datos de disponibilidad)
    // if (filters.date) {
    //   // Implementar filtro de fecha cuando tengamos datos de disponibilidad
    // }
    
    // Filtrar por hora (por ahora no aplicamos filtro de hora ya que no tenemos datos de disponibilidad)
    // if (filters.time) {
    //   // Implementar filtro de hora cuando tengamos datos de disponibilidad
    // }
    
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

    // Filtrar por club
    if (filters.club && filters.club.trim().length > 0) {
      const needle = filters.club.toLowerCase();
      filtered = filtered.filter(c => (c.clubName || c.name || '').toLowerCase().includes(needle));
    }

    // Eliminado ubicación/fecha/hora del filtrado según solicitud
    
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
        <SearchReservation
          onSearch={handleSearch}
          initialSport={searchParams.get('sport') || undefined}
          initialDate={useMemo(() => {
            const d = searchParams.get('date');
            return d ? new Date(d) : undefined;
          }, [searchParams])}
          initialTime={searchParams.get('time') || undefined}
        />
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
              {/* Búsqueda rápida solo para responsive (debajo de filtros) */}
              <div className={styles.searchContainerMobile}>
                <SearchReservation
                  onSearch={handleSearch}
                  initialSport={searchParams.get('sport') || undefined}
                  initialDate={useMemo(() => {
                    const d = searchParams.get('date');
                    return d ? new Date(d) : undefined;
                  }, [searchParams])}
                  initialTime={searchParams.get('time') || undefined}
                />
              </div>
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
