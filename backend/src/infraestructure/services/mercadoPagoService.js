import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import { config } from '../../config/environment.js';

// Configuración de Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: config.mercadoPago.accessToken,
  options: {
    timeout: 5000,
    idempotencyKey: 'abc'
  }
});

const preference = new Preference(client);
const payment = new Payment(client);

export const mercadoPagoService = {
  // Crear preferencia de pago
  async createPreference(reservationData) {
    try {
      const { 
        totalAmount, 
        depositAmount, 
        paymentMethod, 
        playerEmail, 
        playerName,
        courtName,
        reservationDate,
        startTime,
        endTime
      } = reservationData;

      const amount = paymentMethod === 'deposit' ? depositAmount : totalAmount;
      const description = paymentMethod === 'deposit' 
        ? `Seña para reserva en ${courtName}` 
        : `Reserva completa en ${courtName}`;

      const preferenceData = {
        items: [
          {
            title: description,
            quantity: 1,
            unit_price: amount,
            currency_id: 'ARS'
          }
        ],
        payer: {
          email: playerEmail,
          name: playerName
        },
        back_urls: {
          success: `${config.server.frontendUrl}/reservation/success`,
          failure: `${config.server.frontendUrl}/reservation/payment-failure`,
          pending: `${config.server.frontendUrl}/reservation/pending`
        },
        auto_return: 'approved',
        notification_url: `${config.server.backendUrl}/api/payments/webhook`,
        external_reference: `reservation_${reservationData.reservationId}`,
        expires: true,
        expiration_date_from: new Date().toISOString(),
        expiration_date_to: new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutos
      };

      const response = await preference.create({ body: preferenceData });
      return response;
    } catch (error) {
      console.error('Error creating MercadoPago preference:', error);
      throw error;
    }
  },

  // Verificar estado del pago
  async getPaymentStatus(paymentId) {
    try {
      const response = await payment.get({ id: paymentId });
      return response;
    } catch (error) {
      console.error('Error getting payment status:', error);
      throw error;
    }
  },

  // Procesar notificación de webhook
  async processWebhook(notificationData) {
    try {
      const { type, data } = notificationData;
      
      if (type === 'payment') {
        const paymentId = data.id;
        const paymentInfo = await this.getPaymentStatus(paymentId);
        
        return {
          paymentId,
          status: paymentInfo.status,
          statusDetail: paymentInfo.status_detail,
          externalReference: paymentInfo.external_reference,
          amount: paymentInfo.transaction_amount
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error processing webhook:', error);
      throw error;
    }
  }
};
