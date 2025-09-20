import { VerifyOtp } from "../../application/use_cases/verifyOtp.js";
import { OtpRepository } from "../../infraestructure/database/otpRepository.js";
import { PlayerRepository } from "../../infraestructure/database/playerRepository.js";
import { ClubRepository } from "../../infraestructure/database/clubRepository.js";

const otpRepository = new OtpRepository();
const playerRepository = new PlayerRepository();
const clubRepository = new ClubRepository();
const verifyOtp = new VerifyOtp(otpRepository, playerRepository, clubRepository );

export const verifyOtpController = async (req, res) => {
  try {
    const { email, code, role } = req.body;

    if (!email || !code || !role) {
      return res.status(400).json({ error: "Email, código y rol son requeridos" });
    }

    const result = await verifyOtp.execute(email, code, role);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
