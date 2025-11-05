const API_BASE_URL = 'http://localhost:3000/api';

export const paymentService = {
  async createPreference({ title, description, amount, reservationId, backUrls, payer }) {
    try {
      const res = await fetch(`${API_BASE_URL}/payments/mp/create-preference`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, amount, reservationId, backUrls, payer })
      });
      const data = await res.json();
      return data;
    } catch (e) {
      console.error('paymentService.createPreference error', e);
      return { success: false, message: 'Network error' };
    }
  }
};


