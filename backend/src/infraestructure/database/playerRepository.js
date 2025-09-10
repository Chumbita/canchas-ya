import prisma from "./postgres/prismaClient.js";
import { Player } from "../../domain/entities/player.js";

export class PlayerRepository {
  async create({ first_name, last_name, email, picture }) {
    const player = await prisma.player.create({
      data: { first_name, last_name, email, picture },
    });
    return new Player(player);
  }

  async findByEmail(email) {
    const player = await prisma.player.findUnique({ where: { email } });
    return player ? new Player(player) : null;
  }
}
