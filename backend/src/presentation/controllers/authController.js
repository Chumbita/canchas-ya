import { LoginWithGoogle } from "../../application/use_cases/loginWithPlayerGoogle.js";
import { PlayerRepository } from "../../infraestructure/database/playerRepository.js";

const playerRepository = new PlayerRepository();
const loginWithGoogle = new LoginWithGoogle(playerRepository);

export const googleAuthController = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: "Falta idToken" });
    }

    const { player, token, message, isNewPlayer } =
      await loginWithGoogle.execute(idToken);

    res.status(200).json({ player, token, message, isNewPlayer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
