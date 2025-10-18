// Configuración de Google Maps
export const GOOGLE_MAPS_CONFIG = {
  // Reemplaza 'YOUR_API_KEY' con tu API key de Google Maps
  API_KEY: 'AIzaSyCHVTO8_1S7xbKjwCMNEXpj1K4UfselV2c',
  
  // Configuración por defecto del mapa
  DEFAULT_OPTIONS: {
    zoom: 15,
    mapTypeId: 'roadmap',
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    fullscreenControl: true
  }
};

// Función para generar la URL del iframe de Google Maps
export const generateMapEmbedUrl = (address, options = {}) => {
  const { API_KEY } = GOOGLE_MAPS_CONFIG;
  const { zoom = 15 } = { ...GOOGLE_MAPS_CONFIG.DEFAULT_OPTIONS, ...options };
  
  const baseUrl = 'https://www.google.com/maps/embed/v1/place';
  const params = new URLSearchParams({
    key: API_KEY,
    q: address,
    zoom: zoom.toString()
  });
  
  return `${baseUrl}?${params.toString()}`;
};

// Función para generar la URL de Google Maps (para abrir en nueva pestaña)
export const generateMapUrl = (address) => {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
};
