import prisma from "./postgres/prismaClient.js";

export const courtRepository = {
  async getNextCourtNumber(idSportClub) {
    const courts = await prisma.court.findMany({
      where: { idSportClub },
      select: { courtNumber: true },
      orderBy: { courtNumber: "asc" },
    });

    if (courts.length === 0) return 1;

    // busca el primer hueco disponible
    for (let i = 0; i < courts.length; i++) {
      if (courts[i].courtNumber !== i + 1) {
        return i + 1;
      }
    }
    return courts.length + 1;
  },

  async createCourt(data) {
    const courtNumber = await this.getNextCourtNumber(data.idSportClub);
    const court = await prisma.court.create({
      data: {
        ...data,
        courtNumber,
      },
    });
    return court;
  },

  async getCourtsBySportClub(sportClubId) {
    return await prisma.court.findMany({
      where: { idSportClub: sportClubId },
    });
  },

  async getCourtById(id) {
    return await prisma.court.findUnique({
      where: { id },
    });
  },

  async updateCourt(id, data) {
    return await prisma.court.update({
      where: { id },
      data,
    });
  },

  async deleteCourt(id) {
    return await prisma.court.delete({
      where: { id },
    });
  },
};
