import jwt from "jsonwebtoken";

export class VerifyOtp {
  constructor(otpRepository, playerRepository) {
    this.otpRepository = otpRepository;
    this.playerRepository = playerRepository;
  }

  async execute(email, code) {
    const otp = await this.otpRepository.findByEmail(email);

    if (!otp) throw new Error("Código no encontrado");
    if (otp.expiresAt < new Date()) throw new Error("Código expirado");

    if (otp.code !== code) {
      await this.otpRepository.incrementAttempts(email);
      if (otp.attempts + 1 >= 3)
        throw new Error("Demasiados intentos fallidos");
      throw new Error("Código inválido");
    }

    let player = await this.playerRepository.findByEmail(email);
    if (!player) {
      player = await this.playerRepository.create({
        email,
      });
    }

    const token = jwt.sign(
      { id: player.id, role: "PLAYER" },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return { player, token };
  }
}
