import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authPlayerRoutes from "./presentation/routes/authPlayerRoutes.js";
import protectedRoutes from "./presentation/routes/protectedRoutes.js";
import authEmailRoutes from "./presentation/routes/authEmailRoutes.js";
import authClubRoutes from "./presentation/routes/authClubRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth/email", authEmailRoutes);
app.use("/api/auth/player", authPlayerRoutes);
app.use("/api/auth/club", authClubRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
