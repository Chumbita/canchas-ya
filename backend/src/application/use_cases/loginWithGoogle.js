import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export class LoginWithGoogle {
  constructor(playerRepository) {
    this.playerRepository = playerRepository;
  }
  async execute(idToken) {
    // verifica token de google
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // extraemos solos los campos que queremos
    const email = payload.email;
    const first_name = payload.given_name || "";
    const last_name = payload.family_name || "";
    const picture = payload.picture || null;

    // busca jugador en la DB
    let player = await this.playerRepository.findByEmail(email);
    let isNewPlayer = false;

    if (!player) {
      player = await this.playerRepository.create({
        first_name,
        last_name,
        email,
        picture,
      });
      isNewPlayer = true; // prueaba
    }

    // solamente de prueba
    const message = isNewPlayer
      ? "¡Bienvenido a CANCHASYA! Tu cuenta fue creada exitosamente."
      : "¡Hola de nuevo! Iniciaste sesión correctamente.";

    const token = jwt.sign(
      {
        id: player.id,
        role: "PLAYER",
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return { player, token, isNewPlayer, message };
  }
}
