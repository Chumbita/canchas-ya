import { PrismaClient } from '@prisma/client';
import { mercadoPagoService } from '../../infraestructure/services/mercadoPagoService.js';

const prisma = new PrismaClient();

// Bloquear temporalmente una reserva (10 minutos)
export const blockReservation = async (req, res) => {
  try {
    const { 
      playerId, 
      courtId, 
      reservedDate, 
      startTime, 
      endTime,
      totalAmount,
      depositAmount,
      paymentMethod,
      playerEmail,
      playerPhone
    } = req.body;

    // Verificar que el horario no esté ya reservado
    const existingReservation = await prisma.reservation.findFirst({
      where: {
        courtId,
        reservedDate: new Date(reservedDate),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        status: {
          in: ['confirmed', 'blocked']
        }
      }
    });

    if (existingReservation) {
      return res.status(400).json({
        success: false,
        message: 'Este horario ya está reservado'
      });
    }

    // Crear reserva bloqueada temporalmente
    const blockedUntil = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos

    const reservation = await prisma.reservation.create({
      data: {
        playerId,
        courtId,
        reservedDate: new Date(reservedDate),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        status: 'blocked',
        totalAmount,
        depositAmount,
        paymentMethod,
        paymentStatus: 'pending',
        blockedUntil,
        playerEmail,
        playerPhone
      }
    });

    res.json({
      success: true,
      data: {
        reservationId: reservation.id,
        blockedUntil: reservation.blockedUntil,
        message: 'Reserva bloqueada temporalmente por 10 minutos'
      }
    });

  } catch (error) {
    console.error('Error blocking reservation:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

// Crear preferencia de pago
export const createPaymentPreference = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const { playerName } = req.body;

    // Obtener datos de la reserva
    const reservation = await prisma.reservation.findUnique({
      where: { id: parseInt(reservationId) },
      include: {
        court: {
          include: {
            sportsByClub: {
              include: {
                club: true
              }
            }
          }
        },
        player: true
      }
    });

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reserva no encontrada'
      });
    }

    if (reservation.status !== 'blocked') {
      return res.status(400).json({
        success: false,
        message: 'La reserva no está bloqueada'
      });
    }

    // Verificar que no haya expirado el bloqueo
    if (reservation.blockedUntil && new Date() > reservation.blockedUntil) {
      // Liberar la reserva
      await prisma.reservation.update({
        where: { id: reservation.id },
        data: { status: 'cancelled' }
      });

      return res.status(400).json({
        success: false,
        message: 'El tiempo de bloqueo ha expirado'
      });
    }

    const club = reservation.court.sportsByClub.club;
    const amount = reservation.paymentMethod === 'deposit' 
      ? reservation.depositAmount 
      : reservation.totalAmount;

    // Crear preferencia de Mercado Pago
    const preferenceData = {
      reservationId: reservation.id,
      totalAmount: reservation.totalAmount,
      depositAmount: reservation.depositAmount,
      paymentMethod: reservation.paymentMethod,
      playerEmail: reservation.playerEmail || reservation.player.email,
      playerName: playerName || `${reservation.player.first_name} ${reservation.player.last_name}`,
      courtName: club.name,
      reservationDate: reservation.reservedDate,
      startTime: reservation.startTime,
      endTime: reservation.endTime
    };

    const preference = await mercadoPagoService.createPreference(preferenceData);

    res.json({
      success: true,
      data: {
        preferenceId: preference.id,
        initPoint: preference.init_point,
        sandboxInitPoint: preference.sandbox_init_point
      }
    });

  } catch (error) {
    console.error('Error creating payment preference:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

// Confirmar pago
export const confirmPayment = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const { paymentId, status } = req.body;

    const reservation = await prisma.reservation.findUnique({
      where: { id: parseInt(reservationId) }
    });

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reserva no encontrada'
      });
    }

    if (status === 'approved') {
      // Confirmar la reserva
      await prisma.reservation.update({
        where: { id: reservation.id },
        data: {
          status: 'confirmed',
          paymentStatus: 'paid',
          mercadoPagoId: paymentId
        }
      });

      res.json({
        success: true,
        message: 'Pago confirmado exitosamente',
        data: {
          reservationId: reservation.id,
          status: 'confirmed'
        }
      });
    } else {
      // Marcar como fallido
      await prisma.reservation.update({
        where: { id: reservation.id },
        data: {
          paymentStatus: 'failed',
          paymentAttempts: reservation.paymentAttempts + 1
        }
      });

      res.json({
        success: false,
        message: 'No se pudo procesar el pago, intente nuevamente'
      });
    }

  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

// Webhook de Mercado Pago
export const handleWebhook = async (req, res) => {
  try {
    const { type, data } = req.body;

    if (type === 'payment') {
      const paymentInfo = await mercadoPagoService.processWebhook(req.body);
      
      if (paymentInfo) {
        // Buscar la reserva por external_reference
        const reservation = await prisma.reservation.findFirst({
          where: {
            mercadoPagoId: paymentInfo.paymentId
          }
        });

        if (reservation) {
          if (paymentInfo.status === 'approved') {
            await prisma.reservation.update({
              where: { id: reservation.id },
              data: {
                status: 'confirmed',
                paymentStatus: 'paid'
              }
            });
          } else if (paymentInfo.status === 'rejected') {
            await prisma.reservation.update({
              where: { id: reservation.id },
              data: {
                paymentStatus: 'failed',
                paymentAttempts: reservation.paymentAttempts + 1
              }
            });
          }
        }
      }
    }

    res.status(200).json({ received: true });

  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing webhook'
    });
  }
};

// Liberar reservas expiradas (ejecutar cada minuto)
export const releaseExpiredReservations = async () => {
  try {
    const now = new Date();
    
    const expiredReservations = await prisma.reservation.findMany({
      where: {
        status: 'blocked',
        blockedUntil: {
          lt: now
        }
      }
    });

    for (const reservation of expiredReservations) {
      await prisma.reservation.update({
        where: { id: reservation.id },
        data: { 
          status: 'cancelled',
          paymentStatus: 'cancelled'
        }
      });
    }

    console.log(`Released ${expiredReservations.length} expired reservations`);
  } catch (error) {
    console.error('Error releasing expired reservations:', error);
  }
};
