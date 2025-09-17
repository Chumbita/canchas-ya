import { OAuth2Client} from 'google-auth-library';
import  jwt  from 'jsonwebtoken';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export class LoginClub {
    constructor(clubRepository) {
        this.clubRepository = clubRepository
    }

    async execute(idToken) {
        //1
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        //2
        const payload = ticket.getPayload();
        const googleId = payload.sub;
        const email = payload.email;
        const name = payload.name || '';

        //3
        let club = await this.clubRepository.findByGoogleId(googleId);

        //4
        if (!club) {
            club = await this.clubRepository.create({
                googleId,
                name,
                email,
            });
        }

        //5
        const token = jwt.sign(
            {id: club.id, role: 'CLUB'}, process.env.JWT_SECRET, {expiresIn: '1h'}
            
        );

        //6
        return {club, token};
    }
}


