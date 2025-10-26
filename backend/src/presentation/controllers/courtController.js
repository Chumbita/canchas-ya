import { courtService } from "../../application/use_cases/courtService.js";

export const courtController = {
  async create(req, res) {
    try {
      const { idSportClub, pricePerHour } = req.body;
      const court = await courtService.addCourt({
        idSportClub,
        pricePerHour,
      });
      res.status(201).json({ success: true, data: court });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async list(req, res) {
    try {
      const { sportClubId } = req.params;
      const courts = await courtService.listCourts(parseInt(sportClubId));
      res.json({ success: true, data: courts });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const court = await courtService.editCourt(parseInt(id), updates);
      res.json({ success: true, data: court });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await courtService.deleteCourt(parseInt(id));
      res.json({ success: true, message: "Cancha eliminada correctamente." });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
};
