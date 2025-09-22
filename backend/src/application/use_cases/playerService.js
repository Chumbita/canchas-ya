import { PlayerRepository } from "../../infraestructure/database/playerRepository.js";

const playerRepository = new PlayerRepository();

export const completeProfileService = async (
  email,
  firstName,
  lastName,
  picture
) => {
  return await playerRepository.updateProfile(email, {
    first_name: firstName,
    last_name: lastName,
    picture: picture,
  });
};
