import { RequestOtp } from "../../application/use_cases/requestOtp.js";
import { OtpRepository } from "../../infraestructure/database/otpRepository.js";
import { EmailService } from "../../infraestructure/services/emailService.js";

const emailService = new EmailService();

export const requestOtpController = async (req, res) => {
  try {
    const { email } = req.body;
    const otpRepository = new OtpRepository();

    if (!email) {
      return res.status(400).json({ error: "El email es obligatorio" });
    }

    const requestOtp = new RequestOtp(otpRepository, emailService);
    const result = await requestOtp.execute(email);

    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
