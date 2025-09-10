import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authPlayerRoutes from "./presentation/routes/authPlayerRoutes.js";
import protectedRoutes from "./presentation/routes/protectedRoutes.js";
import authEmailRoutes from "./presentation/routes/authEmailRoutes.js"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth/email", authEmailRoutes);
app.use("/api/auth/player", authPlayerRoutes);
app.use("/api/protected", protectedRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));