const API_BASE_URL = 'http://localhost:3000/api';

export const reservationService = {
  // Bloquear reserva temporalmente
  async blockReservation(reservationData) {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/block`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error blocking reservation:', error);
      throw error;
    }
  },

  // Crear preferencia de pago
  async createPaymentPreference(reservationId, playerName) {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/${reservationId}/payment-preference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playerName })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating payment preference:', error);
      throw error;
    }
  },

  // Confirmar pago
  async confirmPayment(reservationId, paymentData) {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/${reservationId}/confirm-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw error;
    }
  },

  // Obtener horarios disponibles
  async getAvailableSlots(courtId, date) {
    try {
      const response = await fetch(`${API_BASE_URL}/courts/${courtId}/available-slots?date=${date}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting available slots:', error);
      throw error;
    }
  }
};
