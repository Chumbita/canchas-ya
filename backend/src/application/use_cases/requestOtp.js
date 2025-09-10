import crypto from "crypto";

export class RequestOtp {
  constructor(otpRepository, emailService) {
    this.otpRepository = otpRepository;
    this.emailService = emailService;
  }

  async execute(email) {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Email no válido");
    }

    const code = crypto.randomInt(1000, 10000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this.otpRepository.createOrUpdate(email, code, expiresAt);
    await this.emailService.sendMail({
      to: email,
      subject: "Tu Código OTP",
      text: `Tu código es: ${code}. Expira en 5 minutos.`,
      html: `<p>Tu código es: <b>${code}</b></p><p>Expira en 5 minutos.</p>`,
    });

    return { message: "OTP enviado al correo" };
  }
}
