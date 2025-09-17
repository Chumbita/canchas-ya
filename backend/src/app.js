import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import authClubRoutes from './presentation/routes/authClubRoutes.js';
import protectedRoutes from './presentation/routes/protectedRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authClubRoutes); // /api/auth/club/google -> clubs
app.use('/api/protected', protectedRoutes);
app.use('/uploads', express.static('uploads'));
app.use ((err, req, res, next) => {
    console.error('Global error handler', err);

    if (err instanceof multer.MulterError){
        return res.status(400).json({ error: err.message });
    }

    if (err && err.message && err.message.includes('Formato no permitido')){
        return res.status(400).json({ error: err.message });
    }

    return res.status(500).json({ error: 'Error interno del servidor'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

