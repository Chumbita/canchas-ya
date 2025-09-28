import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class VerifyOtp {
  constructor(otpRepository, playerRepository, clubRepository) {
    this.otpRepository = otpRepository;
    this.playerRepository = playerRepository;
    this.clubRepository = clubRepository;
  }

  async execute(email, code, role) {
    const otp = await this.otpRepository.findByEmail(email);

    if (!otp.code) throw new Error("Código no encontrado");
    if (otp.expiresAt < new Date()) throw new Error("Código expirado");

    const isMatch = await bcrypt.compare(code, otp.code);

    if (!isMatch) {
      await this.otpRepository.incrementAttempts(email);
      if (otp.attempts + 1 >= 3)
        throw new Error("Demasiados intentos fallidos");
      throw new Error("Código inválido");
    }

    let isNew = false;
    let mustCompleteProfile = false;
    let user;

    if (role === "player") {
      user = await this.playerRepository.findByEmail(email);
      if (!user) {
        isNew = true;
        user = await this.playerRepository.create({
          email,
        });
      } else if (!user.first_name || !user.last_name) {
        mustCompleteProfile = true;
      }
    }
    if (role === "club") {
      user = await this.clubRepository.findByEmail(email);
      if (!user) {
        isNew = true;
        user = await this.clubRepository.create({
          email,
        });
      }
    }

    const token = jwt.sign(
      { id: user.id, role: role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return {
      user,
      isNew,
      token,
      mustCompleteProfile,
    };
  }
}
