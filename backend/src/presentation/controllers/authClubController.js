import { LoginClub } from "../../application/use_cases/loginClub.js";
import { ClubRepository } from "../../infraestructure/database/clubRepository.js";

const clubRepository = new ClubRepository();
const loginClub = new LoginClub(clubRepository);

export const googleAuthClubController = async (req, res) => {
    try {
        const {idToken} = req.body;

        if (!idToken) {
            return res.status(400).json({error: 'Falta idToken'});
        }

        const {club, token} = await loginClub.execute(idToken);

        res.status(200).json({club, token});
    }   catch (err) {
        res.status(400).json({error: err.message});
    }
};