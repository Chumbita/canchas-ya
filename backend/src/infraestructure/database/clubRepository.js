import prisma from './postgres/prismaClient.js';
import { Club } from '../../domain/entities/club.js';

export class ClubRepository {
    async create({googleId, name, email}){
        const club = await prisma.club.create({
            data: {googleId, name, email}
        });
        return new Club(club);
    }

    async findByGoogleId(googleId) {
        const club = await prisma.club.findUnique({where: {googleId}});
        return club ? new Club(club) : null;
    }
    
    

}