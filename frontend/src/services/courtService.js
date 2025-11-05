const API_BASE_URL = 'http://localhost:3000/api';

export const courtService = {
  // Obtener canchas con filtros
  async getCourts(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.sport) queryParams.append('sport', filters.sport);
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      if (filters.ratings && filters.ratings.length > 0) {
        queryParams.append('ratings', filters.ratings.join(','));
      }
      if (filters.courtType) queryParams.append('courtType', filters.courtType);
      if (filters.club) queryParams.append('club', filters.club);
      // ubicación/fecha/hora eliminados del request

      const timestamp = new Date().getTime();
      const url = `${API_BASE_URL}/courts?${queryParams.toString()}&t=${timestamp}`;
      console.log('🌐 Fetching courts from:', url); // DEBUG: URL que se está llamando
      console.log('🔧 API_BASE_URL:', API_BASE_URL); // DEBUG: Verificar la URL base
      
      const response = await fetch(url, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      console.log('📊 Response status:', response.status); // DEBUG: Status de la respuesta
      console.log('📋 Response headers:', response.headers); // DEBUG: Headers de la respuesta
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data); // DEBUG: Datos que devuelve la API
      return data;
    } catch (error) {
      console.error('Error fetching courts:', error);
      throw error;
    }
  },

  // Obtener una cancha específica por ID
  async getCourtById(id) {
    try {
      const timestamp = new Date().getTime();
      const response = await fetch(`${API_BASE_URL}/courts/${id}?t=${timestamp}`, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching court:', error);
      throw error;
    }
  }
};
