import express from "express";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Ruta accesible para todos los jugadores autenticados
router.get("/perfil", authenticate, (req, res) => {
  res.json({ message: `Bienvenido jugador con ID: ${req.user.id}` });
});

// Ruta solo para CLUB
router.get("/club/data", authenticate, authorize("CLUB"), (req, res) => {
  res.json({ message: "Datos del club visibles solo para rol CLUB" });
});

export default router;
