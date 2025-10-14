import { ClubRepository } from "../../infraestructure/database/clubRepository.js";

const clubRepository = new ClubRepository();

export const completeRegistrationFormService = async (
  email,
  name,
  location
) => {
  return await clubRepository.updateProfile(email, {
    name: name,
    location: location,
  });
};
