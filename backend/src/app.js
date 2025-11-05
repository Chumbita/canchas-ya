import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authPlayerRoutes from "./presentation/routes/authPlayerRoutes.js";
import protectedRoutes from "./presentation/routes/protectedRoutes.js";
import authEmailRoutes from "./presentation/routes/authEmailRoutes.js";
import authClubRoutes from "./presentation/routes/authClubRoutes.js";
import courtRoutes from "./presentation/routes/courtRoutes.js";
import reservationRoutes from "./presentation/routes/reservationRoutes.js";
import paymentRoutes from "./presentation/routes/paymentRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth/email", authEmailRoutes);
app.use("/api/auth/player", authPlayerRoutes);
app.use("/api/auth/club", authClubRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/courts", courtRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/courts", authCourtRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
