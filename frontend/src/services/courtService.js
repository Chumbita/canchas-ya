const API_BASE_URL = 'http://localhost:3000/api';

export const courtService = {
  // Obtener canchas con filtros
  async getCourts(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.sport) queryParams.append('sport', filters.sport);
      if (filters.date) queryParams.append('date', filters.date);
      if (filters.time) queryParams.append('time', filters.time);
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      if (filters.ratings && filters.ratings.length > 0) {
        queryParams.append('ratings', filters.ratings.join(','));
      }

      const timestamp = new Date().getTime();
      const response = await fetch(`${API_BASE_URL}/courts?${queryParams.toString()}&t=${timestamp}`, {
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
