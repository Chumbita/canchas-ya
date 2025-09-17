import express from 'express';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/perfil', authenticate, (req, res) => {
    res.json({ message: `Bienvenido ${req.user.role} con ID: ${req.user.id}`, user: req.user});

});

router.get('/club/data', authenticate, authorize('CLUB'), (req, res) =>{
    req.json({ message: 'Datos del club visibles solo para usuarios CLUB' });
});

export default router;
