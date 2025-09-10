import { VerifyOtp } from "../../application/use_cases/verifyOtp.js";
import { OtpRepository } from "../../infraestructure/database/otpRepository.js";
import { PlayerRepository } from "../../infraestructure/database/playerRepository.js";

const otpRepository = new OtpRepository();
const playerRepository = new PlayerRepository();
const verifyOtp = new VerifyOtp(otpRepository, playerRepository);

export const verifyOtpController = async (req, res) => {
    try {
        const { email, code } = req.body;

        if (!email || !code) {
            return res.status(400).json({ error: "Email y código son requeridos" });
        }

        const result = await verifyOtp.execute(email, code);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};