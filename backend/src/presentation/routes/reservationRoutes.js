import express from 'express';
import { 
  blockReservation, 
  createPaymentPreference, 
  confirmPayment, 
  handleWebhook 
} from '../controllers/reservationController.js';

const router = express.Router();

// Bloquear reserva temporalmente
router.post('/block', blockReservation);

// Crear preferencia de pago
router.post('/:reservationId/payment-preference', createPaymentPreference);

// Confirmar pago
router.post('/:reservationId/confirm-payment', confirmPayment);

// Webhook de Mercado Pago
router.post('/webhook', handleWebhook);

export default router;
