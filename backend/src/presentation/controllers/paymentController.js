import dotenv from "dotenv";
import { MercadoPagoConfig, Preference } from "mercadopago";

// Ensure env is loaded even if this module is imported before app.js runs dotenv
dotenv.config();

export const createPreference = async (req, res) => {
  try {
    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      return res.status(500).json({ success: false, message: "Falta MP_ACCESS_TOKEN en el backend (.env)" });
    }

    // Lazily create the client with the env already loaded
    const mpClient = new MercadoPagoConfig({ accessToken });
    const preferenceApi = new Preference(mpClient);

    const {
      title = "Reserva de cancha",
      description = "Pago de reserva",
      currency_id = "ARS",
      quantity = 1,
      amount = 0,
      reservationId,
      backUrls,
      payer,
    } = req.body || {};

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Monto inválido" });
    }

    const baseWeb = (process.env.WEB_BASE_URL || "http://localhost:5173").replace(/\/$/, "");
    const defaultBackUrls = {
      success: `${baseWeb}/reservation/success`,
      failure: `${baseWeb}/reservation/failure`,
      pending: `${baseWeb}/reservation/pending`,
    };

    const candidateBack = (backUrls && typeof backUrls === 'object') ? backUrls : {};
    const resolvedBackUrls = {
      success: candidateBack.success || defaultBackUrls.success,
      failure: candidateBack.failure || defaultBackUrls.failure,
      pending: candidateBack.pending || defaultBackUrls.pending,
    };

    const preferenceBody = {
      items: [
        {
          id: reservationId || undefined,
          title,
          description,
          quantity,
          currency_id,
          unit_price: Number(amount),
        },
      ],
      back_urls: resolvedBackUrls,
      // auto_return removed to avoid MP validation when success URL is not accepted
      payer,
      metadata: { reservationId },
    };

    const result = await preferenceApi.create({ body: preferenceBody });
    const id = result?.id || result?.response?.id;
    const init_point = result?.init_point || result?.response?.init_point;
    const sandbox_init_point = result?.sandbox_init_point || result?.response?.sandbox_init_point;

    if (!id || !init_point) {
      console.error("MercadoPago unexpected response:", result);
      return res.status(502).json({ success: false, message: "Respuesta inválida de Mercado Pago" });
    }

    return res.json({ success: true, data: { id, init_point, sandbox_init_point } });
  } catch (error) {
    console.error("MercadoPago createPreference error:", error?.message || error, error?.cause);
    return res.status(500).json({ success: false, message: error?.message || "Error creando preferencia" });
  }
};


