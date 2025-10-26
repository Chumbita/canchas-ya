import { courtRepository } from "../../infraestructure/database/courtRepository.js";

export const courtService = {
  async addCourt({ idSportClub, pricePerHour }) {
    validatePrice(pricePerHour);

    return await courtRepository.createCourt({
      idSportClub,
      pricePerHour,
    });
  },

  async listCourts(sportClubId) {
    return await courtRepository.getCourtsBySportClub(sportClubId);
  },

  async editCourt(id, updates) {
    const court = await courtRepository.getCourtById(id);
    if (!court) throw new Error("La cancha no existe.");
    if (updates.hasOwnProperty("pricePerHour")) {
      validatePrice(updates.pricePerHour);
    }

    return await courtRepository.updateCourt(id, updates);
  },

  async deleteCourt(id) {
    const court = await courtRepository.getCourtById(id);
    if (!court) throw new Error("La cancha no existe.");

    return await courtRepository.deleteCourt(id);
  },
};

function validatePrice(price) {
  if (isNaN(price) || price <= 0) {
    throw new Error("El precio debe ser un número válido y mayor a cero.");
  }
}
