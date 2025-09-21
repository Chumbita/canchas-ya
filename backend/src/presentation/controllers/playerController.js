import { completeProfileService } from "../../application/use_cases/playerService.js";

export const completeProfileController = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token requerido" });

    const { email, firstName, lastName, picture } = req.body;
    if (!email || !firstName || !lastName) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const updatedPlayer = await completeProfileService(
      email,
      firstName,
      lastName,
      picture
    );
    res.json(updatedPlayer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
