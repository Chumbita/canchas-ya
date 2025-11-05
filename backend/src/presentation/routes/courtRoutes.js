import express from 'express';
import { getCourts, getCourtById } from '../controllers/courtController.js';

const router = express.Router();

// GET /api/courts - Obtener todas las canchas con filtros
router.get('/', getCourts);

// GET /api/courts/:id - Obtener una cancha específica
router.get('/:id', getCourtById);

export default router;
