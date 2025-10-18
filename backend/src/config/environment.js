import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Database
  database: {
    url: process.env.DATABASE_URL || 'postgresql://username:password@localhost:5432/canchas_ya'
  },
  
  // Server
  server: {
    port: process.env.PORT || 3000,
    backendUrl: process.env.BACKEND_URL || 'http://localhost:3000',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173'
  },
  
  // Mercado Pago
  mercadoPago: {
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || 'YOUR_MERCADOPAGO_ACCESS_TOKEN'
  },
  
  // Email (opcional)
  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || ''
  }
};
